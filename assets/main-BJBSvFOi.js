import{l as x}from"./data-Bzq6QmQN.js";const u=new Set;function $(e){const t=e.querySelector('[aria-haspopup="menu"]'),n=e.querySelector(".dropdown__menu");if(!t||!n)return null;const c=()=>Array.from(n.querySelectorAll(".dropdown__item")),a=()=>t.getAttribute("aria-expanded")==="true";function r(){var l;u.forEach(o=>{o!==d&&o.close()}),u.add(d),t.setAttribute("aria-expanded","true"),n.hidden=!1,document.addEventListener("click",_),document.addEventListener("keydown",f),(l=c()[0])==null||l.focus()}function s({restoreFocus:l=!1}={}){u.delete(d),t.setAttribute("aria-expanded","false"),n.hidden=!0,document.removeEventListener("click",_),document.removeEventListener("keydown",f),l&&t.focus()}function b(){a()?s():r()}function S(l){l.stopPropagation(),b()}function A(l){l.target.closest(".dropdown__item")&&s({restoreFocus:!0})}function _(l){e.contains(l.target)||s()}function f(l){var g,h,y,w;const o=c(),m=o.indexOf(document.activeElement);switch(l.key){case"Escape":l.preventDefault(),s({restoreFocus:!0});break;case"ArrowDown":l.preventDefault(),(g=o[(m+1)%o.length])==null||g.focus();break;case"ArrowUp":l.preventDefault(),(h=o[(m-1+o.length)%o.length])==null||h.focus();break;case"Home":l.preventDefault(),(y=o[0])==null||y.focus();break;case"End":l.preventDefault(),(w=o[o.length-1])==null||w.focus();break}}t.addEventListener("click",S),n.addEventListener("click",A);const d={open:r,close:s,toggle:b,isOpen:a};return d}const q={Open:"badge--open",Paid:"badge--paid","Past Due":"badge--due",Inactive:"badge--inactive"},E=new Map;function p(e,t){let n=E.get(t);return n||(n=new Intl.NumberFormat("en-US",{style:"currency",currency:t,currencyDisplay:"narrowSymbol"}),E.set(t,n)),n.format(e)}function i(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const k=65;function L(e){const t=String(e??"");return t.length<=k?t:t.slice(0,k-1).trimEnd()+"…"}function D(e){return e<0?"table__cell--balance-negative":e>0?"table__cell--balance-positive":""}function C(e,t){const n=q[e.status]||"",c=D(e.balance);return`
    <tr class="table__row">
      <td class="table__cell table__cell--select">
        <label class="checkbox">
          <input class="checkbox__input" type="checkbox" aria-label="Select row" />
          <span class="checkbox__box" aria-hidden="true"></span>
        </label>
      </td>
      <td class="table__cell table__cell--num" data-label="#">
        <div class="table__num">
          <span class="table__num-text">${t+1}</span>
          <span class="user">
            <button class="user__edit" type="button" aria-label="Edit ${i(e.name)}" data-edit-id="${e.id}">
              <i class="icon icon--pencil" aria-hidden="true"></i>
            </button>
          </span>
        </div>
      </td>
      <td class="table__cell table__cell--name">
        <div class="table__name">
          <span class="table__name-primary">${i(e.name)}</span>
          <span class="table__name-secondary">${i(e.reference)}</span>
        </div>
      </td>
      <td class="table__cell table__cell--description" data-label="Description">${i(L(e.description))}</td>
      <td class="table__cell" data-label="Status"><span class="badge ${n}">${i(e.status)}</span></td>
      <td class="table__cell table__cell--numeric" data-label="Rate">${p(e.rate,e.currency)} <span class="table__currency">${i(e.currency)}</span></td>
      <td class="table__cell table__cell--numeric ${c}" data-label="Balance">${p(e.balance,e.currency)}<span class="table__currency">${i(e.currency)}</span></td>
      <td class="table__cell table__cell--numeric" data-label="Deposit">${p(e.deposit,e.currency)}<span class="table__currency">${i(e.currency)}</span></td>
      <td class="table__cell table__cell--actions">
        <div class="dropdown" data-dropdown="row-actions">
          <button class="btn btn--icon" type="button" aria-label="Row actions" aria-haspopup="menu" aria-expanded="false">
            <i class="icon icon--three-vertical-dots" aria-hidden="true"></i>
          </button>
        </div>
      </td>
    </tr>
  `}function T(){const e=document.querySelector(".table__body");if(!e)return;const t=x();e.innerHTML=t.map(C).join(""),e.addEventListener("click",n=>{const c=n.target.closest(".user__edit");if(!c)return;const a=c.dataset.editId;a&&(window.location.href=`./edit.html?id=${a}`)})}T();const v=document.getElementById("row-actions-menu");v&&document.querySelectorAll('[data-dropdown="row-actions"]').forEach(e=>{e.appendChild(v.content.cloneNode(!0))});document.querySelectorAll(".dropdown").forEach(e=>$(e));R();I();M();P(10);function R(){const e=document.querySelectorAll(".table__sort");e.forEach(t=>{t.addEventListener("click",()=>{const n=t.closest("[aria-sort]");if(!n)return;const c=n.getAttribute("aria-sort"),a=c==="none"?"ascending":c==="ascending"?"descending":"none";e.forEach(r=>{var s;r!==t&&((s=r.closest("[aria-sort]"))==null||s.setAttribute("aria-sort","none"))}),n.setAttribute("aria-sort",a)})})}function I(){const e=document.querySelector(".table__head .checkbox__input"),t=document.querySelectorAll(".table__body .checkbox__input");!e||t.length===0||(e.addEventListener("change",()=>{t.forEach(n=>{n.checked=e.checked})}),t.forEach(n=>{n.addEventListener("change",()=>{const c=t.length,a=Array.from(t).filter(r=>r.checked).length;e.checked=a===c,e.indeterminate=a>0&&a<c})}))}function M(){const e=document.querySelector('[data-dropdown="rows-per-page"]');if(!e)return;const t=e.querySelector("[data-rows-per-page-label]"),n=e.querySelectorAll(".dropdown__item");n.forEach(c=>{c.addEventListener("click",()=>{const a=c.dataset.value;!a||!t||(t.textContent=a,n.forEach(r=>r.classList.toggle("dropdown__item--selected",r===c)))})})}function P(e){const t=document.querySelector('[data-pagination="prev"]'),n=document.querySelector('[data-pagination="next"]'),c=document.querySelectorAll("[data-pagination-status]");if(!t||!n||!c)return;let a=1;const r=()=>{c.forEach(s=>s.textContent=`${a}`),t.disabled=a===1,n.disabled=a===e};t.addEventListener("click",()=>{a>1&&(a-=1,r())}),n.addEventListener("click",()=>{a<e&&(a+=1,r())}),r()}
