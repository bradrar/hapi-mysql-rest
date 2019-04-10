'use strict';

const Hapi=require('hapi');
const Path = require('path');
const Inert = require('inert');
var mysql      = require('mysql');
const HapiReactViews = require('hapi-react-views');

var routes = require('./config/routes');
var connection = require('./connection/database')

require('babel-core/register')({
    plugins: ['transform-react-jsx']
});

const users = [
    {
        username: 'john',
        password: '$2b$10$nrkw6Mco2j7YyBqZSWRAx.P3XEZsZg3MNfma2ECO8rGMUTcF9gHO.',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
];




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
    await server.register(require('hapi-auth-cookie'));

    //strategy
    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'sid-example',
            password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
            isSecure: false
        },
        redirectTo: '/login',
        validateFunc: async (request, session) => {

            const account = await users.find(
                (user) => (user.id === session.id)
            );

            if (!account) {

                return { valid: false };
            }

            return { valid: true, credentials: account };
        }
    });


    server.auth.default({strategy: 'session', mode: 'try'});

    // Home Route
    server.route(routes);


    //restricted
    server.route({
        method: 'GET',
        path: '/restricted',
        options: {
            auth: {
                mode: 'required',
                strategy: 'session'
            }
        },
        handler: (request, h) => {
          
            
            return new Promise ((resolve, reject) => {

                let views = () => {
                    return h.view('restricted');
                }

                return resolve(views());
          

            });
  
        }
    });
  







    
    await server.register(require('vision'));
  

    server.views({
        engines: {
            jsx: HapiReactViews
        },
        relativeTo: __dirname,
        path: 'views'
        // context: (request) => {
        //     return {
              
        //     }
        // } 
    });

    await server.start();
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
// connection.end();

