const React = require('react');
const Layout = require('./layout.jsx');



module.exports = class Add extends React.PureComponent {

    render() {
        
        return (
            <Layout>
                <div className="container w-50 mt-5">

                    <form action="/employee" method="post">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" id="firstName" placeholder="Enter First Name" required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName"  id="lastName" placeholder="Enter  Last Name" required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" name="address"  id="address" placeholder="Enter  Address" required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="mobileNumber">Mobile Number</label>
                            <input type="text" className="form-control" name="mobileNumber"  id="mobileNumber" placeholder="Enter  Mobile Number" required />
                        </div>
                    
                        <div className='text-center'>
                 
                        <button type="submit" className="btn btn-primary">Submit</button>
                                   
                        </div>
                    </form>
                </div>
            </Layout>
        );
    }
};