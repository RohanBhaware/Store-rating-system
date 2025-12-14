# Retail Store Rating System (Full Stack Project)

---

## Features
### User Roles

The application supports **three roles**:

1. **Admin**
2. **Normal User**
3. **Store Owner**

---

###  Authentication & Authorization

* Secure **JWT-based authentication**
* Role-based access control
* Protected routes for admin-only pages

---

### Admin Features

* Add **Store Owners**
* Add **Stores**
* Assign store owners to stores
* View system dashboard:

  * Total users
  * Total stores
  * Total ratings

---

### User Features

* Register & Login
* View all stores
* Submit or update ratings (1–5)
* View store ratings and average rating

---

### Store Owner Features

* View ratings given to their stores
* See average store rating

---

## Tech Stack

### Frontend

* React (Vite)
* Bootstrap 5
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd Assignment
`

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend server:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:3000


### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

---

### Admin

| Method | Endpoint                        |
| ------ | ------------------------------- |
| POST   | `/api/users/create`             |
| GET    | `/api/users`                    |
| POST   | `/api/stores/create`            |
| GET    | `/api/stores/dashboard/summary` |

---

### Stores & Ratings

| Method | Endpoint                      |
| ------ | ----------------------------- |
| GET    | `/api/stores`                 |
| GET    | `/api/stores/:id`             |
| POST   | `/api/ratings`                |
| GET    | `/api/ratings/store/:storeId` |

---

## 🧪 Testing

* APIs tested using **Postman**
* JWT token passed via:

```
Authorization: Bearer <TOKEN>
```

## UI Design

* Built with **Bootstrap**
* Responsive design
* Clean admin dashboard
* Simple and user-friendly interface

---

## 🔐 Security

* Passwords hashed using **bcrypt**
* JWT tokens for authentication
* Role-based route protection
* `.env` files ignored via `.gitignore`

---

## 📸 Screens (Optional)

You can add screenshots here later:

```md
![Login Page](screens/login.png)
![Admin Dashboard](screens/admin.png)
```

---

## 🚀 Future Improvements

* Store image upload
* Pagination & search
* Dark mode
* Analytics charts
* Email notifications

---

## 🧠 Learning Outcomes

* Full-stack development
* REST API design
* Authentication & authorization
* MongoDB schema design
* Role-based access control
* Git & GitHub workflow

---

## 👨‍💻 Author

**Rohan Bhaware**
Computer Science & Engineering
Full-Stack Developer

---

## 📄 License

This project is for **educational purposes**.

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!

---

### ✅ HOW TO ADD THIS README

1. Create file `README.md` in your repo
2. Paste everything above
3. Commit & push:

```bash
git add README.md
git commit -m "Add detailed README"
git push
```

---

If you want, I can:

* Customize README with **your GitHub username**
* Add **screenshots section**
* Make a **short README for recruiters**

Just tell me 👍
