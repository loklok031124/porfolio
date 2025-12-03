import{a as s}from"./index-R3ImrpZD.js";const o={getAll:async()=>(await s.get("/contacts")).data,getById:async t=>(await s.get(`/contacts/${t}`)).data,create:async t=>(await s.post("/contacts",t)).data,update:async(t,e)=>(await s.put(`/contacts/${t}`,e)).data,delete:async t=>(await s.delete(`/contacts/${t}`)).data};export{o as c};
//# sourceMappingURL=contact.api-qzQvPMGu.js.map
