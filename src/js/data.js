// Single source of truth for user records. Both the list page and the edit
// page read from here. State is persisted in sessionStorage so edits made on
// the edit page survive the round-trip back to the list within a session.

export const STATUSES = ['Open', 'Paid', 'Past Due', 'Inactive'];
export const CURRENCIES = ['CAD', 'USD'];

const STORAGE_KEY = 'lp.users.v1';
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...';

export const seedUsers = [
  { id: 1,  name: 'Alex Smith',     reference: '4372846375',  status: 'Open',     description: DESCRIPTION, rate: 70, balance: -270, deposit: 500, currency: 'CAD' },
  { id: 2,  name: 'Amadeus Mozart', reference: '47382756373', status: 'Paid',     description: DESCRIPTION, rate: 70, balance:  270, deposit: 500, currency: 'CAD' },
  { id: 3,  name: 'John Kraus',     reference: '98756474838', status: 'Inactive', description: DESCRIPTION, rate: 70, balance:  -20, deposit: 500, currency: 'CAD' },
  { id: 4,  name: 'Olivia Bennett', reference: '12343265546', status: 'Past Due', description: DESCRIPTION, rate: 70, balance: -270, deposit: 500, currency: 'CAD' },
  { id: 5,  name: 'Ethan Parker',   reference: '09803458763', status: 'Paid',     description: DESCRIPTION, rate: 70, balance: -350, deposit: 500, currency: 'CAD' },
  { id: 6,  name: 'Liam Foster',    reference: '23456732342', status: 'Open',     description: DESCRIPTION, rate: 70, balance: -270, deposit: 500, currency: 'CAD' },
  { id: 7,  name: 'Ava Mitchell',   reference: '1234253647',  status: 'Past Due', description: DESCRIPTION, rate: 70, balance:  -30, deposit: 500, currency: 'CAD' },
  { id: 8,  name: 'Noah Reynolds',  reference: '8674563654',  status: 'Paid',     description: DESCRIPTION, rate: 70, balance: -270, deposit: 500, currency: 'CAD' },
  { id: 9,  name: 'Mason Carter',   reference: '5678345645',  status: 'Inactive', description: DESCRIPTION, rate: 70, balance:  460, deposit: 500, currency: 'CAD' },
  { id: 10, name: 'Sophia Hayes',   reference: '45691347051', status: 'Open',     description: DESCRIPTION, rate: 70, balance:    0, deposit: 500, currency: 'CAD' },
];

export function loadUsers() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to seed
  }
  saveUsers(seedUsers);
  return seedUsers.map((u) => ({ ...u }));
}

export function saveUsers(users) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function updateUser(id, patch) {
  const users = loadUsers();
  const next = users.map((u) => (u.id === id ? { ...u, ...patch } : u));
  saveUsers(next);
  return next;
}
