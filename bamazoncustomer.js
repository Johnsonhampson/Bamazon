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
    display();
});

function display() {
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
            disInv += 'Price: $' + data[i].price + '\n';

            console.log(disInv);
        }

        console.log("---------------------------------------------------------------------\n");

        promptBuy();
    })
}

// prompt the user for the item/quantity they would like to purchase
function promptBuy() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the Item ID you would like to buy.',
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
            message: 'How many do you need?',
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
        var quantityNo = answer.quantity;

        query = 'SELECT * FROM products WHERE ?';

        connection.query(query, { id: item }, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('Please select a valid item ID.');
                display();

            } else {
                var productData = data[0];

                if (quantityNo <= productData.quantity) {
                    console.log('Placing order!');

                    var updateQueryStr = 'UPDATE products SET quantity = ' + (productData.quantity - quantityNo) + ' WHERE id = ' + item;

                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log('Your order has been placed! Your total is $' + productData.price * quantityNo);
                        console.log("\n---------------------------------------------------------------------\n");

                        connection.end();
                    })
                }
                else {
                    console.log('Sorry! Insufficient quantity.');
                    console.log('Your order cannot be placed. Please modify your order quantity.');
                    console.log("\n---------------------------------------------------------------------\n");
                    display();
                }
            }
        })
    })
}
