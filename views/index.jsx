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
                        {item.name} , {item.id}  
                    <form style={{display: 'inline'}} action={`/${item.id}`} method="post"> 
                        <button> X </button>
                        </form>
                        </li>
                    ))}
                </ul>

                <form action="/employee" method="post">
                    <input type="text" name="name"  placeholder="name"/>
                    <input type="text" name="location"  placeholder="location"/>

                    <button>Submit</button>
                </form>
            </div>
        );
    }
};