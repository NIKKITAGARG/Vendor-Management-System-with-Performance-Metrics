# Vendor-Management-System-with-Performance-Metrics

**Introduction**  
The Vendor Management System with Performance Metrics is a Node.js-based application designed to manage vendor profiles, track purchase orders, and evaluate vendor performance metrics. The system includes features such as automatic generation of unique vendor codes and purchase order numbers.  

**Features**  
Vendor Management: Create, update, delete, and retrieve vendor information.  
Purchase Order Tracking: Create, update, delete, and retrieve purchase orders.  
Performance Metrics: Calculate on-time delivery rate, quality rating average, response time, and fulfillment rate for each vendor.  
Authentication: Secure access to the API using JWT-based authentication.  

**Technologies Used**  
Node.js
Express.js
MongoDB (Mongoose)
JWT (JSON Web Token)
bcryptjs
dotenv
jest
supertest
uuid

**Installation**  

**1. Clone the repository:**  
   git clone [https://github.com/yourusername/vendor-management-system.git](https://github.com/NIKKITAGARG/Vendor-Management-System-with-Performance-Metrics.git)  
   cd vendor-management-system  

**2. Install dependencies:**  
   npm install  

**3. Run the application:**  
     npm run dev  
     
# API Documentation ->[ https://api.postman.com/collections/27024291-6150ac8a-ebac-4363-b450-7d9d34001624?access_key=PMAT-01J6M5TGTY4ZQ92B0V46A2P5SF](https://web.postman.co/workspace/872d0c52-a05b-49ef-bc9d-dfb96dab02e6/documentation/27024291-6150ac8a-ebac-4363-b450-7d9d34001624)  

**Vendor Management**  

POST /vendors: Create a new vendor.  
GET /vendors: Retrieve all vendors.  
GET /vendors/:vendorId: Retrieve a specific vendor.  
PUT /vendors/:vendorId: Update a vendor's details.  
DELETE /vendors/:vendorId: Delete a vendor.  

**Purchase Order Management**  

POST /purchase-orders: Create a new purchase order.  
GET /purchase-orders: Retrieve all purchase orders.  
GET /purchase-orders/:poId: Retrieve a specific purchase order.  
PUT /purchase-orders/:poId: Update a purchase order.  
DELETE /purchase-orders/:poId: Delete a purchase order.  

**Performance Metrics**  

GET /vendors/:vendorId/performance: Retrieve performance metrics for a specific vendor.  
Authentication  
POST /auth/register: Register a new user.  
POST /auth/login: Authenticate a user and receive a JWT token.  

# Running Tests
1. go to src/index.js and comment line 23 app.listen(...);
2. run `npm test` in command line



