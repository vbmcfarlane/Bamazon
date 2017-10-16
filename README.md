# Bamazon
Amazon-like storefront with the MySQL. Freaturing 1) Customer View; 2)Manager View and 3) Supervisor View 


Synopsis

An interactive CLI shopping node app using MySQL and Node.JS are used to simulate an Amazon  environment named Bamazon. It allow 1) A customer (BamazonCustoner.js) to view and purchase items.  2) A manager to: view, track and update the product inventory, and  3) A Supervisor to track the total sales by department and add new departments.  

Bamazon Customer Portal

The Bamazon Customer Portal allows users to view the current items available for purchase. The user will be prompted to enter the item id# and how many items they wish to purchase. If the item is in stock, the order will be completed and the user will see the total amount of their purchase.

Customer Portal



The Bamazon Customer Portal allows users to view and edit the inventory of the store. The user will be prompted to choose from the following options:

View products for sale
View low inventory
Add to inventory
Add a new product
Manager Options 1 & 2

The first option allows the user to see the list of products that are currently for sale, what department the item belongs to, the price of the product and how much stock is left for that product.

The second option allows the user to see a list of all inventory items that have less than 5 items in stock. If there are no products that meet this criteria, the user will see an empty table.

Bamazon Manager Portal - Options 1 & 2

Manager Options 3 & 4

The third option allows the user to update the inventory for a specific product. A prompt asks what the id is for the product the user wants to update. A second prompt asks how many items the user wishes to increase the quantity by.

The last option allows the user to add a new product to the inventory. Prompts ask the user for the product id#, the product name, the department name, the price and the stock quantity.

Bamazon Manager Portal - Options 3 & 4

Bamazon Executive Portal

The Bamazon Executive Portal allows users to view the total profits of the store categorized by department and add new departments.

Bamazon Executive Portal

Contributors:

VBMcFarlane GitHub

Technologies Used:

Javascript
nodeJS
MySQL
npm packages:
mysql
prompt
colors/safe
cli-table
License

Copyright 2017- VBMcFarlane