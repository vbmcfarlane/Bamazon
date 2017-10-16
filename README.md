# Bamazon

## Amazon-like storefront with the MySQL. 

**Freaturing:**

	1. Customer View; 
	2. Manager View 
	3. Supervisor View 
  
**Synopsis**

An interactive CLI shopping node app using MySQL and Node.JS are used to simulate an Amazon  environment named Bamazon. 
It allows:

1. A customer (BamazonCustomer.js)  to: View the products inventory and Purchase items.  
2. A manager (BamazonManager.js) to: View, Track and Update the product inventory.
3. A Supervisor (BamazonSupervisor) to Track the total sales by department and Add new departments.  

**Bamazon Customer Portal**

The Bamazon Customer Portal allows users to view the current items available for purchase. The user will be prompted to enter the item id# and how many items they wish to purchase. If the item is in stock, the order will be completed and the user will see the total amount of their purchase. It's activated from the Node.js Command prompt:

example1:
 ![screenshot 11](https://user-images.githubusercontent.com/28761006/31631260-700221dc-b276-11e7-8d55-77f7434106f3.png)
example 2:
 ![screenshot 12](https://user-images.githubusercontent.com/28761006/31631554-430360f0-b277-11e7-8a5c-f39e7cf1157b.png)
example 3:
 ![screenshot 13](https://user-images.githubusercontent.com/28761006/31631583-5ac8f394-b277-11e7-9481-8288daffdf3f.png)
By entering the Item ID#, it allows the customer to then select  the number of units to purchase and then completes the purchasing transaction.
example 4:
![screenshot 14](https://user-images.githubusercontent.com/28761006/31631603-6e4a0502-b277-11e7-9577-7eb31e30bc1f.png)
 
example 5:
 ![screenshot 15](https://user-images.githubusercontent.com/28761006/31631619-7c38fc36-b277-11e7-8e7f-cc51aed21fa7.png)

example 6:
 ![screenshot 16](https://user-images.githubusercontent.com/28761006/31631647-8b37f836-b277-11e7-9600-c035def5cecf.png)
example 7: ( inventory after the purchase was made).
 ![screenshot 17](https://user-images.githubusercontent.com/28761006/31631677-a0fe51f6-b277-11e7-85bc-9e821a0339f3.png)


# Manager Portal

The Bamazon Manager Portal allows users to view inventory lists (all and low enventory) and  add to the existing inventory of the store. The user will be prompted to choose from the following options:

1. View products for sale
2. View low inventory
3. Add to inventory
4. Add a new product
5. Exit program

The BamazonManager Portal is initiated from the Node.js command prompt.

example 1: 
 ![screenshot 18](https://user-images.githubusercontent.com/28761006/31631697-b6abf904-b277-11e7-85fd-3756802679d3.png)
example 2:
 ![screenshot 19](https://user-images.githubusercontent.com/28761006/31631710-c18e1be0-b277-11e7-8a77-c69e7913b39c.png)

The first option allows the Manager to see the list of products that are currently for sale, the department tof each item, the unit price of the product, and the remainding stock.

example 3:
 ![screenshot 20](https://user-images.githubusercontent.com/28761006/31631721-cd715076-b277-11e7-943e-09a5a7b55ace.png)
example 4:
 ![screenshot 21](https://user-images.githubusercontent.com/28761006/31631754-e9258f26-b277-11e7-9212-46c59aeabf9f.png)

The second option allows the user to see a list of all inventory items that have less than 5 items in stock. If there are no products that meet this criteria, the user will see an empty table.
example 5:
![screenshot 22](https://user-images.githubusercontent.com/28761006/31631795-10152bdc-b278-11e7-9440-34819789d0ac.png) 

example 6:
 ![screenshot 23](https://user-images.githubusercontent.com/28761006/31632206-59c507d8-b279-11e7-9eab-e306c8120ce8.png)

The third (# 3)option allows the user to update the inventory for a specific product. A prompt asks what the id is for the product the user wants to update. A second prompt asks how many items the user wishes to increase the quantity by.
example 7:
 ![screenshot 24](https://user-images.githubusercontent.com/28761006/31632250-7eaae086-b279-11e7-950e-cbb85eeb4d81.png)

example 8:
 ![screenshot 25](https://user-images.githubusercontent.com/28761006/31632298-a6f5685e-b279-11e7-9eb2-3d359491cde7.png)

example 9:
![screenshot 26](https://user-images.githubusercontent.com/28761006/31632345-d1186a82-b279-11e7-8c8d-16272271224f.png)
example 10: (updated inventory value)
![screenshot 27](https://user-images.githubusercontent.com/28761006/31632392-0129e9ee-b27a-11e7-9deb-128922df51bc.png)


The last (#4) option allows the user to add a new product to the inventory. Prompts ask the user for the product id#, the product name, the department name, the price and the stock quantity.
example 11:
![screenshot 28](https://user-images.githubusercontent.com/28761006/31632418-172b861c-b27a-11e7-8ee8-c50cb0928a16.png)
 
example 12:
![screenshot 29](https://user-images.githubusercontent.com/28761006/31632513-6b112b38-b27a-11e7-9c6b-4fd51947578d.png) 
example 13:
![screenshot 30](https://user-images.githubusercontent.com/28761006/31632535-7af703ec-b27a-11e7-9748-269c8075d16c.png)

example 14:
![screenshot 32](https://user-images.githubusercontent.com/28761006/31632583-b1499144-b27a-11e7-98bf-db5cd2b4deeb.png) 

example 15: (new Product updated in venentory)
  
![screenshot 35](https://user-images.githubusercontent.com/28761006/31632644-f2d3290e-b27a-11e7-94d8-ca29b589a53e.png)




# Bamazon Supervisor Portal

The BamazonSupervisor Portal is initiated from the Node.js command prompt.

example 1:
 ![screenshot 36](https://user-images.githubusercontent.com/28761006/31632690-1669d0de-b27b-11e7-975f-74127ea78dfa.png)
example 2:
 ![screenshot 37](https://user-images.githubusercontent.com/28761006/31632701-2707bfbe-b27b-11e7-890b-8da499587d0f.png)

The Bamazon Supervisor Portal allows users to view the total profits of the store via the Product Sales option (#1) categorized by department,  and add new departments (option #2).
example 3:
 ![screenshot 38](https://user-images.githubusercontent.com/28761006/31632711-35a79756-b27b-11e7-82c0-3d9d7d806f44.png)

example 4:
 
![screenshot 39](https://user-images.githubusercontent.com/28761006/31632722-44071d9e-b27b-11e7-90ff-2b9760283f1f.png)

example 5:

![screenshot 40](https://user-images.githubusercontent.com/28761006/31632805-7943f446-b27b-11e7-84d8-7809d554ad61.png)
 
example 6:

![screenshot 41](https://user-images.githubusercontent.com/28761006/31632829-93337160-b27b-11e7-9e5e-f118bb5aba74.png) 

example 7:
![screenshot 42](https://user-images.githubusercontent.com/28761006/31632839-9d500e4c-b27b-11e7-96da-5ddbd9cb8d79.png)
 
example 8: (Terminates the application and drops the connectiopn to MySQL.)

![screenshot 43](https://user-images.githubusercontent.com/28761006/31632852-a5f51790-b27b-11e7-8da6-682755387c5e.png) 
example 9:
 
![screenshot 44](https://user-images.githubusercontent.com/28761006/31632859-acbe87aa-b27b-11e7-9b7e-6376d3e22245.png)
 



####Contributors:
*VBMcFarlane 

Technologies Used:

1. Javascript
2. nodeJS
3. MySQL database

###npm packages:
1. mysql
2. inquirer
3. cli-table

***Copyright 2017- VBMcFarlane***
