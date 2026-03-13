# Pagination API (Open Source Example)

A simple open source REST API with pagination, built using Node.js/Express and in-memory data, with a modern frontend for demonstration.

## Features
- REST API with pagination, filtering, and search
- Enterprise-style frontend table (HTML/CSS/JS)
- No database required (in-memory data)
- Easy to run locally

## Folder Structure
```
pagination-api/
  ├── index.js         # Main API server
  ├── package.json     # Node.js dependencies
  ├── public/          # Frontend files
  │   ├── index.html
  │   ├── style.css
  │   └── script.js
  └── README.md        # This file
```

## Getting Started

### 1. Install dependencies
```
cd pagination-api
npm install
```

### 2. Start the API server
```
npm start
```

- The API will run at: `http://localhost:3001/api/items`
- The frontend will be available at: `http://localhost:3001/index.html`

## API Usage
- `GET /api/items?page=1&pageSize=10` — Get paginated items
- Supports filtering by country, capital, and place via query params

## Frontend Usage
- Open `http://localhost:3001/index.html` in your browser
- Use the table to search, filter, and paginate through the data

## License
MIT

---

Feel free to fork, contribute, or use this as a template for your own open source APIs!
