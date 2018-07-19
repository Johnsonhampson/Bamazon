var mysql = require('mysql');
var inquirer = require('inquirer');
//const cTable = require('console.table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "Bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  manageraction();
});

function manageraction() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Products for Sale":
          pSale();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addProduct();
          break;

        case "Exit":
          connection.end();
      }
    });
}

function pSale() {
  var query = 'SELECT * FROM products';

  connection.query(query, function (err, data) {
    if (err) throw err;

    console.log('Current Inventory: ');
    console.log("---------------------------------------------------------------------\n");

    var disInv = '';
    // console.log('ID' + '  ||  ' + 'Product' + '  ||  ' + 'Department' + '  ||  ' + 'Price' );
    for (var i = 0; i < data.length; i++) {

      disInv = '';
      disInv += ('ID: ' + data[i].id + '  ||  ');
      disInv += 'Product: ' + data[i].product + '   ||  ';
      disInv += 'Department: ' + data[i].department + '  ||  ';
      disInv += 'Quantity: ' + data[i].quantity + '\n';

      console.log(disInv);
    }

    console.log("---------------------------------------------------------------------\n");

    manageraction();
  })
}

function lowInventory() {
  var query = 'SELECT * FROM products WHERE quantity < 50';

  connection.query(query, function (err, data) {
    if (err) throw err;
    console.log('Low Inventory items below 50: ');
    console.log("---------------------------------------------------------------------\n");

    var disInv = '';
    // console.log('ID' + '  ||  ' + 'Product' + '  ||  ' + 'Department' + '  ||  ' + 'Price' );
    for (var i = 0; i < data.length; i++) {

      disInv = '';
      disInv += ('ID: ' + data[i].id + '  ||  ');
      disInv += 'Product: ' + data[i].product + '   ||  ';
      disInv += 'Department: ' + data[i].department + '  ||  ';
      disInv += 'Quantity: ' + data[i].quantity + '\n';

      console.log(disInv);
    }

    console.log("---------------------------------------------------------------------\n");
    manageraction();
  })
}

function addInventory() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Please enter the Item ID you would like update inventory.',
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      },
      filter: Number
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many would you like to add to the inventory?',
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      },
      filter: Number
    }

  ]).then(function (answer) {
    var item = answer.id;
    var quantityAdd = answer.quantity;

    query = 'SELECT * FROM products WHERE ?';

    connection.query(query, { id: item }, function (err, data) {
      if (err) throw err;

      var productData = data[0];
      var updateQuery = 'UPDATE products SET quantity = ' + (productData.quantity + quantityAdd) + ' WHERE id = ' + item;
      connection.query(updateQuery, function (err, data) {
        if (err) throw err;
        console.log('Your inventory for ' + item + 'has been updated!');
      })
      console.log("\n---------------------------------------------------------------------\n");
      manageraction();
    });
  });

}

function addProduct() {

  inquirer.prompt([
    {
      name: "product",
      type: "input",
      message: "What is the name of your product?"
    },
    {
      name: "department",
      type: "input",
      message: "What is your product department?"
    },
    {
      name: "price",
      type: "input",
      message: "what is your unit price for your product?"
    },
    {
      name: "quantity",
      type: "input",
      message: "How much inventory do you have for your product?"
    }

  ]).then(function (answer) {
    var query = 'INSERT INTO products SET ?';
    connection.query(query, answer, function (err, data) {
      if (err) throw err;

      console.log('Your new product has been added!');
      console.log("\n---------------------------------------------------------------------\n");
      manageraction();
    });
  });
}
