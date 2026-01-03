# 💳 Payment Checkout System (Razorpay)

A production-ready full-stack payment checkout system built with **React, Node.js, Express, MongoDB, and Razorpay**.  
Implements secure order creation, server-side validation, real-time payment status tracking, and a polished success/failure flow.

---

## 🚀 Tech Stack

![React](https://img.shields.io/badge/React-Frontend-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2451)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

---

## ✨ Features

- Secure Razorpay order creation (amount controlled by backend)
- Zod-based server-side validation
- Real-time payment status polling
- Clean success & failure pages
- Payment metadata storage (orderId, paymentId, method, timestamp)
- Frontend error handling (field-level + form-level)
- Scalable, industry-style folder structure

---

## 📂 Project Structure

### Root
```text
payment-system/
├── client/          # React frontend
├── server/          # Node.js backend
├── README.md
└── .gitignore

Frontend (client/)
client/
├── src/
│   ├── components/
│   │   ├── PaymentButton.jsx
│   │   └── Spinner.jsx
│   │
│   ├── pages/
│   │   ├── Checkout.jsx
│   │   ├── SuccessPage.jsx
│   │   └── FailedPage.jsx
│   │
│   ├── services/
│   │   └── api.js            # Axios instance
│   │
│   ├── utils/
│   │   └── format.js         # Mask ID, date formatting
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
└── package.json

Backend (server/)
server/
├── controllers/
│   └── payment.controller.js
│
├── routes/
│   └── payment.routes.js
│
├── models/
│   └── order.model.js
│
├── services/
│   └── razorpay.service.js
│
├── validations/
│   └── checkout.schema.js
│
├── config/
│   ├── db.js
│   └── razorpay.js
│
├── utils/
│   └── asyncHandler.js
│
├── app.js
├── server.js
├── .env.example
└── package.json

🔐 Environment Variables

Create a .env file using this template:
PORT=8000
MONGO_URI=your_mongodb_connection
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

🔄 Payment Flow

1. User submits checkout form
2. Backend validates input using Zod
3. Server creates Razorpay order
4. Razorpay Checkout opens on frontend
5. Payment status is stored via webhook
6. Frontend polls /payment/status/:orderId
7. Success or failure page is rendered

🧠 Key Design Decisions
 • Backend is the single source of truth for payment amount
 • Razorpay logic isolated in a service layer
 • Validation handled strictly on the server (no frontend trust)
 • Polling used instead of blind redirects for payment confirmation

📌 Project Status
•  ✅ Actively tested
•  ✅ Ready for deployment
•  ✅ Resume & portfolio ready

📬 Author
Raj Das
Full-Stack Web Developer

---

### Straight truth
- This README is **interview-safe**.
- Recruiters will immediately understand the architecture.
- Don’t over-decorate it — clarity > cosmetics.

Next logical steps (pick one):
1️⃣ GitHub repo description + tags  
2️⃣ ATS-optimized resume bullets  
3️⃣ 2-minute interview explanation script
