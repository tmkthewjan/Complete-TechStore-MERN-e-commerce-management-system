# 🛒 TechStore – MERN E-Commerce Management System

A full-stack **E-Commerce Management System** developed using the **MERN Stack**. The system provides a complete online shopping experience with product management, user authentication, shopping cart functionality, order management, and an administrative management interface.

This project was developed to gain practical experience in **full-stack web development, RESTful APIs, database management, authentication, CRUD operations, and modern frontend development**.

---

## 📌 Project Overview

**TechStore** is a web-based e-commerce management platform designed to manage an online technology store.

The system consists of two main parts:

* 🖥️ **Frontend** – Customer-facing e-commerce interface
* ⚙️ **Backend** – RESTful API and database management

The application allows customers to browse products, manage their shopping cart, and place orders while administrators can manage products and other store-related information.

---

## 🚀 Key Features

### 👤 User Management

* User registration
* User login and authentication
* User profile management
* Secure authentication
* Role-based access

### 🛍️ Product Management

* Add new products
* View products
* Update product information
* Delete products
* Product categorization
* Product details
* Product search

### 🛒 Shopping Cart

* Add products to cart
* Remove products from cart
* Update product quantities
* Calculate cart totals
* Manage selected products

### 📦 Order Management

* Create orders
* View order information
* Manage customer orders
* Order status management

### 🔐 Authentication & Authorization

* Secure user authentication
* Protected API routes
* Role-based authorization
* Password security

### 👨‍💼 Admin Management

Administrators can manage important e-commerce operations including:

* Product management
* User management
* Order management
* Store data management

---

## 🧰 Technologies Used

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* React Router
* Axios

### Backend

* Node.js
* Express.js
* RESTful API
* JavaScript

### Database

* MongoDB
* Mongoose

### Development Tools

* Git
* GitHub
* Visual Studio Code
* Postman
* npm

---

## 🏗️ Project Architecture

```text
TechStore
│
├── front-end/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔄 Application Workflow

```text
Customer
   │
   ▼
React Frontend
   │
   │ HTTP Requests
   ▼
Express / Node.js Backend
   │
   │ Mongoose
   ▼
MongoDB Database
```

The frontend communicates with the backend through RESTful API endpoints. The backend handles business logic and database operations using MongoDB and Mongoose.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tmkthewjan/Complete-TechStore-MERN-e-commerce-management-system.git
```

```bash
cd Complete-TechStore-MERN-e-commerce-management-system
```

---

### 2. Setup Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure your environment variables.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

or:

```bash
npm start
```

---

### 3. Setup Frontend

Open another terminal and navigate to the frontend:

```bash
cd front-end
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The application will then be available through the local development URL shown in the terminal.

---

## 🔑 Environment Variables

The backend requires environment variables for configuration.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> ⚠️ Never upload your `.env` file or private credentials to GitHub.

---

## 📡 API Structure

The backend follows a RESTful API architecture.

Example API operations include:

```text
Users
├── POST   /api/users/register
├── POST   /api/users/login
└── GET    /api/users/profile

Products
├── GET    /api/products
├── GET    /api/products/:id
├── POST   /api/products
├── PUT    /api/products/:id
└── DELETE /api/products/:id

Orders
├── POST   /api/orders
├── GET    /api/orders
└── GET    /api/orders/:id
```

*The exact endpoints may vary depending on the current implementation.*

---

## 📚 What I Learned

Through this project, I gained practical experience in:

* Full-stack web application development
* React component development
* REST API development
* Node.js and Express.js
* MongoDB database integration
* Mongoose data modelling
* CRUD operations
* User authentication
* Authorization
* API testing with Postman
* Git and GitHub version control
* Frontend and backend integration
* Managing an e-commerce application workflow

---

## 🎯 Project Objectives

The main objectives of this project were to:

1. Develop a complete full-stack web application.
2. Understand frontend and backend integration.
3. Implement database-driven functionality.
4. Develop RESTful APIs.
5. Implement authentication and authorization.
6. Apply CRUD operations in a real-world application.
7. Gain practical experience with the MERN stack.

---

## 🔮 Future Improvements

Possible future improvements include:

* 💳 Online payment gateway integration
* ⭐ Product rating and review system
* ❤️ Wishlist functionality
* 📧 Email notifications
* 📊 Advanced admin dashboard
* 📈 Sales analytics and reports
* 🔎 Advanced product filtering
* 📱 Improved mobile responsiveness
* ☁️ Cloud deployment
* 🧪 Automated testing

---

## 👨‍💻 Developer

### T.M. Kethmika Thewjan

**Information Technology Undergraduate**

Interested in:

* Full-Stack Development
* Software Engineering
* Web Application Development
* Backend Development
* Database Management

### GitHub

[github.com/tmkthewjan](https://github.com/tmkthewjan)

### Project Repository

[Complete TechStore – MERN E-Commerce Management System](https://github.com/tmkthewjan/Complete-TechStore-MERN-e-commerce-management-system)

---

## 📄 License

This project was developed for educational and portfolio purposes.
