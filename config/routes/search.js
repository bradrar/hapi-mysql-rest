var connection = require('../../connection/database')

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



module.exports = [
    {
        method: 'GET',
        path: '/search',
        handler: (request, h) => {
          
            return new Promise ((resolve, reject) => {

          
                const regex = request.query.search
                
                connection.query(` SELECT * FROM phonebook WHERE firstName = '${regex}' limit 1` , (err, result)=> {
                   if (result){
                    let views = () => {
                        return h.view('search',{
                            result: result,
                            query: request.query.search
                        });
                    }
                    console.log(regex)
                    console.log(result)
                    return resolve(views());
                } else {

                    let redirect=  () => {
                        return h.redirect().location('/')
                        }
                    console.log('successful')
                    return reject(redirect());
                    }
                  
                

            } 

                
            )

               
    
            } 
            
            )
  
        }
    }
]