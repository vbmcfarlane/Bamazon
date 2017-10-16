var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Abigail04$",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
console.log("connected as id " + connection.threadId);

  runSearch();
});
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Which level do you want to access?",
      choices: [
        "Customer",
        "Supervisor",
        "Manager",
        "Exit"
       ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Customer":
         displayInventory();
         
          break;
        case "Supervisor":
          multiSearch();
          break;
        case "Manager":
          rangeSearch();
        case "Exit":
          return;
          break;
          songSearch();
          break;
        case "Find artists with a top song and top album in the same year":
          songAndAlbumSearch();
          break;
          default:
          console.log( "invalid choice, try again");
          break;
      }
    });
}
 
//=========================================================================================
function  displayInventory() {
  
  var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products ORDER BY department_name ";  
  connection.query(query, function(err, res) {
      console.log("");
      console.log("");
      console.log("Products for sale: ");
      console.log('--------------------------------------------------------------------------------------------------------------------');
      console.log("");
    for(var i = 0; i<res.length;i++){
    console.log("Item ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
    console.log('----------------------------------------------------------------------------------------------------------------------');
  }
 selectItem();

  }); 

}
//===========================================================================================

// Requests product and number of product items user wishes to purchase.
function selectItem() {
  inquirer.prompt([
  {
        name: "productId",
        type: "input",
        message: "Please enter product ID for product you want.",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }, 
      {
        name: "productUnits",
        type: "input",
        message: "How many units do you want?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false
        }
  }
])
  .then(function(answer) {

    // Queries database for selected product.
    // var query = "Select item_id, product_name, department_name, price, stock_quantity, product_sales FROM products WHERE ?";
    connection.query("Select item_id, product_name, department_name, price, stock_quantity, product_sales FROM products WHERE ?",
 
      { 
        item_id: answer.productId
      } 
      function(err, res) {
      
      if (err) throw err;

      var stockAvailable = res[0].stock_quantity;
      var unitPrice = res[0].price;
      var productName = res[0].product_name;
      var productSales = res[0].product_sales;
      var department = res[0].department_name;

          // Checks there's enough inventory  to process user's request.
          if (res[0].stock_quantity >= answer.productUnits) {
            // Processes user's request passing in data to complete purchase.
            // completePurchase(stockAvailable, unitPrice, productSales, department, answer.productID, answer.productUnits, productName );
            processPurchase(res[0].stock_quantity, res[0].price, res[0].product_sale, res[0].department_name, answer.productID, answer.productUnits, res[0].product_name );
console.log( res[0].stock_quantity, res[0].price, res[0].product_sale, res[0].department_name, answer.productID, answer.productUnits, res[0].product_name )
            // Lets user request a new product.
           // selectItem();
          } else {
              // Tells user there isn't enough stock left.
            console.log("There is not enough of this item in stock!" + productName);
            console.log("");
            console.log("Shop for other items");
            console.log("");
            selectItem();
          }
     }); //close function
  }); // close .then
}; //end of function selectItem
//========================================================================================================================
// Completes user's request to purchase product.
function processPurchase(stockAvailable, price, productSales, department, selectedProductID, unitsRequested, productName) {
  
  // Updates stock quantity once purchase complete.
  var stockUpdate = stockAvailable - unitsRequested;
  console.log(" StockUpdate = " + stockUpdate);
  console.log(productName+ " " +stockUpdate + " = " + stockAvailable + " - " + unitsRequested);
  // Calculates total price for purchase based on unit price, and number of units.
  var totalPrice = price * units;
  console.log( totalPrice + " = " + price + " * " + units);
  // Updates total product sales.
  var productSales = parseInt(productSales) + parseInt(totalPrice);
  
  // Updates stock quantity on the database based on user's purchase.
  var query = connection.query("UPDATE products SET ? WHERE ?",
   [
      {
        stock_quantity: stockUpdate,
        product_sales: productSales
      },
       {
        item_id: selectedProductID
      }
  ], function(err, res) {

    if (err) throw err;
    // Tells user purchase is a success.
    console.log("");
    console.log("your purchase is complete.");
    console.log("");
    console.log( units + "  " + productName);
    console.log ("Price $" + price + " each");
    console.log("");
    console.log("Payment received : " + totalPrice);
    console.log("");

    // Updates department revenue based on purchase.
    updateDepartmentData(productSales, department);
    // Displays products so user can make a new selection.
  });
};
// //===========================================================================================
// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//     if (err) throw err;
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     });
//   );

//===========================================================================================
// Updates total sales for department after completed purchase.
 function updateDepartmentData(productSales, department) {

  // Query database for total sales value for department.
 var query = "Select * FROM departments WHERE ?";
  connection.query(query, { department_name: department}, function(err, res) {

    if (err) throw err;

    var departmentSales = res[0].total_sales;
    console.log("departmentSales : " + departmentSales);
    console.log("");
    var updatedDepartmentSales = parseInt(departmentSales) + parseInt(productSales);

    // Completes update to total sales for department.
    updateDeptSales(updatedDepartmentSales, department);
  });
};
//=============================================================================================
// Completes update to total sales for department on database.
function updateDeptSales(updatedDepartmentSales, department) {

  var query = "UPDATE departments SET ? WHERE ?";
  connection.query(query, [
  {
    total_sales: updatedDepartmentSales
  }, 
  {
    department_name: department
  }
  ], function(err, res) {

    if (err) throw err;

    // Displays products so user can choose to make another purchase.
    selectItem();
  });
};