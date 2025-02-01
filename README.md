# FAQ API - Multilingual Support

## 🚀 Overview
This project is a multilingual FAQ API built with **TypeScript, Express, MongoDB, and Redis**, supporting automated translations and caching for high performance.

## 📌 Features
- **Multilingual FAQs** - Automatically translates FAQs using Google Translate API.
- **REST API with Express** - Provides endpoints to manage FAQs.
- **Redis Caching** - Improves performance by caching translations.
- **Docker & Deployment** - Fully containerized for easy deployment on AWS EC2.
- **Unit Testing** - Jest and Supertest for API testing.

## 🛠 Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Maniii97/BharatFD-Task.git
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file:
```ini
DB_URL=mongodb://your-mongo-host:27017/your-database
REDIS_URL=redis://your-redis-host:6379
```

## 🚀 Running the Application

### **Development Mode**
```sh
npm run dev
```

### **Production Mode**
```sh
npm run build
npm start
```

## 🐳 Docker Setup

### **Build and Run the Docker Container Locally**
```sh
docker build -t faq-api .
docker run -p 3000:3000 --env-file .env faq-api
```

### **Using Docker Compose**
```sh
docker-compose up --build -d
```

## 🌍 API Endpoints

### **Fetch FAQs (Default: English)**
```sh
GET /api/faq/
```

### **Fetch FAQs in Hindi**
```sh
GET /api/faq?lang=hi
```

### **Add a New FAQ**
```sh
POST /api/faq/
Content-Type: application/json

{
  "question": "What are you running?",
  "answer": "My life my rulezz"
}
```

## 🧪 Running Tests
```sh
npm run test
```
