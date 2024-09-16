# E-commerce Project

## Description

This is a full-stack e-commerce application built using Create React App for the frontend and a separate backend. It supports two stakeholders: Admin and User.

## Features

### Admin Features
- View, edit, and delete orders, products, customers, and brands (CRUD operations).
- Dashboard with charts (sales chart, order chart, customer chart) using Chart.js.
- Ability to add images.
- Dark mode and light mode options.

### User Features
- View and order products.
- Three payment gateways: Easypaisa, JazzCash, and Cash on Delivery (static).
- Top-selling products section.
- Functional search bar storing user search history in local storage.
- Google OAuth login.

## Project Structure

- Frontend: `ecommerce-project` (runs on `localhost:3000`)
- Backend: `e-commerce-backend` (runs on `localhost:8080`)

## Tech Stack

### Frontend
- React (Create React App)
- Chart.js
- Tailwind CSS (for styling)
- Local Storage (for search history)

### Backend
- Node.js
- Express.js
- MongoDB (for database)
- JWT (for authentication)
- Google OAuth

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (running instance or cloud URI)

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd ecommerce-project
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `ecommerce-project` directory and add your environment variables:
    ```plaintext
    REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
    REACT_APP_API_BASE_URL=http://localhost:8080
    ```

4. Start the frontend server:
    ```bash
    npm start
    ```

### Backend

1. Navigate to the backend directory:
    ```bash
    cd e-commerce-backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `e-commerce-backend` directory and add your environment variables:
    ```plaintext
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4. Start the backend server:
    ```bash
    npm run dev
    ```
## Some ScreenShots
l![d](https://github.com/user-attachments/assets/20f22763-69d1-4f24-b573-faac5151918a)
![c](https://github.com/user-attachments/assets/394c0525-e6c4-4f6d-b173-5c01d1e50859)
![b](https://github.com/user-attachments/assets/b747c670-5b28-41bc-85c7-b15098fbd99b)
![a](https://github.com/user-attachments/assets/cf3c6398-732d-43b7-910c-0bcabb359c56)

## Usage

### Admin
1. Login as an admin.
2. Navigate to the dashboard to view charts and statistics.
3. Manage orders, products, customers, and brands through the admin panel.

### User
1. Register or login (Google OAuth available).
2. Browse products and add to cart.
3. Proceed to checkout and select a payment method.
4. View order history and top-selling products.

## Known Issues
- The customer chart on the admin dashboard is static because user feedback is not being collected.
- Ensure all necessary environment variables are correctly set in both `.env` files.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## Contact

For any questions or issues, please open an issue in this repository.
