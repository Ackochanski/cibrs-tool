// Simple client-side search over DATA by code.
(function () {
  const input = document.getElementById('q');
  const results = document.getElementById('results');

  if (!window.DATA) {
    results.innerHTML = '<p><em>Add your dataset to <code>data.js</code>.</em></p>';
    return;
  }

  function render(items) {
    results.innerHTML = items.map(item =>
      `<div class="row"><strong>${item.code}</strong> — ${item.text || ''}</div>`
    ).join('') || '<p>No matches.</p>';
  }

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const out = window.DATA.filter(d => String(d.code).toLowerCase().includes(q));
    render(out);
  });
})();