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
console.log("connected as id = " + connection.threadId + "\n");

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
        default:
          console.log( "invalid choice, try again");
          break;
      }
    });
}

//========================================================================================

  
//=========================================================================================
function  displayInventory() {
  
 // var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products ORDER BY department_name ";  
  connection.query(
    "SELECT item_id, product_name, department_name, price, stock_quantity, product_sales FROM products ORDER BY department_name ", 
    function(err, res) {
      console.log("");
      console.log("");
      console.log("Products For Sale: ");
      console.log('--------------------------------------------------------------------------------------------------------------------');
      console.log("");
      for(var i = 0; i<res.length;i++){
      console.log("Item ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
      console.log('----------------------------------------------------------------------------------------------------------------------');
    }
   console.log("");
   selectItem();

  }); 
}
//===========================================================================================

// Requests product and number of product items user wishes to purchase.
function selectItem() {
  inquirer
  .prompt([
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
      connection.query(
      "Select item_id, product_name, department_name, price, stock_quantity, product_sales FROM products WHERE ?",
     { 
      item_id: answer.productId
      },
     function(error, data) {
      //console.log( "MySQL DB-Read = " + JSON.stringify(data,null,2));
            if (error) {throw error;
              console.log("error = " + error);
            }
            else { 
              var product_Id = data[0].item_id;
                var available_stock = data[0].stock_quantity;
                var price_per_unit = data[0].price;
                var productName = data[0].product_name
                var productSales = data[0].product_sales;
                var productDepartment = data[0].department_name;

                // Checks there's enough inventory  to process user's request.
                if (available_stock < answer.productUnits) {
                     // Tells user there isn't enough stock left.
                  console.log("");   
                  console.log("The item selectec is OUT OF STOCK! at this time : " + productName);
                  console.log("");
                  reprompt();
                } else {

                          // Updates stock quantity once purchase complete.
                         var updatedStockQuantity = available_stock - answer.productUnits;
                                
                          // Calculates total price for purchase based on unit price, and number of units.
                          var totalPrice = parseInt(price_per_unit) * parseInt(answer.productUnits);

                          // Updates total product sales.
                          var updatedProductSales = parseInt(productSales) + totalPrice;
                          
                          connection.query(
                            "UPDATE Products SET ? WHERE ?",
                             [
                                  {
                                    stock_quantity: updatedStockQuantity,
                                    product_sales: updatedProductSales
                                  },
                                  {
                                    item_id: product_Id}
                            ], function(err, result){
                                if(err) throw err;
                               // Tells user purchase is a success.
                                  console.log("Your purchase is complete.");
                                  console.log("");
                                  console.log("Your order of : " + answer.productUnits + " : " + productName);
                                  console.log("");
                                  console.log("Has been shipped");
                                  console.log("");
                                  // Display the total price for that purchase.has been received
                                  console.log("Your payment of : " + totalPrice.toFixed(2) + " has been received");
                                  console.log("");

                                  // Updates department revenue based on purchase.
                                  updateDepartmentData(updatedProductSales, productDepartment);
                        
                         });
                     }
                }
        });
    });

};


//===========================================================================================
// Updates total sales for department after completed purchase.
 function updateDepartmentData(productSales, department) {

  // Query database for total sales value for department.

  connection.query(
    "Select * FROM departments WHERE ?", 
  { 
    department_name: department
  },
   function(err, res) {

    if (err) throw err;

    var departmentSales = res[0].total_sales;
    console.log("Total Department Sales : " + departmentSales);
    console.log("");
    var updatedDepartmentSales = parseInt(departmentSales) + parseInt(productSales);

    // Completes update to total sales for department.
    updateDeptSales(updatedDepartmentSales, department);
  });
};
//=============================================================================================
// Completes update to total sales for department on database.
function updateDeptSales(updatedDepartmentSales, department) {

  var query = ;
  connection.query(
    "UPDATE departments SET ? WHERE ?", 
    [
      {
        total_sales: updatedDepartmentSales
      }, 
      {
        department_name: department
      }
  ], function(err, res) {

    if (err) throw err;

    // prompts user if they want to make another purchase.
    reprompt();
  });
};

 
function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function(ans){
    if(ans.reply){
      displayInventory()
    } else{
      console.log("See you soon!");
    }
  });
}
//==============================end of code==================================================