
var connection = require('../../connection/database')

module.exports = [
    { 
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
                            solution: solution,
                            user : request.auth.credentials
                        });
                    }

                    console.log(request.auth.credentials)
                    return resolve(views());
                   
                  });
              

               
            })
          
        
        }
    }
];