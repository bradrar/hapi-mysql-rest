const React = require('react');


module.exports = class UpdatePage extends React.PureComponent {

    render() {
        let phonebook = this.props.employee
        return (
            <div>
                <h1>this is update page.</h1>

             <form action="/employeeUpdated" method="POST">
                <input type="hidden" name="index" defaultValue={phonebook.id} />
                <p>First Name: </p>
                <input type="text" name="firstName" defaultValue={phonebook.firstName}  />
                <p>Last Name: </p>
                <input type="text" name="lastName" defaultValue={phonebook.lastName}  />
                <p>address </p>
                <input type="text" name="address" defaultValue={phonebook.address}  />
                <p>Mobile Number </p>
                <input type="text" name="mobileNumber" defaultValue={phonebook.mobileNumber} />
              
                <button>Update Now </button>
              </form>
              
              
            </div>
        );
    }
};