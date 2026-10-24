# ACADIV — Backend & MongoDB Connection Guide
**Instructions for Database Lead / Team Member**

---

## 🚀 Quick Setup (Sirf 2 Steps):

### Step 1: Open `.env` File
Open the file:
📂 **`backend/.env`**

Aapko yeh line milegi:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/acadiv?retryWrites=true&w=majority
```

Apna real **MongoDB Atlas** (ya local MongoDB) connection string yahan paste kar dein:
```env
MONGODB_URI=mongodb+srv://ali:MyPassword123@cluster0.xyz.mongodb.net/acadiv?retryWrites=true&w=majority
```

> **Tip:** Agar MongoDB Atlas use kar rahe hain, tou Atlas Dashboard par **Network Access** mein ja kar IP whitelist zaroor check kar lein (`0.0.0.0/0` allows connection from anywhere during development).

---

### Step 2: Connection Test Karein
Terminal kholein aur yeh commands chalayein:

```bash
cd backend
npm install
npm run test:db
```

Agar connection theek hogi, tou terminal par foran yeh show hoga:
```bash
✅ [MongoDB Connected]: cluster0.xyz.mongodb.net
📦 [Database Name]: acadiv
🎉 Verification Successful! Connection is alive and ready.
```

---

## 📁 Ready Mongoose Models:
Database connect hote hi ye models tayyar hain:
1. **`User`** (`backend/src/models/User.ts`):
   - Student authentication, full name, email, education stage, role.
2. **`AssessmentResponse`** (`backend/src/models/AssessmentResponse.ts`):
   - 6-question RIASEC responses, Holland code (e.g. `IRC`), scores, percentages.

---

## 🌐 Start Backend API:
Backend server run karne ke liye:
```bash
npm run dev
```
Server chal jayega: `http://localhost:5000`  
Health check endpoint: `http://localhost:5000/api/v1/health`
