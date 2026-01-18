# 🛒 Product Management Application

A full-stack **Product Management System** built using **React, Node.js, Express, MongoDB**, and **Tailwind CSS**.  
This application allows users to manage products with features like image upload, publish/unpublish, and CRUD operations.

---

## ✨ Features

- Add new products
- Edit existing products
- Delete products
- Upload **multiple product images**
- Publish / Unpublish products
- Filter products (All / Published / Unpublished)
- Responsive and clean UI
- Modal-based product form
- REST API backend

---

## 🧱 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (Image upload)

---

## 📁 Project Structure

NewProject/
├── client/ # React frontend
├── server/ # Node + Express backend
├── uploads/ # Uploaded images (ignored in GitHub)
├── .env # Environment variables (ignored)
├── .gitignore
└── README.md


---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/product-management-app.git
cd product-management-app

2️⃣ Backend Setup
cd server
npm install


Create a .env file inside server/:

PORT=5000
MONGO_URI=mongodb+srv://example_db_user:ACyYzA4CwwDw2t0I@cluster0.sswfwbb.mongodb.net/?appName=Cluster0
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000

EMAIL_SERVICE=smtp-relay.brevo.com

EMAIL_USER=a046c1001@smtp-brevo.com
EMAIL_PASS=xsmtpsib-7dae7225f50861b4f707c4ac1731b4b05f4f5612d40f2a0ccee5719e9e820db2-Kkm0GZwwNUPwzovi

Start backend:

npm start

3️⃣ Frontend Setup
cd client
npm install
npm start


Frontend runs on:

http://localhost:3000


Backend runs on:

http://localhost:5000

🖼 Image Upload Notes

Images are uploaded using Multer

Stored locally in the uploads/ folder (not pushed to GitHub)

Supports multiple image uploads

Only image formats allowed: jpg, jpeg, png, webp

🔐 Environment Variables

The following files/folders are not uploaded to GitHub:

node_modules/

.env

uploads/

build/ or dist/

They are recreated during installation or runtime.