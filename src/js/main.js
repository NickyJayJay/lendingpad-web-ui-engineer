// Entry module. Wires up the four interactions called for by the spec:
//   1. Dropdowns   — row-actions menus + rows-per-page selector
//   2. Sort toggle — cycle aria-sort on click; swap chevron icon (no data sort)
//   3. Select-all  — header checkbox toggles rows + reflects indeterminate state
//   4. Pagination  — prev/next buttons walk a hardcoded page number
//
// All interactions are presentational — there is no data layer.

import { createDropdown } from './dropdown.js';

// The row-actions menu is identical on every row; rather than repeat the
// markup 12 times, we keep it in a <template> and clone it into each row's
// action dropdown at init.
const rowActionsTemplate = document.getElementById('row-actions-menu');
if (rowActionsTemplate) {
  document.querySelectorAll('[data-dropdown="row-actions"]').forEach((wrap) => {
    wrap.appendChild(rowActionsTemplate.content.cloneNode(true));
  });
}

document.querySelectorAll('.dropdown').forEach((el) => createDropdown(el));

initSortHeaders();
initSelectAll();
initRowsPerPage();
initPagination(10);

// Sort headers — cycle none → ascending → descending → none. Clicking a
// different header resets all other columns to none. Purely visual.
function initSortHeaders() {
  const buttons = document.querySelectorAll('.table__sort');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const th = btn.closest('[aria-sort]');
      if (!th) return;
      const current = th.getAttribute('aria-sort');
      const next = current === 'none' ? 'ascending'
                 : current === 'ascending' ? 'descending'
                 : 'none';

      buttons.forEach((other) => {
        if (other !== btn) {
          other.closest('[aria-sort]')?.setAttribute('aria-sort', 'none');
          setSortIcon(other, 'none');
        }
      });

      th.setAttribute('aria-sort', next);
      setSortIcon(btn, next);
    });
  });
}

function setSortIcon(button, state) {
  const icon = button.querySelector('.table__sort-icon');
  if (!icon) return;
  icon.classList.remove('icon--up-sorting', 'icon--down-sorting');
  icon.classList.add(state === 'descending' ? 'icon--down-sorting' : 'icon--up-sorting');
}

// Select-all — header checkbox mirrors state to all body rows and reflects
// the aggregate (checked / unchecked / indeterminate) of the row checkboxes.
function initSelectAll() {
  const head = document.querySelector('.table__head .checkbox__input');
  const rows = document.querySelectorAll('.table__body .checkbox__input');
  if (!head || rows.length === 0) return;

  head.addEventListener('change', () => {
    rows.forEach((cb) => { cb.checked = head.checked; });
  });

  rows.forEach((cb) => {
    cb.addEventListener('change', () => {
      const total = rows.length;
      const checked = Array.from(rows).filter((r) => r.checked).length;
      head.checked = checked === total;
      head.indeterminate = checked > 0 && checked < total;
    });
  });
}

// Rows-per-page — clicking a menu item updates the trigger label. The
// Dropdown class closes the menu for us.
function initRowsPerPage() {
  const dropdown = document.querySelector('[data-dropdown="rows-per-page"]');
  if (!dropdown) return;
  const label = dropdown.querySelector('[data-rows-per-page-label]');
  const items = dropdown.querySelectorAll('.dropdown__item');

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const value = item.dataset.value;
      if (!value || !label) return;
      label.textContent = value;
      items.forEach((other) => other.classList.toggle('dropdown__item--selected', other === item));
    });
  });
}

// Pagination — increments/decrements a hardcoded page counter; disables the
// prev/next buttons at the bounds. No data fetching.
function initPagination(totalPages) {
  const prev = document.querySelector('[data-pagination="prev"]');
  const next = document.querySelector('[data-pagination="next"]');
  const status = document.querySelector('[data-pagination-status]');
  if (!prev || !next || !status) return;

  let page = 1;

  const render = () => {
    status.textContent = `${page} of ${totalPages}`;
    prev.disabled = page === 1;
    next.disabled = page === totalPages;
  };

  prev.addEventListener('click', () => { if (page > 1) { page -= 1; render(); } });
  next.addEventListener('click', () => { if (page < totalPages) { page += 1; render(); } });

  render();
}
