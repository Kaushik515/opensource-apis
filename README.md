# Simple REST API with Pagination

This project is a minimal open source REST API built with Node.js and Express. It provides a paginated endpoint for a list of items (e.g., users, posts, products) using in-memory data. CORS is enabled for public use.

## Features
- Endpoint: `/api/items` returns a paginated list of items
- Query parameters: `page` (default 1), `limit` (default 10)
- Response includes: `data`, `total`, `page`, `limit`, `totalPages`
- In-memory data (no database required)
- CORS enabled

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or newer recommended)

### Installation
1. Clone or download this repository.
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the API
Start the server with:
```sh
npm start
```
The API will be available at [http://localhost:3000/api/items](http://localhost:3000/api/items)

### API Usage
#### GET `/api/items`
Query parameters:
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Items per page

Example:
```
GET http://localhost:3000/api/items?page=2&limit=5
```

#### Example Response
```
{
  "data": [ ...items... ],
  "total": 50,
  "page": 2,
  "limit": 5,
  "totalPages": 10
}
```

## License
MIT
