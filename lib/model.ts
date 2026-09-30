export type Person = { id: string; name: string; role: 'admin' | 'employee' };
export type Customer = { id: string; name: string; prefix: string };
export type Event = { id: string; at: string; text: string };
export type Attachment = { id: string; name: string; type: string; data: string };
export type Note = { id: string; at: string; author: string; text: string; files: Attachment[] };
export type Participant = { user: string; invitedBy: string; invitedAt: string; acceptedAt?: string };
export type Order = { id: string; title: string; description: string; due: string; priority: string; assignee: string; issuedBy: string; issuedAt: string; acceptedAt?: string; status: 'Ej påbörjad' | 'Pågående' | 'Slutförd'; participants: Participant[]; events: Event[]; notes: Note[] };
export type Project = { id: string; number: string; customerProject: string; customer: string; address: string; name: string; comment: string; orders: Order[] };
export type State = { people: Person[]; customers: Customer[]; customerProjects: string[]; projects: Project[] };
export const uid = () => crypto.randomUUID();
export const now = () => new Date().toISOString();
export function status(project: Project): Order['status'] { return project.orders.length && project.orders.every(o => o.status === 'Slutförd') ? 'Slutförd' : project.orders.some(o => o.status === 'Pågående') ? 'Pågående' : 'Ej påbörjad'; }
export function seed(): State {
 const at = now();
 return { people: [{id:'johan',name:'Johan Andersson',role:'admin'},{id:'erik',name:'Erik Svensson',role:'employee'},{id:'marcus',name:'Marcus Nilsson',role:'employee'},{id:'sara',name:'Sara Lind',role:'employee'}], customers:[{id:'sala',name:'Salabostäder AB',prefix:'1842'},{id:'fast',name:'Fastighetspartner',prefix:'2100'}],customerProjects:['SB-2026-14','SB-2026-28','FP-104'],projects:[{id:'p1',number:'1842-026',customerProject:'SB-2026-14',customer:'sala',address:'Bergsmansgatan 12, Sala',name:'Ett nytt kök på plats',comment:'Nyckel hämtas på kontoret.',orders:[{id:'o1',title:'Renovering av kök',description:'Demontera befintlig inredning. Förbered regelstomme och montera nytt kök enligt ritning. Skydda golv och gemensamma ytor.',due:at.slice(0,10),priority:'Normal',assignee:'erik',issuedBy:'johan',issuedAt:at,status:'Ej påbörjad',participants:[],notes:[],events:[{id:'e1',at,text:'Johan Andersson skapade och skickade arbetsordern till Erik Svensson.'}]}]},{id:'p2',number:'2100-018',customerProject:'FP-104',customer:'fast',address:'Stationsgatan 8, Västerås',name:'Entrén får nytt liv',comment:'Samordna tillträde med beställaren.',orders:[]}] };
}
