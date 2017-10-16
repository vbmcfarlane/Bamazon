DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;
CREATE TABLE products (
  item_id INT NOT NULL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(10,2) NOT NULL default 0.00,
  stock_quantity INT NOT NULL default 0
  
);
Select * From products;


INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ( 8753767,"Nikon-D750", "Cameras", 2299.99, 12),
	   ( 6776249,"Canon-EOS6D", "Cameras", 1999.99, 5),
       ( 3953409,"Nikon-D810", "Cameras", 3299.99, 12),
       ( 5873908,"HP 2in1 15.6 Touch-Screen Lattop", "computers", 999.99, 14),
       ( 5855921,"Microsoft-Surface Pro", "computers", 1299.99, 9),
       ( 5748201,"Sony 75 Smart 4k Ultra", "Televison, Home Theater", 3299.99, 4),
       ( 5930900,"LG 60 Smart 4k Ultra", "Televison, Home Theater", 2299.99, 12),
	   ( 3533235,"Bose Acoustimass 20 Series", "Televison, Home Theater", 999.99, 19),
	   ( 4278201,"Samsung - Showcase 27.8", "Appliances", 2499.99, 8),
	   ( 3458015,"Samsung - 4.3 Front Loading Washer", "Appliances", 649.99, 6);
       
select * from products;

  CREATE TABLE departments (
  department_id INT NOT NULL PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL,
  over_head_costs DECIMAL(10,2) NOT NULL default 0.00 ,
  total_sales DECIMAL(10,2) NOT NULL default 0.00
 );

Select * From departments;

INSERT INTO departments (department_id, department_name, over_head_costs, total_sales) 
VALUES ( 203, "Cameras", 14000.00, 30000.00),
       ( 580, "computers", 16000.00, 25000.00),
       ( 640, "Home Theater",18000.00, 180000.00),
       ( 340,"Appliances",8000.00, 12000.00);
       
  
Select * From departments;