'use strict';

const Hapi=require('hapi');
const Path = require('path');
const Inert = require('inert');
var mysql      = require('mysql');
const HapiReactViews = require('hapi-react-views');

require('babel-core/register')({
    plugins: ['transform-react-jsx']
});

// Declare internals

const internals = {
    templatePath: '.'
};


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : "dbname",
  insecureAuth : true
});

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});



connection.connect();


// connection.query(
//     'UPDATE employees SET location = ? Where ID = ?',
//     ['South Africa', 5],
//     (err, result) => {
//       if (err) throw err;
  
//       console.log(`Changed ${result.changedRows} row(s)`);
//     }
//   );


// connection.query(
//     'DELETE FROM employees WHERE id = ?', [5], (err, result) => {
//       if (err) throw err;
  
//       console.log(`Deleted ${result.affectedRows} row(s)`);
//     }
//   );







const init = async () => {

    
    console.log(`Server running at: ${server.info.uri}`);
    await server.register(Inert);
    // Home Route
    server.route({ 
        method: 'GET', 
        path: '/', 
        handler: (request, h) => {

            return new Promise ((resolve, reject) => {

                connection.query('SELECT * FROM employees', (err,rows) => {
                    if(err) throw err;
                  
                    let solution = rows
                 
                    let views = () => {
                        return h.view('index', {
                            title: `this is title`,
                            message: 'Hello Jsx!',
                            solution: solution
                        });
                    }

                    return resolve(views());
                   
                  });
              

               
            })
          
        
        }
    });


    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    });

   
    

    //add employee
    server.route({
        method: 'POST',
        path: '/employee',
        handler: (request, h) => {
            return new Promise ((resolve, reject) => {

                let name = request.payload.name;
                let location = request.payload.location;

                const employee = { name: name, location: location };
                connection.query('INSERT INTO employees SET ?', employee, (err, res) => {
                if(err) throw err;

                let redirect=  () => {
                    return h.redirect().location('/')
                }
                console.log('successful')
                return resolve(redirect())
          
                });
           
            })
        }
    });


     //delete employee
     server.route({
        method: 'POST',
        path: '/{index}',
        handler: (request, h) => {
            return new Promise ((resolve, reject) => {

                console.log(request.params)

                let index = Number(request.params.index)
                connection.query(
                    'DELETE FROM employees WHERE id = ?', [index], (err, result) => {
                      if (err) throw err;
                
                      console.log(`Deleted ${result.affectedRows} row(s)`);

                      let redirect=  () => {
                        return h.redirect().location('/')
                    }
                    console.log('successful')
                    return resolve(redirect());
                    }
                  );
      
           
            })
        }
    });
  
    
    await server.register(require('vision'));
  

    server.views({
        engines: {
            jsx: HapiReactViews
        },
        relativeTo: __dirname,
        path: 'views'
    });

    await server.start();
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
// connection.end();





// I am trying to connect hapi.js with mysql. But when defining a server.route. the `handler` is not returning a value.

//         server.route({
//         method:'GET',
//         path:'/hello',
//         handler:function(request,h) {
    
//             connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//                 if (error) throw error;
    
//                 console.log('The solution is: ', results[0].solution);
    
//                 return ('The solution is: ', results[0].solution)
//               });
    
//         }
//     });

// It is saying `Error: handler method did not return a value, a promise, or throw an error`.

// In here, I am returning `('The solution is: ', results[0].solution)` But it is still not working.

// The output in the console is `The solution is: 2` but in the browser, It is an error.


// Please help. Thank you