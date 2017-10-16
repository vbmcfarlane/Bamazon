# Bamazon
Amazon-like storefront with the MySQL. 
Freaturing: 
	1) Customer View; 
	2) Manager View, and 
	3) Supervisor View 
Synopsis
An interactive CLI shopping node app using MySQL and Node.JS are used to simulate an Amazon  environment named Bamazon. 
It allows:
 1) A customer (BamazonCustomer.js)  to: View the products inventory and Purchase items.  
2) A manager (BamazonManager.js) to: View, Track and Update the product inventory.
3) A Supervisor (BamazonSupervisor) to Track the total sales by department and Add new departments.  

Bamazon Customer Portal
The Bamazon Customer Portal allows users to view the current items available for purchase. The user will be prompted to enter the item id# and how many items they wish to purchase. If the item is in stock, the order will be completed and the user will see the total amount of their purchase. It's activated from the Node.js Command prompt:
example1:
 
example 2:
 
example 3:
 
By entering the Item ID#, it allows the customer to then select  the number of units to purchase and then completes the purchasing transaction.
example 4:

 
example 5:
 
example 6:
 
example 7: ( inventory after the purchase was made).
 


Manager Portal
The Bamazon Manager Portal allows users to view inventory lists (all and low enventory) and  add to the existing inventory of the store. The user will be prompted to choose from the following options:
1) View products for sale
2) View low inventory
3) Add to inventory
4) Add a new product
5) Exit program
The BamazonManager Portal is initiated from the Node.js command prompt.
example 1: 
 
example 2:
 

The first option allows the Manager to see the list of products that are currently for sale, the department tof each item, the unit price of the product, and the remainding stock.
example 3:
 
example 4:
 

The second option allows the user to see a list of all inventory items that have less than 5 items in stock. If there are no products that meet this criteria, the user will see an empty table.
example 5:
 
example 6:
 


The third (# 3)option allows the user to update the inventory for a specific product. A prompt asks what the id is for the product the user wants to update. A second prompt asks how many items the user wishes to increase the quantity by.
example 7:
 
example 8:
 
example 9:
 
example 10: (updated inventory value)
 

The last (#4) option allows the user to add a new product to the inventory. Prompts ask the user for the product id#, the product name, the department name, the price and the stock quantity.
example 11:
 
example 12:
 
example 13:
 
example 14:
 
example 15: (new Product updated in venentory)
 



Bamazon Supervisor Portal
The BamazonSupervisor Portal is initiated from the Node.js command prompt.
example 1:
 
example 2:
 

The Bamazon Supervisor Portal allows users to view the total profits of the store via the Product Sales option (#1) categorized by department,  and add new departments (option #2).
example 3:
 
example 4:
 
example 5:
 
example 6:
 
example 7:
 
example 8: (Terminates the application and drops the connectiopn to MySQL.)
 
example 9:
 

Bamazon Executive Portal

Contributors:

VBMcFarlane 

Technologies Used:

Javascript
nodeJS
MySQL
npm packages:
mysql
prompt
cli-table
Copyright 2017- VBMcFarlane