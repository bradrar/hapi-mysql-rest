const React = require('react');
const Layout = require('./layout.jsx');

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
            <Layout >
                <div className='container'>
                    
                    <h1>{this.props.user} </h1>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Mobile Number</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.solution.map((item, index) => (
                            <tr key={index}>
                                <th scope="row"> {index + 1} </th>
                                <td> {item.firstName} </td>
                                <td> {item.lastName} </td>
                                <td> {item.address}  </td>
                                <td> 
                                    {item.mobileNumber} 
                                    <a href={`/update/${item.id}`}> Edit </a> 
                                    <form style={{display: 'inline'}} action={`/${item.id}`} method="post"> 
                                        <button className="btn btn-danger"> X </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                            <div className='container text-center'>
                                <a className="btn btn-outline-primary" href="/add"> Add New Contact</a>
                            </div>
                       
              
                </div>
            </Layout>
        );
    }
};