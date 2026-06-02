// Renders the user table body from data.js and wires the pencil-edit button
// to navigate to the edit page. Markup mirrors the original static rows so
// nothing changes visually.

import { loadUsers } from './data.js';

const STATUS_BADGE = {
  'Open': 'badge--open',
  'Paid': 'badge--paid',
  'Past Due': 'badge--due',
  'Inactive': 'badge--inactive',
};

const CURRENCY_FORMATTERS = new Map();
function formatAmount(value, currency) {
  let f = CURRENCY_FORMATTERS.get(currency);
  if (!f) {
    f = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
    });
    CURRENCY_FORMATTERS.set(currency, f);
  }
  return f.format(value);
}

function escape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const DESCRIPTION_MAX = 65;
function truncate(text) {
  const str = String(text ?? '');
  if (str.length <= DESCRIPTION_MAX) return str;
  return str.slice(0, DESCRIPTION_MAX - 1).trimEnd() + '…';
}

function balanceClass(value) {
  if (value < 0) return 'table__cell--balance-negative';
  if (value > 0) return 'table__cell--balance-positive';
  return '';
}

function rowHTML(user, index) {
  const badge = STATUS_BADGE[user.status] || '';
  const balanceSign = balanceClass(user.balance);
  return `
    <tr class="table__row">
      <td class="table__cell table__cell--select">
        <label class="checkbox">
          <input class="checkbox__input" type="checkbox" aria-label="Select row" />
          <span class="checkbox__box" aria-hidden="true"></span>
        </label>
      </td>
      <td class="table__cell table__cell--num" data-label="#">
        <div class="table__num">
          <span class="table__num-text">${index + 1}</span>
          <span class="user">
            <button class="user__edit" type="button" aria-label="Edit ${escape(user.name)}" data-edit-id="${user.id}">
              <i class="icon icon--pencil" aria-hidden="true"></i>
            </button>
          </span>
        </div>
      </td>
      <td class="table__cell table__cell--name">
        <div class="table__name">
          <span class="table__name-primary">${escape(user.name)}</span>
          <span class="table__name-secondary">${escape(user.reference)}</span>
        </div>
      </td>
      <td class="table__cell table__cell--description" data-label="Description">${escape(truncate(user.description))}</td>
      <td class="table__cell" data-label="Status"><span class="badge ${badge}">${escape(user.status)}</span></td>
      <td class="table__cell table__cell--numeric" data-label="Rate">${formatAmount(user.rate, user.currency)} <span class="table__currency">${escape(user.currency)}</span></td>
      <td class="table__cell table__cell--numeric ${balanceSign}" data-label="Balance">${formatAmount(user.balance, user.currency)}<span class="table__currency">${escape(user.currency)}</span></td>
      <td class="table__cell table__cell--numeric" data-label="Deposit">${formatAmount(user.deposit, user.currency)}<span class="table__currency">${escape(user.currency)}</span></td>
      <td class="table__cell table__cell--actions">
        <div class="dropdown" data-dropdown="row-actions">
          <button class="btn btn--icon" type="button" aria-label="Row actions" aria-haspopup="menu" aria-expanded="false">
            <i class="icon icon--three-vertical-dots" aria-hidden="true"></i>
          </button>
        </div>
      </td>
    </tr>
  `;
}

export function renderUsersTable() {
  const tbody = document.querySelector('.table__body');
  if (!tbody) return;

  const users = loadUsers();
  tbody.innerHTML = users.map(rowHTML).join('');

  // Delegated edit-button handler: navigates to the edit page for the
  // record represented by the clicked row.
  tbody.addEventListener('click', (event) => {
    const btn = event.target.closest('.user__edit');
    if (!btn) return;
    const id = btn.dataset.editId;
    if (!id) return;
    window.location.href = `./edit.html?id=${id}`;
  });
}
