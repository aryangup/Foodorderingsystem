# Crave — Food Ordering System

A responsive, full-stack food ordering mini-project built with **HTML, CSS, JavaScript, Node.js, and Express**. It is designed as a student project and runs locally without a database server.

## Features
- Responsive food ordering website
- Menu with categories and live search
- Add to cart, quantity controls, and subtotal
- Checkout form with name, phone, and delivery address validation
- Order API and order history saved to `data/orders.json`
- Mobile-friendly layout
- REST endpoints for menu and orders

## Requirements
- Node.js 18+ (includes npm)

## Run locally
1. Extract this ZIP.
2. Open a terminal in the extracted `Food-Ordering-System` folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open http://localhost:3000 in your browser.

## API
- `GET /api/menu` — list menu items
- `GET /api/orders` — recent order summaries
- `POST /api/orders` — create an order

Example POST body:
```json
{
  "customer": "Aaryankumar Gupta",
  "phone": "9876543210",
  "address": "Ahmedabad, Gujarat",
  "items": [{"id": 1, "qty": 2}]
}
```

## Project structure
```text
Food-Ordering-System/
├── data/
│   └── orders.json
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── package.json
├── server.js
└── README.md
```

## Notes
- This demo does not process online payments.
- Orders are stored in a local JSON file. For a production or database-focused college submission, connect MySQL/MongoDB and add authentication/admin controls.
- Do not commit private credentials or API keys to a public repository.

## Publish to GitHub
1. Create a new repository named `Food-Ordering-System` at https://github.com/new.
2. Upload the extracted project files, or use Git:
   ```bash
   git init
   git add .
   git commit -m "Initial Food Ordering System"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/Food-Ordering-System.git
   git push -u origin main
   ```
3. Replace `YOUR-USERNAME` with your GitHub username. The repository URL will then be `https://github.com/YOUR-USERNAME/Food-Ordering-System`.

GitHub repository upload instructions: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file
