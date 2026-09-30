const { test } = require('node:test');
const assert = require('node:assert/strict');
const { stripTypeScriptTypes } = require('node:module');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function library(client) {
 const source = fs.readFileSync(path.join(__dirname,'../lib/cloud.ts'),'utf8')
  .replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'');
 const js = stripTypeScriptTypes(source);
 const context = vm.createContext({supabase:client,fetch,Blob,console,Map,Error});
 vm.runInContext(js+'\n globalThis.api={commandFor,saveCloud,hydrate};',context);
 return context.api;
}
function fixture() {
 return {people:[{id:'employee',name:'Erik',role:'employee'}],customers:[],customerProjects:[],projects:[{id:'project',number:'1842-001',orders:[{id:'order',assignee:'employee',status:'Pågående',acceptedAt:'server-time',participants:[],notes:[],events:[]}]}]};
}
const snapshot = state => ({state,company:'company',user:'employee',revision:7});
function noteState(before) {
 const after=structuredClone(before);
 after.projects[0].orders[0].notes.push({id:'note',text:'Klart',author:'FORGED',at:'FAKE',files:[{id:'file',name:'photo.png',type:'image/png',data:'data:image/png;base64,aGk='}]});
 after.projects[0].orders[0].events.push({text:'FORGED AUDIT',at:'FAKE'});
 return after;
}

test('Uploads are private and scoped; author/time/audit are supplied by database',async()=>{
 const before=fixture(),after=noteState(before),calls=[];
 const canonical=snapshot(fixture());canonical.revision=8;
 const client={storage:{from:bucket=>({upload:async(p,blob,options)=>{calls.push({bucket,path:p,size:blob.size,options});return {error:null};}})},rpc:async(name,args)=>{calls.push({name,args});return {data:canonical,error:null};}};
 const result=await library(client).saveCloud(before,after,snapshot(before));
 assert.equal(calls[0].bucket,'brief-files');assert.equal(calls[0].path,'company/order/employee/file');assert.equal(calls[0].options.upsert,false);
 const command=calls[1].args.command;
 assert.equal(command.author,undefined);assert.equal(command.at,undefined);assert.equal(command.events,undefined);assert.equal(command.files[0].data,undefined);
 assert.equal(calls[1].args.expected_revision,7);assert.equal(result.revision,8);assert.equal(before.projects[0].orders[0].notes.length,0);
});
test('An upload failure never writes a dangling file reference',async()=>{
 let writes=0;const before=fixture();
 const client={storage:{from:()=>({upload:async()=>({error:{message:'Upload refused'}})})},rpc:async()=>{writes++;}};
 await assert.rejects(()=>library(client).saveCloud(before,noteState(before),snapshot(before)),/Upload refused/);assert.equal(writes,0);
});
test('A stale revision leaves local state untouched and surfaces conflict',async()=>{
 const before=fixture(),after=structuredClone(before);after.projects[0].orders[0].status='Slutförd';
 const client={rpc:async()=>({error:{message:'Någon annan har ändrat arbetsytan.'}})};
 await assert.rejects(()=>library(client).saveCloud(before,after,snapshot(before)),/Någon annan/);
 assert.equal(before.projects[0].orders[0].status,'Pågående');
});
test('Signed URL failure does not misreport an already committed note as unsaved',async()=>{
 const before=fixture(),after=structuredClone(before);after.projects[0].orders[0].status='Slutförd';
 const committed=snapshot(noteState(before));committed.state.projects[0].orders[0].notes[0].files[0].path='company/order/employee/file';committed.revision=8;
 const client={rpc:async()=>({data:committed,error:null}),storage:{from:()=>({createSignedUrls:async()=>{throw Error('Network unavailable');}})}};
 const result=await library(client).saveCloud(before,after,snapshot(before));assert.equal(result.revision,8);
});
test('New order command excludes browser-provided notes, invitations and audit',()=>{
 const before=fixture(),after=structuredClone(before);after.projects[0].orders.push({id:'new',events:[{text:'FAKE'}],notes:[{text:'FAKE'}],participants:[{user:'FAKE'}]});
 const command=library({}).commandFor(before,after);assert.equal(command.kind,'create_order');assert.equal(command.order.events,undefined);assert.equal(command.order.notes,undefined);assert.equal(command.order.participants,undefined);
});
