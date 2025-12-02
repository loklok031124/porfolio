import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ContactForm from '../components/Forms/ContactForm'

// Mock the API
vi.mock('../../../api/contact.api', () => ({
  contactAPI: {
    create: vi.fn(() => Promise.resolve({ data: {} }))
  }
}))

describe('ContactForm Component', () => {
  it('renders all form fields', () => {
    render(
      <BrowserRouter>
        <ContactForm />
      </BrowserRouter>
    )
    
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument()
  })
  
  it('shows validation errors for empty required fields', async () => {
    render(
      <BrowserRouter>
        <ContactForm />
      </BrowserRouter>
    )
    
    const submitButton = screen.getByText('Send Message')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument()
    })
  })
  
  it('validates email format', async () => {
    render(
      <BrowserRouter>
        <ContactForm />
      </BrowserRouter>
    )
    
    const emailInput = screen.getByLabelText(/Email Address/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email@y' } })
    
    const submitButton = screen.getByText('Send Message')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Email is invalid')).toBeInTheDocument()
    })
  })
  
  it('allows input in all fields', () => {
    render(
      <BrowserRouter>
        <ContactForm />
      </BrowserRouter>
    )
    
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const emailInput = screen.getByLabelText(/Email Address/i)
    const messageInput = screen.getByLabelText(/Message/i)
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    
    expect(firstNameInput.value).toBe('John')
    expect(lastNameInput.value).toBe('Doe')
    expect(emailInput.value).toBe('john@example.com')
    expect(messageInput.value).toBe('Test message')
  })
})