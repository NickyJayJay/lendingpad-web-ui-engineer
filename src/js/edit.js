// Edit page: reads ?id=N, populates the form from the matching user, writes
// changes back to the data module on submit, and returns to the list.

import { CURRENCIES, STATUSES, loadUsers, updateUser } from './data.js';

const params = new URLSearchParams(window.location.search);
const id = Number(params.get('id'));
const user = Number.isFinite(id) ? loadUsers().find((u) => u.id === id) : null;

if (!user) {
  window.location.replace('./index.html');
}

if (user) {
  populateSelect(document.querySelector('[data-edit-status]'), STATUSES, user.status);
  populateSelect(document.querySelector('[data-edit-currency]'), CURRENCIES, user.currency);

  const form = document.querySelector('[data-edit-form]');
  form.elements.name.value = user.name;
  form.elements.description.value = user.description;
  form.elements.rate.value = user.rate;
  form.elements.balance.value = user.balance;
  form.elements.deposit.value = user.deposit;

  const title = document.querySelector('[data-edit-title]');
  if (title) title.textContent = `Edit ${user.name}`;
  document.title = `Edit ${user.name} — LendingPad`;

  const id = document.querySelector('[data-edit-id]');
  if (id && user.reference) {
    id.textContent = user.reference;
    id.hidden = false;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    updateUser(user.id, {
      name: String(data.get('name')).trim(),
      status: String(data.get('status')),
      description: String(data.get('description')),
      rate: Number(data.get('rate')) || 0,
      balance: Number(data.get('balance')) || 0,
      deposit: Number(data.get('deposit')) || 0,
      currency: String(data.get('currency')),
    });

    window.location.href = './index.html';
  });
}

function populateSelect(select, options, value) {
  if (!select) return;
  select.innerHTML = options
    .map((opt) => `<option value="${opt}"${opt === value ? ' selected' : ''}>${opt}</option>`)
    .join('');
}
