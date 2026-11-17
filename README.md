# Simple CRUD: React + Express + MySQL

## 1. Database
Run `backend/schema.sql` in MySQL (Workbench, phpMyAdmin or the terminal):
    mysql -u root -p < backend/schema.sql

## 2. Backend  (http://localhost:5000)
    cd backend
    npm install
    npm run dev

If your MySQL root user has a password, set it in `backend/db.js`
(or set the DB_PASSWORD environment variable).

## 3. Frontend  (http://localhost:5173)
    cd frontend
    npm install
    npm run dev

## Useful commands (for CI later)
Backend : npm ci -> npm test
Frontend: npm ci -> npm run lint -> npm run build
