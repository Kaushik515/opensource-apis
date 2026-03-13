const apiUrl = '/api/items';
const tableBody = document.querySelector('tbody');
const paginationDiv = document.getElementById('pagination');
const pageSizeTop = document.getElementById('pageSizeTop');
const pageSizeBottom = document.getElementById('pageSizeBottom');
const countryFilter = document.getElementById('countryFilter');
const capitalFilter = document.getElementById('capitalFilter');
const placeFilter = document.getElementById('placeFilter');

let currentPage = 1;
let pageSize = 10;
let totalItems = 0;
let totalPages = 1;
let filters = { country: '', capital: '', place: '' };

const pageSizes = [5, 10, 20, 50, 100];

function setPageSizeOptions() {
    [pageSizeTop, pageSizeBottom].forEach(sel => {
        sel.innerHTML = '';
        pageSizes.forEach(size => {
            const opt = document.createElement('option');
            opt.value = size;
            opt.textContent = size;
            if (size === pageSize) opt.selected = true;
            sel.appendChild(opt);
        });
        sel.value = pageSize;
        sel.addEventListener('change', (e) => {
            pageSize = parseInt(e.target.value);
            currentPage = 1;
            fetchData();
        });
    });
}

function setFilterEvents() {
    countryFilter.addEventListener('input', () => {
        filters.country = countryFilter.value;
        currentPage = 1;
        fetchData();
    });
    capitalFilter.addEventListener('input', () => {
        filters.capital = capitalFilter.value;
        currentPage = 1;
        fetchData();
    });
    placeFilter.addEventListener('input', () => {
        filters.place = placeFilter.value;
        currentPage = 1;
        fetchData();
    });
}

function fetchData() {
    let url = `${apiUrl}?page=${currentPage}&pageSize=${pageSize}`;
    if (filters.country) url += `&country=${encodeURIComponent(filters.country)}`;
    if (filters.capital) url += `&capital=${encodeURIComponent(filters.capital)}`;
    if (filters.place) url += `&place=${encodeURIComponent(filters.place)}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            totalItems = data.total;
            totalPages = Math.ceil(totalItems / pageSize);
            renderTable(data.items);
            renderPagination();
        });
}

function renderTable(items) {
    tableBody.innerHTML = '';
    items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.country}</td>
            <td>${item.capital}</td>
            <td>${item.place}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function renderPagination() {
    paginationDiv.innerHTML = '';
    const createBtn = (text, page, disabled = false, active = false) => {
        const btn = document.createElement('button');
        btn.textContent = text;
        if (disabled) btn.disabled = true;
        if (active) btn.classList.add('active');
        btn.addEventListener('click', () => {
            if (!disabled && currentPage !== page) {
                currentPage = page;
                fetchData();
            }
        });
        return btn;
    };
    paginationDiv.appendChild(createBtn('<', Math.max(1, currentPage - 1), currentPage === 1));
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationDiv.appendChild(createBtn(i, i, false, i === currentPage));
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.margin = '0 4px';
            paginationDiv.appendChild(dots);
        }
    }
    paginationDiv.appendChild(createBtn('>', Math.min(totalPages, currentPage + 1), currentPage === totalPages));
}

document.addEventListener('DOMContentLoaded', () => {
    setPageSizeOptions();
    setFilterEvents();
    fetchData();
});
