// Create a new MySQL table called departments. Your table should include the following columns:
// department_id
// department_name
// over_head_costs (A dummy number you set for each department)
// Modify the products table so that there's a product_sales column and modify the bamazonCustomer.js app so that this value is updated with each individual products total revenue from each sale.
// Modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.
// Make sure your app still updates the inventory listed in the products column.
// Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:
// View Product Sales by Department
// Create New Department
// When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.
// Required node modules

//require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
// Connects to database.
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Root is default username.
  user: "root",
  // Password is empty string.
  password: "",
  database: "Bamazon"
});

start();

function start(){
  inquirer.prompt([{
  	name: "menu",
    type: "rawlist",
    message: "Select an option below?",
    choices: ["View Product Sales by Department", "Create New Department", "Exit"]
  }]).then(function(ans){
    switch(ans.menu){
      case "View Product Sales by Department": 
      		viewProductByDept();
      break;
      case "Create New Department": 
      		createNewDept();
      break;
      case "Exit": 
     		console.log("");
    		console.log('Come back again. See you soon !');
      		connection.end();
      break;
     default:
          	console.log( "invalid choice, try again");
          break;
    }
  });
}

//view product sales by department
function viewProductByDept(){
  //prints the items for sale and their details
  connection.query(
  "SELECT * FROM Departments ORDER BY department_id",
   function(err, data){
    if(err) {throw err;}
    else{
	    console.log('Product Sales by Department');
	    console.log("");
	    var table = new Table({
	    head: ['Department ID#', 'Department name', 'Over Head Cost','Product Sales', 'Total Profit'],
	    style: {
	      head: ['green'],
	      compact: false,
	      colAligns: ['left'],
	    }
	  });
	   // call once somewhere in the beginning of the app


	    console.log('----------------------------------------------------------------------------------------------------')

	    for(var i = 0; i<data.length;i++){
	    	 table.push(
                [data[i].department_id, data[i].department_name, data[i].over_head_costs.toFixed(2), (data[i].total_sales).toFixed(2), (data[i].total_sales - data[i].over_head_costs).toFixed(2)]
		        );
		        console.log("");
		    }
		   console.log("");
		   console.log(table.toString());
		   console.log("");
		     
	    //   console.log("Department ID: " + data[i].department_id + " | " + "Department Name: " + data[i].department_name + " | "
	    //    + "Over Head Cost: " + (data[i].over_head_costs).toFixed(2) + " | "
	    //    + "Product Sales: " + (data[i].total_sales).toFixed(2) + " | " + "Total Profit: "
	    //    + (data[i].total_sales - data[i].over_head_costs).toFixed(2));
	    //   console.log('--------------------------------------------------------------------------------------------------')
	    //   console.log("");
	    // }
	    // console.log("");
	    start();
	 }
  })
}

  //create a new department
  function createNewDept(){
    console.log('Creating New Department');
    //prompts to add deptName and numbers. if no value is then by default = 0
    inquirer.prompt([
    {
      type: "input",
      name: "deptId",
      message: "Entera 3-digit number DepartmentId: "
    }, 	
    {
      type: "input",
      name: "deptName",
      message: "Department Name: "
    }, 
    {
      type: "input",
      name: "overHeadCost",
      message: "Over Head Cost: ",
      default: 0.00,
      validate: function(val){
        if(isNaN(val) === false){return true;}
        else{return false;}
   	  }
    }, 
    {
      type: "input",
      name: "totalSales",
      message: "Total Sales: ",
      default: 0.00,
      validate: function(val){
        if(isNaN(val) === false){
        return true;
        }
        else{
        return false;
        }
      }
    }
    ])
    .then(function(answer){
      connection.query(
      "INSERT INTO departments SET ?",
      {
      	department_id: answer.deptId,
        department_name: answer.deptName,
        over_head_costs: answer.overHeadCost,
        total_sales: answer.totalSales
      },
       function(err, res){
        if(err) {throw err;}
        else{
        //	console.log('A New department was added.');
        	console.log("New department ID : " + answer.deptId + " with Department Name : " + answer.deptName + ";  was added successfully!");
        	console.log("");
        	start();
        }
      })
      // start();
    });
  }
