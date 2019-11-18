const inquirer = require('inquirer')
const mysql = require('mysql2')
// adding console method for table visuals
require('console.table')


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'products_db'
})


db.connect(err => {
  if (err) throw err
  console.log('connected as id ' + db.threadId + '\n')
  showProduct()
})

function showProduct() {
  db.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    //console.log(res)
    console.table(res)
    askCustomer()
  })
}


function askCustomer() {
  inquirer
    .prompt([
      {
        name: 'item',
        type: 'input',
        message: 'What is the item you would like to buy?'
      },
      {
        name: 'quantity',
        type: 'input',
        message: 'How many items would  you like to purchase?'
      },

    ])

    .then(function (answer) {
      console.log(answer)
      // select the product from the db
      db.query("SELECT * FROM products WHERE item_id=" + answer.item, function (err, data) {

        //// verify if error if no data then product is not in the store
        //console.log(data)
        // verify if you have enought stock
        if (parseInt(answer.quantity) <= data[0].stock) {
          console.log('You have chosen well!')
          var newStock = data[0].stock - parseInt(answer.quantity)
          console.log("new:", newStock, answer.item)
          db.query("UPDATE products SET ? WHERE ?",
            [
              {
                stock: newStock
              },
              {
                item_id: answer.item
              }
            ],
            function (error, updateData) {
              if (error) throw err;
              console.log('Order has been processed!')
              showPrice()
            }
          )
        } else {
          console.log('Sorry, insufficient stock!')
          showProduct()
        }
      }

        // you can ask the customer if wnat anything else (if yes show the producg if not close the app)
      )
    })
}

function showPrice() {
  db.query("SELECT * FROM products WHERE price", function (err, data) {
    console.log('Order has been processed!')
  })
}
