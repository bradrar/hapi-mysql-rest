const React = require('react');
const Layout = require('./layout.jsx');

module.exports = class Search extends React.PureComponent {

    render() {
        let result = this.props.result.length ?  this.props.result : 'Name Not found'
        return (
            <Layout>

             <h1> Search result for {this.props.query} </h1> 


                { 
                    result === "Name Not found" ? <p> Details not found, Please try again </p> 
                    :
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
                    {this.props.result.map((item, index) => (
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
                }
                   

            </Layout>
        )
    } 

}