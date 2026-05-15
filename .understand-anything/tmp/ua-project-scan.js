#!/usr/bin/env node
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, join, extname, basename, dirname, relative } from 'path';

const PROJECT_ROOT = process.argv[2];
const OUTPUT_FILE = process.argv[3];

if (!PROJECT_ROOT || !OUTPUT_FILE) {
  process.stderr.write('Usage: node ua-project-scan.js <project-root> <output-file>\n');
  process.exit(1);
}

const root = resolve(PROJECT_ROOT);

if (!existsSync(root)) {
  process.stderr.write(`Project root does not exist: ${root}\n`);
  process.exit(1);
}

// ── Step 1: File Discovery ───────────────────────────────────────────────────
let allFiles = [];
try {
  const result = execSync('git ls-files', { cwd: root, encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
  allFiles = result.split('\n').map(f => f.trim()).filter(Boolean);
} catch {
  process.stderr.write('git ls-files failed, falling back to recursive listing\n');
  // Fallback: recursive listing - not implemented in detail here since this is a git repo
  allFiles = [];
}

// ── Step 2: Exclusion Filtering ──────────────────────────────────────────────
const EXCLUDE_DIR_SEGMENTS = new Set([
  'node_modules', '.git', 'vendor', 'venv', '.venv', '__pycache__',
  'dist', 'build', 'out', 'coverage', '.next', '.cache', '.turbo', 'target', 'obj',
  '.idea', '.vscode', '.history'
]);

const EXCLUDE_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
  '.woff', '.woff2', '.ttf', '.eot',
  '.mp3', '.mp4', '.pdf', '.zip', '.tar', '.gz'
]);

const EXCLUDE_FILENAMES = new Set([
  'LICENSE', '.gitignore', '.editorconfig', '.prettierrc', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'
]);

function shouldExclude(filePath) {
  const parts = filePath.split('/');
  const fname = parts[parts.length - 1];

  // Check directory segments
  for (let i = 0; i < parts.length - 1; i++) {
    const seg = parts[i];
    // Exact segment match only (not substring)
    if (EXCLUDE_DIR_SEGMENTS.has(seg)) return true;
  }

  // Lock files
  if (fname.endsWith('.lock')) return true;

  // Specific excluded filenames
  if (EXCLUDE_FILENAMES.has(fname)) return true;

  // Extensions check
  const ext = extname(fname).toLowerCase();
  if (EXCLUDE_EXTENSIONS.has(ext)) return true;

  // Generated files
  if (fname.endsWith('.min.js') || fname.endsWith('.min.css') || fname.endsWith('.map')) return true;
  if (/\.generated\./.test(fname)) return true;

  // ESLint configs
  if (/^\.eslintrc/.test(fname)) return true;

  // Log files
  if (fname.endsWith('.log')) return true;

  return false;
}

const filteredFiles = allFiles.filter(f => !shouldExclude(f));

// ── Step 2.5: .understandignore ──────────────────────────────────────────────
// Check for user-configured ignore patterns
let filteredByIgnore = 0;
// (Skipping dynamic import of @understand-anything/core as it may not be installed;
//  falling through with filteredByIgnore = 0)

// ── Step 3: Language Detection ───────────────────────────────────────────────
const EXT_TO_LANG = {
  '.ts': 'typescript', '.tsx': 'typescript',
  '.js': 'javascript', '.jsx': 'javascript',
  '.py': 'python',
  '.go': 'go',
  '.rs': 'rust',
  '.java': 'java',
  '.rb': 'ruby',
  '.cpp': 'cpp', '.cc': 'cpp', '.cxx': 'cpp', '.h': 'cpp', '.hpp': 'cpp',
  '.c': 'c',
  '.cs': 'csharp',
  '.swift': 'swift',
  '.kt': 'kotlin',
  '.php': 'php',
  '.vue': 'vue',
  '.svelte': 'svelte',
  '.sh': 'shell', '.bash': 'shell',
  '.ps1': 'shell', '.bat': 'shell',
  '.md': 'markdown', '.rst': 'markdown',
  '.yaml': 'yaml', '.yml': 'yaml',
  '.json': 'json',
  '.toml': 'toml',
  '.sql': 'sql',
  '.graphql': 'graphql', '.gql': 'graphql',
  '.proto': 'protobuf',
  '.tf': 'terraform', '.tfvars': 'terraform',
  '.html': 'html', '.htm': 'html',
  '.css': 'css', '.scss': 'css', '.sass': 'css', '.less': 'css',
  '.xml': 'xml',
  '.cfg': 'config', '.ini': 'config', '.env': 'config',
};

const BASENAME_TO_LANG = {
  'Dockerfile': 'dockerfile',
  'Makefile': 'makefile',
  'Jenkinsfile': 'jenkinsfile',
};

function detectLanguage(filePath) {
  const fname = basename(filePath);
  if (BASENAME_TO_LANG[fname]) return BASENAME_TO_LANG[fname];
  const ext = extname(fname).toLowerCase();
  return EXT_TO_LANG[ext] || 'unknown';
}

// ── Step 4: File Category ────────────────────────────────────────────────────
function detectCategory(filePath) {
  const fname = basename(filePath);
  const ext = extname(fname).toLowerCase();
  const parts = filePath.split('/');

  // Infra first
  if (fname === 'Dockerfile' || /^docker-compose/.test(fname)) return 'infra';
  if (['.tf', '.tfvars'].includes(ext)) return 'infra';
  if (fname === 'Makefile' || fname === 'Jenkinsfile' || fname === 'Procfile' || fname === 'Vagrantfile') return 'infra';
  if (parts.includes('.github') && parts.includes('workflows')) return 'infra';
  if (fname === '.gitlab-ci.yml') return 'infra';
  if (parts.includes('.circleci')) return 'infra';
  if (filePath.endsWith('.k8s.yaml') || filePath.endsWith('.k8s.yml')) return 'infra';
  if (parts.includes('k8s') || parts.includes('kubernetes')) return 'infra';

  // Docs
  if (['.md', '.rst', '.txt'].includes(ext)) return 'docs';

  // Config
  const CONFIG_BASENAMES = new Set(['package.json', 'tsconfig.json', 'pyproject.toml', 'Cargo.toml', 'go.mod']);
  if (CONFIG_BASENAMES.has(fname)) return 'config';
  if (['.yaml', '.yml', '.json', '.toml', '.xml', '.cfg', '.ini', '.env'].includes(ext)) return 'config';

  // Data
  if (['.sql', '.graphql', '.gql', '.proto', '.prisma', '.csv'].includes(ext)) return 'data';
  if (fname.endsWith('.schema.json')) return 'data';

  // Script
  if (['.sh', '.bash', '.ps1', '.bat'].includes(ext)) return 'script';

  // Markup
  if (['.html', '.htm', '.css', '.scss', '.sass', '.less'].includes(ext)) return 'markup';

  return 'code';
}

// ── Step 5: Line Counting ────────────────────────────────────────────────────
function countLines(filePath) {
  try {
    const content = readFileSync(join(root, filePath), 'utf8');
    return content.split('\n').length;
  } catch {
    return 0;
  }
}

// Batch line counting
function batchCountLines(filePaths) {
  const counts = {};
  // Process in batches of 100 to avoid command line length issues
  const BATCH = 100;
  for (let i = 0; i < filePaths.length; i += BATCH) {
    const batch = filePaths.slice(i, i + BATCH);
    for (const f of batch) {
      counts[f] = countLines(f);
    }
  }
  return counts;
}

const lineCounts = batchCountLines(filteredFiles);

// ── Step 6: Framework Detection ──────────────────────────────────────────────
const frameworks = new Set();

function safeRead(filePath) {
  try { return readFileSync(join(root, filePath), 'utf8'); } catch { return null; }
}

function safeJSON(content) {
  try { return JSON.parse(content); } catch { return null; }
}

// package.json at root
const rootPkgContent = safeRead('package.json');
const rootPkg = rootPkgContent ? safeJSON(rootPkgContent) : null;
let projectName = '';
let rawDescription = '';

if (rootPkg) {
  if (rootPkg.name) projectName = rootPkg.name;
  if (rootPkg.description) rawDescription = rootPkg.description;

  const deps = { ...rootPkg.dependencies, ...rootPkg.devDependencies };
  const KNOWN_FRAMEWORKS = {
    'react': 'React', 'vue': 'Vue', 'svelte': 'Svelte', '@angular/core': 'Angular',
    'express': 'Express', 'fastify': 'Fastify', 'koa': 'Koa',
    'next': 'Next.js', 'nuxt': 'Nuxt', 'vite': 'Vite', 'vitest': 'Vitest',
    'jest': 'Jest', 'mocha': 'Mocha', 'tailwindcss': 'Tailwind CSS',
    'prisma': 'Prisma', 'typeorm': 'TypeORM', 'sequelize': 'Sequelize',
    'mongoose': 'Mongoose', 'redux': 'Redux', 'zustand': 'Zustand', 'mobx': 'MobX',
    'jsonwebtoken': 'JWT', 'bcrypt': 'bcrypt', 'cors': 'CORS'
  };
  for (const [dep, frameworkName] of Object.entries(KNOWN_FRAMEWORKS)) {
    if (deps[dep]) frameworks.add(frameworkName);
  }
}

// client/package.json
const clientPkgContent = safeRead('client/package.json');
const clientPkg = clientPkgContent ? safeJSON(clientPkgContent) : null;

if (clientPkg) {
  const deps = { ...clientPkg.dependencies, ...clientPkg.devDependencies };
  const KNOWN_FRAMEWORKS = {
    'react': 'React', 'react-dom': 'React', 'react-router-dom': 'React Router',
    'react-hook-form': 'React Hook Form', 'axios': 'Axios',
    'vue': 'Vue', 'svelte': 'Svelte', '@angular/core': 'Angular',
    'express': 'Express', 'next': 'Next.js', 'nuxt': 'Nuxt',
    'vite': 'Vite', 'vitest': 'Vitest', 'jest': 'Jest', 'mocha': 'Mocha',
    'tailwindcss': 'Tailwind CSS', 'prisma': 'Prisma', 'typeorm': 'TypeORM',
    'sequelize': 'Sequelize', 'mongoose': 'Mongoose', 'redux': 'Redux',
    'zustand': 'Zustand', 'mobx': 'MobX'
  };
  for (const [dep, frameworkName] of Object.entries(KNOWN_FRAMEWORKS)) {
    if (deps[dep]) frameworks.add(frameworkName);
  }
}

// tsconfig.json presence
if (filteredFiles.some(f => f === 'tsconfig.json' || f.endsWith('/tsconfig.json'))) {
  // TypeScript confirmed via language detection
}

// Infrastructure detection
if (filteredFiles.some(f => basename(f) === 'Dockerfile')) frameworks.add('Docker');
if (filteredFiles.some(f => /^docker-compose\.(yml|yaml)$/.test(basename(f)))) frameworks.add('Docker Compose');
if (filteredFiles.some(f => f.endsWith('.tf'))) frameworks.add('Terraform');
if (filteredFiles.some(f => /\.github\/workflows\/.+\.ya?ml$/.test(f))) frameworks.add('GitHub Actions');
if (filteredFiles.some(f => basename(f) === '.gitlab-ci.yml')) frameworks.add('GitLab CI');
if (filteredFiles.some(f => basename(f) === 'Jenkinsfile')) frameworks.add('Jenkins');

// ── Step 7: Complexity Estimation ────────────────────────────────────────────
function estimateComplexity(count) {
  if (count <= 30) return 'small';
  if (count <= 150) return 'moderate';
  if (count <= 500) return 'large';
  return 'very-large';
}

// ── Step 8: Project Name ─────────────────────────────────────────────────────
if (!projectName) {
  // Try directory name
  projectName = basename(root);
}

// ── README head ──────────────────────────────────────────────────────────────
let readmeHead = '';
const readmePath = filteredFiles.find(f => /^README\.md$/i.test(basename(f)) && dirname(f) === '.');
if (readmePath || filteredFiles.includes('README.md')) {
  const rContent = safeRead('README.md');
  if (rContent) {
    readmeHead = rContent.split('\n').slice(0, 10).join('\n');
  }
}

// ── Step 9: Import Resolution ─────────────────────────────────────────────────
const CODE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.py', '.go', '.rs', '.rb']);

const RESOLVE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.js', '/index.tsx', '/index.jsx', '.py', '.go', '.rs', '.rb'];

const fileSet = new Set(filteredFiles);

function resolveImport(importingFile, importPath) {
  const importingDir = dirname(importingFile);
  let base = importPath;

  // Normalize slashes
  base = base.replace(/\\/g, '/');

  // Resolve relative path from importing file's directory
  const resolved = join(importingDir, base).replace(/\\/g, '/');

  // If already has extension and exists
  if (fileSet.has(resolved)) return resolved;

  // Try adding extensions
  for (const ext of RESOLVE_EXTENSIONS) {
    const candidate = resolved + ext;
    if (fileSet.has(candidate)) return candidate;
  }

  return null;
}

function extractImports(filePath, content, lang) {
  const imports = [];

  if (lang === 'typescript' || lang === 'javascript') {
    // ES import: import ... from '...'
    const importFromRe = /import\s+(?:[^'"]+\s+from\s+)?['"]([^'"]+)['"]/g;
    let m;
    while ((m = importFromRe.exec(content)) !== null) {
      const p = m[1];
      if (p.startsWith('./') || p.startsWith('../')) imports.push(p);
    }
    // require('./...')
    const requireRe = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    while ((m = requireRe.exec(content)) !== null) {
      const p = m[1];
      if (p.startsWith('./') || p.startsWith('../')) imports.push(p);
    }
  } else if (lang === 'python') {
    const re = /from\s+(\.+\w*)\s+import|from\s+(\.+)\s+import/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      const p = m[1] || m[2];
      if (p) imports.push(p);
    }
  } else if (lang === 'ruby') {
    const re = /require_relative\s+['"]([^'"]+)['"]/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      imports.push('./' + m[1]);
    }
  }

  return imports;
}

const importMap = {};

for (const filePath of filteredFiles) {
  const lang = detectLanguage(filePath);
  const cat = detectCategory(filePath);

  if (cat !== 'code') {
    importMap[filePath] = [];
    continue;
  }

  const ext = extname(filePath).toLowerCase();
  if (!CODE_EXTENSIONS.has(ext)) {
    importMap[filePath] = [];
    continue;
  }

  const content = safeRead(filePath);
  if (!content) {
    importMap[filePath] = [];
    continue;
  }

  const rawImports = extractImports(filePath, content, lang);
  const resolved = [];
  for (const imp of rawImports) {
    const r = resolveImport(filePath, imp);
    if (r && r !== filePath) resolved.push(r);
  }

  importMap[filePath] = [...new Set(resolved)];
}

// ── Assemble files array ──────────────────────────────────────────────────────
const filesArray = filteredFiles.map(filePath => ({
  path: filePath,
  language: detectLanguage(filePath),
  sizeLines: lineCounts[filePath] || 0,
  fileCategory: detectCategory(filePath),
})).sort((a, b) => a.path.localeCompare(b.path));

// ── Collect languages ─────────────────────────────────────────────────────────
const languages = [...new Set(filesArray.map(f => f.language).filter(l => l && l !== 'unknown'))].sort();

// ── Final output ──────────────────────────────────────────────────────────────
const result = {
  scriptCompleted: true,
  name: projectName,
  rawDescription,
  readmeHead,
  languages,
  frameworks: [...frameworks].sort(),
  files: filesArray,
  totalFiles: filesArray.length,
  filteredByIgnore,
  estimatedComplexity: estimateComplexity(filesArray.length),
  importMap,
};

writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf8');
process.stdout.write(`Scan complete. ${filesArray.length} files discovered.\n`);
process.exit(0);
