const API_URL = 'http://localhost:3001/api/items';
const tableBody = document.querySelector('#countries-table tbody');
const paginationControls = document.getElementById('pagination-controls');
const limitSelectTop = document.getElementById('limit-select');
const limitSelectBottom = document.getElementById('limit-select-bottom');

let page = 1;
let limit = 10;
let totalPages = 1;

function fetchCountries() {
  fetch(`${API_URL}?page=${page}&limit=${limit}`)
    .then(res => res.json())
    .then(data => {
      renderTable(data.data, (data.page - 1) * data.limit);
      totalPages = data.totalPages;
      renderPagination();
    });
}

function renderTable(countries, offset) {
  tableBody.innerHTML = '';
  countries.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="id-col">${offset + idx + 1}</td>
      <td>${item.country ? item.country : ''}</td>
      <td>${item.capital ? item.capital : ''}</td>
      <td>${item.famousPlace ? item.famousPlace : ''}</td>
    `;
    tableBody.appendChild(tr);
  });
}

function renderPagination() {
  paginationControls.innerHTML = '';
  // Prev button
  const prevBtn = document.createElement('button');
  prevBtn.textContent = '<';
  prevBtn.className = 'pagination-btn';
  prevBtn.disabled = page === 1;
  prevBtn.onclick = () => { if (page > 1) { page--; fetchCountries(); } };
  paginationControls.appendChild(prevBtn);

  // Page numbers (show up to 5 pages, with ... if needed)
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, page + 2);
  if (page <= 3) { start = 1; end = Math.min(5, totalPages); }
  if (page >= totalPages - 2) { end = totalPages; start = Math.max(1, totalPages - 4); }
  for (let i = start; i <= end; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'pagination-btn' + (i === page ? ' active' : '');
    btn.disabled = i === page;
    btn.onclick = () => { page = i; fetchCountries(); };
    paginationControls.appendChild(btn);
  }

  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.textContent = '>';
  nextBtn.className = 'pagination-btn';
  nextBtn.disabled = page === totalPages;
  nextBtn.onclick = () => { if (page < totalPages) { page++; fetchCountries(); } };
  paginationControls.appendChild(nextBtn);
}

// Sync limit selects
function syncLimitSelects(newLimit) {
  limitSelectTop.value = newLimit;
  limitSelectBottom.value = newLimit;
}

limitSelectTop.addEventListener('change', (e) => {
  limit = parseInt(e.target.value, 10);
  page = 1;
  syncLimitSelects(limit);
  fetchCountries();
});
limitSelectBottom.addEventListener('change', (e) => {
  limit = parseInt(e.target.value, 10);
  page = 1;
  syncLimitSelects(limit);
  fetchCountries();
});

// Initial load
syncLimitSelects(limit);
fetchCountries();
