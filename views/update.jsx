const React = require('react');
const Layout = require('./layout.jsx');

module.exports = class UpdatePage extends React.PureComponent {

    render() {
        let phonebook = this.props.employee
        return (
             <Layout>

            <div className="container w-50 mt-5">
                <h1>Update details of {phonebook.firstName}</h1>

             <form action="/employeeUpdated" method="POST">
                <input type="hidden" name="index" defaultValue={phonebook.id} />
                <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" defaultValue={phonebook.firstName} id="firstName" placeholder="Enter First Name" required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName"  defaultValue={phonebook.lastName} id="lastName" placeholder="Enter  Last Name" required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" name="address"  defaultValue={phonebook.address} id="address" placeholder="Enter  Address" required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="mobileNumber">Mobile Number</label>
                            <input type="text" className="form-control" name="mobileNumber" defaultValue={phonebook.mobileNumber} id="mobileNumber" placeholder="Enter  Mobile Number" required />
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