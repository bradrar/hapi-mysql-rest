var connection = require('../../connection/database')

module.exports = [{
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
}]