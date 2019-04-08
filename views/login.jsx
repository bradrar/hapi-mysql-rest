const React = require('react');
const Layout = require('./layout.jsx');

module.exports = class UpdatePage extends React.PureComponent {

    render() {
        return (
            <Layout>
                   <h3>Please Log In</h3>
                   <div className="container w-50 mt-5">
                    <form method="post" action="/login">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" id="username" placeholder="Enter Username" required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password"  id="password" placeholder="Enter Password" required />
                        </div>
                  
                        <div className='text-center'>
                 
                        <button type="submit" className="btn btn-primary">Submit</button>
                            
                        </div>
                    </form>
                </div>
            </Layout>
        )
    } 

}