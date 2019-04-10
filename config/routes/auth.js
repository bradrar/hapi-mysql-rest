
const Bcrypt = require('bcrypt');

const users = [
    {
        username: 'john',
        password: '$2b$10$nrkw6Mco2j7YyBqZSWRAx.P3XEZsZg3MNfma2ECO8rGMUTcF9gHO.',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
];

module.exports = [
    {
        method: 'GET',
        path: '/login',
        handler: async (request, h) => {
            
            return new Promise ((resolve, reject) => {

                let views = () => {
                    return h.view('login');
                }

                return resolve(views());
          

            })
  
         
        },
        options: {
            auth: false
        }

    },
    {
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {

           console.log(request.payload)
            const { username, password } = request.payload;
            const account = users.find(
                (user) => user.username === username
            );

            if (!account || !(await Bcrypt.compare(password, users[0].password))) {
                console.log('user or password incorrect')
                return h.view('login');
            }

            request.cookieAuth.set({ id: users.id });
            console.log('login successful')
            return h.redirect().location("/")
         }
    },
    {
        method: 'GET',
        path: '/logout',
        handler: async (request, h) => {
            
            request.cookieAuth.clear();
            return h.redirect().location('/')
         
        }

    }
]