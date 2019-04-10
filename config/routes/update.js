var connection = require('../../connection/database')

module.exports = [{
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
},
{
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
}
]