# NestJS Permissions API

This project is a **NestJS backend** for managing users, companies, projects, and permissions with **JWT authentication** and **role-based access control (RBAC)**.

---

## 🚀 Features
- ✅ **User Authentication** (JWT-based)
- ✅ **Role-based Access Control** (RBAC)
- ✅ **Multi-company support**
- ✅ **CRUD operations** for Users, Companies, Projects, and Permissions
- ✅ **Swagger API documentation** (`/api/docs`)

---

## 🛠️ Installation & Setup
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-repo/nest-mongo-permissions.git
cd nest-mongo-permissions
```
### **2️⃣ Set Up Environment Variables**
Create a .env file and configure the required settings:

```bash
MONGO_URI=mongodb://mongodb:27017/nestdb
PORT=3000
JWT_SECRET=dac3fdfa64d5502a2b1aa6700fe22cf74f93d9a152d913d60a311216eebc05b5
```
### **3️⃣ Run the docker**
```bash
docker-compose up -d
```

### **📜 Swagger API Documentation**
Swagger is available at:
📌 http://localhost:3000/api/docs

🔹 Allows you to test API endpoints directly from the browser!


### **🧪 Running Tests**
To run unit tests:
```bash
npm run test
```