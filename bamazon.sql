DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;
USE Bamazon;

-- Create a table called 'products' which will contain the store inventory --
CREATE TABLE products (
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product VARCHAR(30) NOT NULL,
	department VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (product, department, price, quantity)
VALUES  ('Hair Gel', 'Cosmetics', 6.25, 200),
		('Body Wash', 'Cosmetics', 5.00, 300),
        ('Body spray', 'Cosmetics', 4.80, 300),
        ('Shaving Cream', 'Cosmetics', 3.90, 300),
        ('Razor', 'Cosmetics', 6.99, 300),
		('Trash Bags', 'Grocery', 5.99, 300),
        ('Toiler Paper', 'Grocery', 12.99, 500),
        ('Orange Juice', 'Grocery', 4.99, 300),
        ('Ice Cream', 'Grocery', 3.25, 432),
        ('Milk', 'Grocery', 2.50, 200),
		('Apples', 'Produce', 1.80, 800),
		('Bannana', 'Produce', 0.20, 800),
		('Baby Diapers', 'Children', 10.75, 500),
		('Baby Wipes', 'Children', 3.00, 700),
		('Tennis racket', 'Sports', 15.99, 150),
		('Tennis ball', 'Sports', 7.99, 150),
        ('Volleyball', 'Sports', 9.99, 150),
        ('Soccerball', 'Sports', 12.99, 150),
        ('Basketball', 'Sports', 11.99, 150),
		('Mens Athletic Tee', 'Clothing', 8.99, 200),
		('Mens Athletic Shorts', 'Clothing', 7.99, 250);

SELECT * FROM products;