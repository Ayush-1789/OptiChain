# Walmart Quantum Supply Chain Suite

A revolutionary AI-powered supply chain optimization platform built with React and Express.

## 🚀 Features

- **7 AI-Powered Modules**: Inventory Simulator, Returns Radar, Supply Mesh, Demand DNA, Smart Drop Sync, DropBot, and LoadSwap
- **Role-Based Access Control**: Admin, inventory, returns, logistics, supplier, and analyst roles
- **Beautiful Animations**: Framer Motion and Lottie animations throughout
- **Modern UI**: Tailwind CSS with custom Walmart branding
- **Real-time Data**: In-memory data simulation with REST APIs

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lottie React for micro-animations
- React Router for navigation
- Axios for API calls

### Backend
- Node.js 16+ with Express 4
- JWT authentication
- CORS enabled
- In-memory data storage

## 📦 Installation

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd walmart-quantum-supply-chain
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Backend Server**
   ```bash
   cd ../backend
   npm run dev
   ```
   Server will start on http://localhost:5000

5. **Start the Frontend Application**
   ```bash
   cd ../frontend
   npm start
   ```
   Application will open on http://localhost:3000

## 🎯 Usage

### Landing Page
- Navigate to http://localhost:3000 to view the stunning landing page
- Click "Request Demo" to see the demo request modal
- Scroll through the features and timeline sections

### Authentication
- Use the demo credentials provided in the login page
- Different roles have access to different modules

### API Endpoints
- `GET /api/inventory` - Get inventory data
- `POST /api/inventory/simulate` - Simulate inventory changes
- `GET /api/returns/predict` - Get returns predictions
- `GET /api/suppliers/score` - Get supplier scores
- `GET /api/demand/spike` - Get demand spike predictions
- `GET /api/crossdock/optimize` - Get crossdock optimizations
- `GET /api/dispatcher/assign` - Get dispatcher assignments
- `GET /api/loadswap/rebalance` - Get load rebalancing data

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## 🎨 Customization

### Colors
The project uses custom Walmart colors defined in `tailwind.config.js`:
- `walmart-blue`: #004c91
- `walmart-yellow`: #ffc220
- `walmart-gray`: #f5f5f5
- `walmart-dark`: #1a1a1a
- `quantum-purple`: #6366f1
- `quantum-cyan`: #06b6d4
- `quantum-green`: #10b981
- `quantum-orange`: #f59e0b

### Animations
- Custom float animation for floating elements
- Framer Motion variants for page transitions
- Scroll-triggered animations for timeline

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd ../backend
npm start
```

### Docker Support
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.

---

Built with ❤️ for Walmart's Supply Chain Innovation
