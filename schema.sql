DROP DATABASE IF EXISTS products_db;

CREATE DATABASE products_db;

USE products_db;

CREATE TABLE products (
item_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
product_name VARCHAR(256) NOT NULL,
department_name VARCHAR(256) NOT NULL,
price DECIMAL(16, 2) DEFAULT '0.00' NOT NULL,
stock INTEGER(10)
);

USE products_db;
INSERT INTO products (product_name, department_name, price, stock)
VALUES ('Bluetooth_Beanie', 'Fashion', '75', 4), 
('Echo_Dot', 'Electronics', '45.50', 6),
('Science_Kit', 'Toys', '15', 3),
('Roc_Retinol', 'Beauty', '25.95', 10),
('Memoryfoam_Slippers', 'Fashion', '30',  5),
('INUI_Powerbank', 'Electronics', '25', 7),
('Bio_Oil', 'Beauty', '8.95', 5 ),
('Interactive_Robot', 'Toys', '75', 8),
('Adidas_Shoes', 'Fashion', '85', 9 ),
('Bose_Earbuds', 'Electronics', '55', 6 )


USE products_db;
SELECT * FROM products ORDER BY first_name;
