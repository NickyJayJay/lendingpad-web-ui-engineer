// Dropdown
// Controls an anchored menu next to a trigger button. The HTML must use the
// `.dropdown` block from _dropdown.scss: a trigger with aria-haspopup="menu"
// and a sibling .dropdown__menu with role="menu".
//
// Behavior:
//   - Click trigger          → toggle
//   - Click outside / Escape → close (Escape restores focus to the trigger)
//   - Click a menu item      → close
//   - ArrowDown / ArrowUp    → move focus between items when open
//   - Home / End             → jump to first / last item
//
// All open instances share a registry so opening one dropdown closes any
// other open dropdown automatically — you can't have two open at once.

const openInstances = new Set();

export function createDropdown(root) {
  const trigger = root.querySelector('[aria-haspopup="menu"]');
  const menu = root.querySelector('.dropdown__menu');
  if (!trigger || !menu) return null;

  const items = () => Array.from(menu.querySelectorAll('.dropdown__item'));
  const isOpen = () => trigger.getAttribute('aria-expanded') === 'true';

  function open() {
    openInstances.forEach((d) => { if (d !== api) d.close(); });
    openInstances.add(api);

    trigger.setAttribute('aria-expanded', 'true');
    menu.hidden = false;

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeyDown);

    items()[0]?.focus();
  }

  function close({ restoreFocus = false } = {}) {
    openInstances.delete(api);
    trigger.setAttribute('aria-expanded', 'false');
    menu.hidden = true;

    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onKeyDown);

    if (restoreFocus) trigger.focus();
  }

  function toggle() {
    if (isOpen()) close();
    else open();
  }

  function onTriggerClick(event) {
    event.stopPropagation();
    toggle();
  }

  function onMenuClick(event) {
    if (event.target.closest('.dropdown__item')) {
      close({ restoreFocus: true });
    }
  }

  function onDocumentClick(event) {
    if (!root.contains(event.target)) close();
  }

  function onKeyDown(event) {
    const list = items();
    const index = list.indexOf(document.activeElement);

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close({ restoreFocus: true });
        break;
      case 'ArrowDown':
        event.preventDefault();
        list[(index + 1) % list.length]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        list[(index - 1 + list.length) % list.length]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        list[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        list[list.length - 1]?.focus();
        break;
    }
  }

  trigger.addEventListener('click', onTriggerClick);
  menu.addEventListener('click', onMenuClick);

  const api = { open, close, toggle, isOpen };
  return api;
}
