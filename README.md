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