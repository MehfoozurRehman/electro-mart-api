# Electro Mart API

Express and MongoDB REST API for an electronics shop: products, categories, orders, users, banners and content.

**Status:** Working demo. Every resource has a full set of routes, the user routes hash passwords with bcrypt, and the server starts with `npm start` once `MONGO_URL` is set. It has no authentication on write routes, no tests, and no deployment config.

## The problem

An online electronics store needs a back end for its storefront and admin tools: a product catalogue grouped into categories, a way to place and manage orders, customer accounts, promotional banners and page content. This API provides those resources so a front end can read and change them over HTTP.

## What it does

- **Catalogue:** list, read, create, update and delete products and categories (`src/router/products.js`, `categories.js`).
- **Orders:** the same CRUD set for customer orders (`src/router/orders.js`).
- **Accounts:** `register`, `login` and user CRUD. Passwords are hashed with bcrypt on register, and login compares the hash (`src/router/users.js`).
- **Storefront content:** banners and editable page content through their own routers (`banners.js`, `content.js`).

## How it's built

- Node.js with Express 4 and Mongoose 7 on MongoDB, with `cors` and `dotenv`.
- `src/index.js` connects to MongoDB and mounts each router under `/api/<resource>`. The routers each export an Express router, and the models in `src/model` define `user` and `banner` schemas.
- Each router uses the same handler shape: `async` functions that query Mongoose and return JSON, so the resources are consistent to call.
- Cloudinary is listed as a dependency for image hosting, but no route uses it yet.

## Running it locally

Requires Node.js and a MongoDB connection string.

```bash
npm install
# create .env with MONGO_URL (and optionally PORT, default 8000)
npm run dev     # nodemon src/index.js
npm start       # node src/index.js
```

## What's left

- Write routes (create, update, delete for products, categories, orders, banners and content) are open to any caller. There is no token or session check.
- Login returns only a success message and the email. It does not issue a token, so the API cannot identify who is calling.
- In `users.js`, the login handler sends a 400 when email or password is missing but does not return, so the code continues and may try to send a second response.
- No tests exist.
- Cloudinary is a dependency with no route using it.
