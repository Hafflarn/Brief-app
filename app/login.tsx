'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login({ onReady }: { onReady:()=>Promise<void> }) {
 const [mode,setMode] = useState<'login'|'signup'>('login');
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');
 const [fullName,setFullName] = useState('');
 const [company,setCompany] = useState('');
 const [busy,setBusy] = useState(false);
 const [message,setMessage] = useState('');
 return <main className="login"><div className="login-brand"><img src="/brand/brief-horizontal.png" alt="brēf"/></div><section className="form-panel"><div className="eyebrow">BRIEF</div><h1>{mode==='login'?'Välkommen tillbaka':'Skapa ditt konto'}</h1><p className="muted">{mode==='login'?'Logga in till företagets arbetsyta.':'Registrera dig med den e-postadress din arbetsledare har lagt till. Första kontot skapar en ny arbetsyta.'}</p>
 <form onSubmit={async e=>{e.preventDefault();setBusy(true);setMessage('');try {
  if (mode==='signup') {
   const { data,error } = await supabase!.auth.signUp({email:email.trim(),password,options:{data:{full_name:fullName.trim(),company_name:company.trim()||'Brief'},emailRedirectTo:window.location.origin}});
   if(error)throw error;
   if(!data.session){setMessage('Kontrollera din e-post och bekräfta kontot. Återvänd sedan hit och logga in.');return;}
  } else { const {error}=await supabase!.auth.signInWithPassword({email:email.trim(),password});if(error)throw error; }
  await onReady();
 } catch(error){setMessage(error instanceof Error?error.message:'Inloggningen misslyckades.');}finally{setBusy(false);}}}>
 {mode==='signup'&&<><label className="field"><span>Ditt namn</span><input autoComplete="name" required value={fullName} onChange={e=>setFullName(e.target.value)}/></label><label className="field"><span>Företagsnamn (för en ny arbetsyta)</span><input value={company} onChange={e=>setCompany(e.target.value)}/></label></>}
 <label className="field"><span>E-post</span><input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label className="field"><span>Lösenord</span><input type="password" autoComplete={mode==='login'?'current-password':'new-password'} minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="primary full" disabled={busy}>{busy?'Vänta…':mode==='login'?'Logga in':'Skapa konto'}</button>
 </form>{message&&<p className="notice" role="status">{message}</p>}<button className="login-toggle" disabled={busy} onClick={()=>{setMode(mode==='login'?'signup':'login');setMessage('');}}>{mode==='login'?'Nytt konto? Registrera dig':'Har du ett konto? Logga in'}</button></section></main>;
}
