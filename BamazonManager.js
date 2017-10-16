// The manager view module 
// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

// Required node modules.
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
// Connects to the database.
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Root is default username.
  user: "root",
  // Password is empty string.
  password: "Abigail04$",
  database: "bamazon"
});

// If connection doesn't work, throws error, else...
connection.connect(function(err) {
  if (err) throw err;

  // Lets manager pick action.
  menuOption();

});

// Manager picks action they wish to complete.
function menuOption() {
	inquirer
	.prompt({
		name: 'action',
		type: "rawlist",
		message: 'Select an option from the list below? ',
		choices: [
					"View Products for Sale",
					"View Low Inventory",
					"Add to Inventory",
					"Add New Product",
					"Exit"
				]
	}
	).then(function(answer) {

		// Managers selection available
		switch (answer.action) {
		    case "View Products for Sale":
		    	viewProducts();
		    break;

		    case "View Low Inventory":
		    	viewLowInventory();
		    break;

		    case "Add to Inventory":
		    	addInventory();
		    break;

		    case "Add New Product":
		    	addProduct();
		     break;
		    case "Exit":
		    	connection.end();
		        return;
		     break;
		    default:
         		 console.log( "invalid choice, try again");
          	break;
		}
	});
};

// Displays list of all available products.
var viewProducts = function() {
	
	connection.query(
    "SELECT item_id, product_name, department_name, price, stock_quantity, product_sales FROM products ORDER BY department_name ", 
    function(err, res) {
    	var table = new Table({
	    head: ['Item Id#', 'Product Name', 'Department name', 'Unit Price', 'Stock Quantity', 'Product Sales'],
	    style: {
	      head: ['green'],
	      compact: false,
	      colAligns: ['left'],
	    }
	  });
    for(var i = 0; i<res.length;i++){
    	table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity, res[i].product_sales.toFixed(2)]
        );
        
    }
   console.log("");
   console.log(table.toString());
   console.log("");	
    //   console.log("");
    //   console.log("");
    //   console.log("Products For Sale: ");
    //   console.log('--------------------------------------------------------------------------------------------------------------------');
    //   console.log("");
    //   for(var i = 0; i<res.length;i++){
    //   console.log("Item ID: " + res[i].item_id + " | " + "Product Name: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
    //   console.log('----------------------------------------------------------------------------------------------------------------------');
    // }
    	
		// Prompt Manager to select new action.
		menuOption();
	});
};
//========================================================================================================================================

// Displays products with low inventory.
function viewLowInventory() {

	console.log("");
	
	connection.query(
		"SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5", 
		function(err, res) {

		if (err) throw err;
			
		var table = new Table({
	    head: ['Item Id#', 'Product Name',  'Stock Quantity'],
	    style: {
	      head: ['green'],
	      compact: false,
	      colAligns: ['left'],
	    }
	  });
    for(var i = 0; i<res.length;i++){
    	table.push(
                [res[i].item_id, res[i].product_name, res[i].product_name, res[i].stock_quantity]
        );
        
    }
	   console.log("");
	   console.log(table.toString());
	   console.log("");

	// 	if (err) throw err;
	// 	for (var i = 0; i < res.length; i++) {
	// 		console.log("Product ID: " + res[i].item_id + " | Product Name: " + res[i].product_name + " | Stock Quantity: " + res[i].stock_quantity);
	// 	}
	// console.log("");
	// 	// Prompt Manager to select new action.
		menuOption();
	});
};
//==========================================================================================================================================
// Adds new stock to selected product.
function addInventory() {

	inquirer
	.prompt([
			{
				name: "productID",
				type: "input",
				message: "Enter 7 digit product code to add stock to."
			},
			{
				name: "stock",
				type: "input",
				message: "Enter amount of stock items to add?"
			}
	])
	.then(function(ans) {

				// Restock Inventory in mySQL database

			connection.query(
		      "SELECT * FROM products WHERE ?",
				     { 
				      item_id: ans.productID
				     },

				    function(error, data) {
				    //	console.log( JSON.stringify(data, null, 2));
				    if (error) {throw error;
				              console.log("error = " + error);
				     }
				    else { 
				    	  var reStockItem = data[0];
				    	  var updatedStock = parseInt(data[0].stock_quantity) + parseInt(ans.stock);
				    	  console.log("");
						  console.log("Updated item_id : " + ans.productID + " Stock to " + updatedStock + " Units");
						  console.log("");	
						// Updates stock for selected product in database.
						connection.query(
						  "UPDATE products SET ? WHERE ?", 
						  [
							{
								stock_quantity: updatedStock
							}, 
							{
								item_id: ans.productID
							}
						  ], 
						function (err, res) {
							if (err) {
								throw err;
							} else {

								// Prompt Manager to select new action.
								menuOption();
							}
						}); //End Connection query update
					}	
			}); //End connection query	select 
	}); //end then function	
};	// End add inventory function	
//============================================================================================
// Adds new product to database.
var addProduct = function() {
	inquirer.prompt([{
		name: "product_number",
		type: "input",
		message: "Item number  of product to add: (7) digits?"
	}, {
		name: "product",
		type: "input",
		message: "Name of product to add?"
	}, {
		name: "department",
		type: "input",
		message: "Department to assign the new product?"
	}, {
		name: "price",
		type: "input",
		message: "Unit price for product,  ###.##?"
	}, {
		name: "stock_amount",
		type: "input",
		message: "Starting Stock volume for Product?"
	}])
	.then(function(answer) {

		

		connection.query(
		"INSERT INTO products SET ?", 
		{
			Item_id: answer.product_number,
			product_name: answer.product,
			department_name: answer.department,
			price: answer.price,
			stock_quantity: answer.stock_amount
		}, 
		function(err, res) {
			if (err) {
				throw err;
			} else {
				console.log("Product ID: " + answer.product_number + " : " + answer.product + ", was added successfully!");

			}	
		menuOption();	
		});
	});

};
