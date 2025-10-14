# TechNova 

TechNova is a modern full-stack web application designed for efficient product and order management. Built with cutting-edge technologies, it offers a seamless experience for administrators to handle inventory, process orders, and manage user authentication through an intuitive dashboard.

## ✨ Features

-  User authentication and authorization system
-  Complete product management (Create, Read, Update, Delete)
-  Order management with detailed order items
-  Responsive UI with modern design
-  Beautiful interface using Tailwind CSS and PrimeReact
- State management with Zustand
- API integration with Axios
- Form handling with React Hook Form
- Toast notifications with React Toastify

## 🛠️ Technologies Used

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PrimeReact** - Rich UI component library
- **React Router DOM** - Client-side routing
- **Zustand** - Lightweight state management
- **Axios** - HTTP client
- **React Hook Form** - Performant forms
- **React Toastify** - Toast notifications
- **Lucide React** - Beautiful icons
- **PrimeIcons** - Icon library

### Backend
- **Express.js** - Web framework for Node.js
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript
- **TSX** - TypeScript execution environment
- **Dotenv** - Environment variable management

### Database
- **SQL** - Relational database (with provided schema files)

### Development Tools
- **ESLint** - Linting utility
- **Vite Plugins** - React and SWC plugins
- **TypeScript Compiler** - Type checking and compilation

## 📁 Project Structure

```
TechNova/
├── backend/                    # Backend source code
│   ├── controllers/            # Route handlers
│   │   ├── orderItemsController.ts
│   │   ├── ordersController.ts
│   │   ├── productsController.ts
│   │   └── usersController.ts
│   ├── routes/                 # API route definitions
│   │   ├── orderItems.ts
│   │   ├── orders.ts
│   │   ├── products.ts
│   │   └── users.ts
│   ├── db.ts                   # Database connection
│   └── index.ts                # Main server file
├── public/                     # Public assets
│   └── vite.svg
├── src/                        # Frontend source code
│   ├── assets/                 # Static assets
│   │   └── react.svg
│   ├── components/             # Reusable UI components
│   │   ├── Card.tsx
│   │   ├── LoginFrom.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductFrom.tsx
│   │   └── RegisterFrom.tsx
│   ├── guard/                  # Authentication guards
│   │   ├── AuthContext.tsx
│   │   ├── PrivateRouter.tsx
│   │   └── PublicRouter.tsx
│   ├── hooks/                  # Custom React hooks
│   ├── page/                   # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   └── NotFound.tsx
│   ├── routes/                 # Routing configuration
│   │   └── Router.tsx
│   ├── service/                # API service functions
│   │   └── index.ts
│   ├── store/                  # State management
│   │   └── authStore.ts
│   ├── types/                  # TypeScript definitions
│   │   ├── ComponentsType.ts
│   │   ├── index.ts
│   │   └── LoginTypes.ts
│   ├── ui/                     # Basic UI components
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── order_items.sql             # Database schema
├── orders.sql                  # Database schema
├── package.json
├── products.sql                # Database schema
├── README.md                   # This file
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd TechNova
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Use the provided SQL files: `products.sql`, `orders.sql`, `order_items.sql`

4. **Start the backend server**
   ```bash
   npm run start:backend
   ```

5. **Start the frontend development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

## 👤 Author

- **Name**: Camilo Andres Parra Luna
- **Clan**: Macondo
- **Cedula**: 1043136986

## 🔗 GitHub Repository

[Link de Github](https://github.com/CamiloBytes/TechNova)
