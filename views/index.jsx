const React = require('react');

const deleteStyle = {
    display: 'inline'
}

const pStyle = {
    fontSize: '15px',
    textAlign: 'center'
  };

module.exports = class IndexPage extends React.PureComponent {

    render() {
        
        return (
            <div year={this.props.year}>
                <h1>{this.props.title}</h1>
                <p>{this.props.message}</p>
                
                <ul>
                    {this.props.solution.map((item, index) => (
                        <li key={index}>
                        {item.firstName} , {item.lastName} , {item.address} , {item.mobileNumber} , {item.id} <a href={`/update/${item.id}`}> Edit </a> 
                    <form style={{display: 'inline'}} action={`/${item.id}`} method="post"> 
                        <button> X </button>
                        </form>
                        </li>
                    ))}
                </ul>

                <form action="/employee" method="post">
                    <input type="text" name="firstName"  placeholder="first name"/>
                    <input type="text" name="lastName"  placeholder="last name"/>
                    <input type="text" name="address"  placeholder="address"/>
                    <input type="text" name="mobileNumber"  placeholder="mobile number"/>

                    <button>Submit</button>
                </form>
            </div>
        );
    }
};