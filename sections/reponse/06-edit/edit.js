document.addEventListener('DOMContentLoaded', () => {
  const editor = document.querySelector('#reponse-edit [contenteditable="true"]');
  if (editor) editor.setAttribute('spellcheck', 'true');
});
