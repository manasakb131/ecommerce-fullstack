# 🛒 E-Commerce Platform (Full Stack)

## 🚀 Project Overview

This is a full-stack E-Commerce web application where users can browse products, add items to cart/wishlist, and complete purchases using Razorpay. Vendors can manage products, and the system simulates a real-world shopping experience similar to Amazon/Flipkart.

---

## ✨ Features

### 👤 User Features

* User Registration & Login (JWT Authentication)
* Browse Products
* Search & Filter Products
* View Product Details (Image, Price, Ratings, Reviews)
* Add to Cart
* Add to Wishlist
* Remove from Cart/Wishlist
* Quantity Management in Cart
* Razorpay Payment Integration (Buy Now & Checkout)
* View Orders

---

### 🛠 Admin / Backend Features

* Create Product
* Update Product
* Delete Product
* Product API Management
* MongoDB Database Integration

---

## 🧱 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Other Tools

* Razorpay (Payment Gateway)
* JWT (Authentication)
* Cloudinary (Image Upload - optional)

---

## 📁 Project Structure

```
ecommerce-project/

├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── app.js
│   ├── package.json

├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js

└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/ecommerce-project.git
cd ecommerce-project
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create a `.env` file in backend:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce

JWT_SECRET=your_secret_key

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

Run backend:

```
npm start
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Products

* GET `/api/products` → Get all products
* GET `/api/products/:id` → Get single product
* POST `/api/products` → Create product
* PUT `/api/products/:id` → Update product
* DELETE `/api/products/:id` → Delete product

### Users

* POST `/api/users/register`
* POST `/api/users/login`

### Payment

* POST `/api/payment/create-order`

---

## 💳 Payment Integration

* Razorpay is used for handling payments
* Supports:

  * Buy Now
  * Cart Checkout

---

## 📌 How to Use

1. Register/Login
2. Browse products
3. Add to cart or wishlist
4. Proceed to checkout
5. Complete payment using Razorpay
6. View orders

---

## ⚠️ Important Notes

* Do NOT upload `.env` file to GitHub
* Install dependencies using `npm install`
* Ensure MongoDB is running locally

---

## 🎯 Future Improvements

* Admin Dashboard UI
* Order tracking system
* Product reviews by users
* Deployment (Render / Vercel)

---

## 👨‍💻 Author

Developed as part of internship project.
MANASA K B
---
