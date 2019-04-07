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










const init = async () => {

    
    console.log(`Server running at: ${server.info.uri}`);
    await server.register(Inert);
    // Home Route
    server.route({ 
        method: 'GET', 
        path: '/', 
        handler: (request, h) => {

            return new Promise ((resolve, reject) => {

                connection.query('SELECT * FROM phonebook', (err,rows) => {
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

                let firstName = request.payload.firstName;
                let lastName = request.payload.lastName;
                let address = request.payload.address;
                let mobileNumber = request.payload.mobileNumber;

                const employee = { firstName: firstName, lastName: lastName, address: address, mobileNumber: mobileNumber };
                connection.query('INSERT INTO phonebook SET ?', employee, (err, res) => {
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

      //new update get employee
      server.route({
        method: 'get',
        path: '/update/{index}',
        handler: (request, h) => {
            return new Promise ((resolve, reject) => {

              

                let index = Number(request.params.index)
                connection.query(` SELECT * FROM phonebook WHERE id = ${index} limit 1` , (err, result)=> {
                   
                    let views = () => {
                        return h.view('update', {
                            employee: result[0]
                        });
                    }
    
                    return resolve(views());
                })
 
            })
        }
    });


          //Action update get employee
          server.route({
            method: 'POST',
            path: '/employeeUpdated',
            handler: (request, h) => {
                return new Promise ((resolve, reject) => {
                   
                    let firstName = request.payload.firstName;
                    let lastName = request.payload.lastName;
                    let address = request.payload.address;
                    let mobileNumber = request.payload.mobileNumber;
                    let index= Number(request.payload.index);
                    console.log(request.payload)
                    connection.query(
                        'UPDATE phonebook SET firstName = ?, lastName = ?, address = ?, mobileNumber = ? Where ID = ?',
                        [firstName, lastName , address , mobileNumber, index],
                        (err, result) => {
                          if (err) throw err;
                      
                         
                            console.log(result);
                          let redirect=  () => {
                            return h.redirect().location('/')
                             }

                   
                            return resolve(redirect())
                  

                        }
                      );
                    
    
     
                })
            }
        });

     //delete employee
     server.route({
        method: 'POST',
        path: '/{index}',
        handler: (request, h) => {
            return new Promise ((resolve, reject) => {

            
                let index = Number(request.params.index)
                connection.query(
                    'DELETE FROM phonebook WHERE id = ?', [index], (err, result) => {
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
