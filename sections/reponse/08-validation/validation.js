document.addEventListener('DOMContentLoaded', () => {
  const status = document.querySelector('[data-validation-status]');
  document.querySelector('[data-validation-action="validate"]')?.addEventListener('click', () => {
    status.hidden = false;
  });
  document.querySelector('[data-validation-action="edit"]')?.addEventListener('click', () => {
    document.querySelector('#reponse-edit')?.scrollIntoView({ behavior: 'smooth' });
  });
});
