# Order Management API

A RESTful API for order management with authentication and state transitions.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)
![Express](https://img.shields.io/badge/Express-5.x-black)

## 📌 Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Testing:** Vitest
- **Documentation:** Swagger UI

## 📁 Project Structure

```
src/
├── config/
│   ├── index.ts          # Environment variables
│   ├── database.ts       # MongoDB connection
│   └── swagger.ts        # Swagger configuration
├── controllers/
│   ├── authController.ts # Auth logic
│   └── orderController.ts# Orders logic
├── middlewares/
│   └── authMiddleware.ts # JWT validation
├── models/
│   ├── User.ts           # User schema
│   └── Order.ts          # Order schema
├── routes/
│   ├── authRoutes.ts     # Auth endpoints
│   └── orderRoutes.ts    # Order endpoints
├── tests/
│   └── orderState.test.ts# Unit tests
└── server.ts             # App entry point
```

## 🧠 Business Rules

### 👤 Authentication
- User registration with unique email
- Login returning JWT token
- Protected routes require valid Bearer token

### 📦 Orders
- Fields: `lab`, `patient`, `customer`, `services[]`
- Default state: `CREATED`, status: `ACTIVE`
- Services array is required and must have total value > 0

### 🔄 State Flow
```
CREATED → ANALYSIS → COMPLETED
```
- Strict order: cannot skip or go back
- Deleted orders cannot be advanced

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/SpeedyxBR/order-management-challenge.git
cd order-management-challenge
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure environment variables
Copy the example file and edit with your values:
```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/order-management
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

### 4️⃣ Run in development mode
```bash
npm run dev
```

Server available at: `http://localhost:3000`

## 📚 API Documentation

### Swagger UI
Access interactive documentation at:
```
http://localhost:3000/docs
```

### Postman Collection
Import the collection from:
```
docs/postman/Order_Management_API.postman_collection.json
```

## 🔌 Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get JWT |

### Orders (requires authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Create order |
| GET | `/orders` | List orders (paginated) |
| GET | `/orders?state=CREATED` | Filter by state |
| PATCH | `/orders/:id/advance` | Advance state |

## 🧪 Running Tests

```bash
npm test
```

### Test Coverage
- State transition logic (CREATED → ANALYSIS → COMPLETED)
- Validation for invalid state transitions
- Block skipping or reversing states

## 📊 Data Models

### User
```typescript
{
  email: string,      // unique
  password: string,   // hashed with bcrypt
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```typescript
{
  lab: string,
  patient: string,
  customer: string,
  state: 'CREATED' | 'ANALYSIS' | 'COMPLETED',
  status: 'ACTIVE' | 'DELETED',
  services: [{
    name: string,
    value: number,
    status: 'PENDING' | 'DONE'
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security
- Passwords hashed with bcrypt (10 salt rounds)
- JWT for stateless authentication
- Protected routes with auth middleware

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Compile TypeScript |
| `npm start` | Run production build |
| `npm test` | Run tests with Vitest |

## 👨‍💻 Author

**Andrel**

---

Made with ❤️ for the Backend Technical Challenge
