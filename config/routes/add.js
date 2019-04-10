var connection = require('../../connection/database')

module.exports = [
    //new add route
    {
        method: 'GET',
        path: '/add',
        handler: async (request, h) => {
            
            return new Promise ((resolve, reject) => {

                let views = () => {
                    return h.view('add');
                }

                return resolve(views());
          

            })
  
         
        }

    },
    // post route
    {
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
    }
    
];