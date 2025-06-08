# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





ຂັ້ນຕອນໃນການສ້າງ ຕາຕະລາງໃນຖານຂໍ້ມູນ 


-- ຕາຕະລາງ employee
CREATE TABLE employee (
    employee_id INT(2) PRIMARY KEY,
    employee_name VARCHAR(50),
    employee_Tel VARCHAR(20),
    employee_email VARCHAR(50),
    employee_address VARCHAR(100),
    gender VARCHAR(10)
);

-- ຕາຕະລາງ brand
CREATE TABLE brand (
    brand_id INT(5) PRIMARY KEY,
    brandName VARCHAR(50),
    brandStatus VARCHAR(20)
);

-- ຕາຕະລາງ category
CREATE TABLE category (
    category_id INT(5) PRIMARY KEY,
    categoryName VARCHAR(50),
    categoryStatus VARCHAR(20)
);

-- ຕາຕະລາງ suppliers
CREATE TABLE suppliers (
    suppliers_id INT(5) PRIMARY KEY,
    suppliersName VARCHAR(50),
    suppliersAddress VARCHAR(100),
    suppliersTel VARCHAR(20),
    suppliersEmail VARCHAR(50)
);

-- ສົມມຸດວ່າ table product ໄດ້ຖືກສ້າງແລ້ວ, ແຕ່ເພື່ອຄວາມຄົບຖ້ວນຂອງສະຄຣິບ
-- ຕາຕະລາງ product (ຕາມຕົວຢ່າງທີ່ເຫັນໃນຮູບພາບ)
CREATE TABLE product (
    product_id INT(5) PRIMARY KEY,
    productName VARCHAR(50),
    quantity INT(5),
    min_quantity INT(5),
    unit VARCHAR(20),
    status VARCHAR(20),
    description TEXT,
    brand_id INT(5),
    category_id INT(5),
    image_url VARCHAR(255),
    created_date DATETIME,
    FOREIGN KEY (brand_id) REFERENCES brand(brand_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

-- ຕາຕະລາງ request_product
CREATE TABLE request_product (
    request_product_id INT(5) PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    emp_id INT(2),
    FOREIGN KEY (emp_id) REFERENCES employee(employee_id)
);

-- ຕາຕະລາງ request_product_detail ພ້ອມ PRIMARY KEY composite
CREATE TABLE request_product_detail (
    request_product_id INT(5),
    product_id INT(5),
    quantity INT(5),
    approved VARCHAR(10),
    PRIMARY KEY (request_product_id, product_id),
    FOREIGN KEY (request_product_id) REFERENCES request_product(request_product_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- ຕາຕະລາງ buy_product
CREATE TABLE buy_product (
    buy_product_id INT(5) PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    employee_id INT(5),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

-- ຕາຕະລາງ buy_product_detail ພ້ອມ PRIMARY KEY composite
CREATE TABLE buy_product_detail (
    buy_product_id INT(5),
    product_id INT(5),
    quantity INT(5),
    price INT(9),
    PRIMARY KEY (buy_product_id, product_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (buy_product_id) REFERENCES buy_product(buy_product_id)
);

-- ຕາຕະລາງ order_product
CREATE TABLE order_product (
    order_product_id INT(5) PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    suppliers_id INT(5),
    FOREIGN KEY (suppliers_id) REFERENCES suppliers(suppliers_id)
);

-- ຕາຕະລາງ order_product_detail ພ້ອມ PRIMARY KEY composite
CREATE TABLE order_product_detail (
    order_product_id INT(5),
    product_id INT(5),
    quantity INT(5),
    PRIMARY KEY (order_product_id, product_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (order_product_id) REFERENCES order_product(order_product_id)
);

-- ຕາຕະລາງ received_product
CREATE TABLE received_product (
    received_product_id INT(5) PRIMARY KEY,
    date DATE,
    status VARCHAR(10),
    request_product_id INT(5),
    FOREIGN KEY (request_product_id) REFERENCES request_product(request_product_id)
);

-- ຕາຕະລາງ received_product_detail ພ້ອມ PRIMARY KEY composite
CREATE TABLE received_product_detail (
    received_product_id INT(5),
    product_id INT(5),
    quantity INT(5),
    PRIMARY KEY (received_product_id, product_id),
    FOREIGN KEY (received_product_id) REFERENCES received_product(received_product_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- ຕາຕະລາງ received_image
CREATE TABLE received_image (
    image_id INT PRIMARY KEY,
    file_path VARCHAR(255),
    date DATE,
    received_product_id INT(5),
    FOREIGN KEY (received_product_id) REFERENCES received_product(received_product_id)
);





/// ການສ້າງຕາຕະລາງໃນຖານຂໍ້ມູນ 

-- สร้างฐานข้อมูล warehouse
CREATE DATABASE IF NOT EXISTS warehouse_db;
USE warehouse_db;

-- ตาราง category
CREATE TABLE category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(100) NOT NULL,
    categoryStatus VARCHAR(20) DEFAULT 'ACTIVE'
);

-- ตาราง brand
CREATE TABLE brand (
    brand_id INT PRIMARY KEY AUTO_INCREMENT,
    brandName VARCHAR(100) NOT NULL,
    brandStatus VARCHAR(20) DEFAULT 'ACTIVE'
);

-- ตาราง product
CREATE TABLE product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    productName VARCHAR(150) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    category_id INT,
    brand_id INT,
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    FOREIGN KEY (brand_id) REFERENCES brand(brand_id)
);

-- ตาราง suppliers
CREATE TABLE suppliers (
    suppliers_id INT PRIMARY KEY AUTO_INCREMENT,
    suppliersName VARCHAR(100) NOT NULL,
    suppliersAddress TEXT,
    suppliersEmail VARCHAR(100),
    suppliersTel VARCHAR(20)
);

-- ตาราง employee
CREATE TABLE employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(100) NOT NULL,
    employee_email VARCHAR(100),
    employee_Tel VARCHAR(20),
    employee_address TEXT,
    gender VARCHAR(10)
);

-- ตาราง received_image
CREATE TABLE received_image (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    file_path VARCHAR(255) NOT NULL
);

-- ตาราง received_product
CREATE TABLE received_product (
    received_product_id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    image_id INT,
    FOREIGN KEY (image_id) REFERENCES received_image(image_id)
);

-- ตาราง received_product_detail
CREATE TABLE received_product_detail (
    received_product_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (received_product_id, product_id),
    FOREIGN KEY (received_product_id) REFERENCES received_product(received_product_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- ตาราง request_product
CREATE TABLE request_product (
    request_product_id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    employee_id INT,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

-- ตาราง request_product_detail
CREATE TABLE request_product_detail (
    request_product_id INT,
    product_id INT,
    quantity INT NOT NULL,
    approved VARCHAR(20) DEFAULT 'PENDING',
    PRIMARY KEY (request_product_id, product_id),
    FOREIGN KEY (request_product_id) REFERENCES request_product(request_product_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- ตาราง buy_product
CREATE TABLE buy_product (
    buy_product_id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    employee_id INT,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

-- ตาราง buy_product_detail
CREATE TABLE buy_product_detail (
    buy_product_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (buy_product_id, product_id),
    FOREIGN KEY (buy_product_id) REFERENCES buy_product(buy_product_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- ตาราง order_product
CREATE TABLE order_product (
    order_product_id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    suppliers_id INT,
    FOREIGN KEY (suppliers_id) REFERENCES suppliers(suppliers_id)
);

-- ตาราง order_product_detail
CREATE TABLE order_product_detail (
    order_product_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (order_product_id, product_id),
    FOREIGN KEY (order_product_id) REFERENCES order_product(order_product_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- ตาราง users (เพิ่มเติมจากรูปภาพที่ 2)
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'ACTIVE'
);

-- เพิ่ม index เพื่อเพิ่มประสิทธิภาพ
CREATE INDEX idx_product_category ON product(category_id);
CREATE INDEX idx_product_brand ON product(brand_id);
CREATE INDEX idx_received_product_date ON received_product(date);
CREATE INDEX idx_request_product_date ON request_product(date);
CREATE INDEX idx_buy_product_date ON buy_product(date);
CREATE INDEX idx_order_product_date ON order_product(date);

-- ตัวอย่างข้อมูลเริ่มต้น
INSERT INTO category (categoryName, categoryStatus) VALUES 
('Electronics', 'ACTIVE'),
('Clothing', 'ACTIVE'),
('Books', 'ACTIVE');

INSERT INTO brand (brandName, brandStatus) VALUES 
('Samsung', 'ACTIVE'),
('Apple', 'ACTIVE'),
('Nike', 'ACTIVE');

INSERT INTO suppliers (suppliersName, suppliersAddress, suppliersEmail, suppliersTel) VALUES 
('ABC Company', '123 Main St, Bangkok', 'abc@email.com', '02-123-4567'),
('XYZ Ltd', '456 Second St, Chiang Mai', 'xyz@email.com', '053-234-5678');

INSERT INTO employee (employee_name, employee_email, employee_Tel, employee_address, gender) VALUES 
('John Doe', 'john@company.com', '081-123-4567', '789 Third St, Bangkok', 'Male'),
('Jane Smith', 'jane@company.com', '082-234-5678', '321 Fourth St, Bangkok', 'Female');