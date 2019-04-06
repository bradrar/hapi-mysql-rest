const React = require('react');


module.exports = class IndexPage extends React.PureComponent {

    render() {
        
        return (
            <div year={this.props.year}>
                <h1>{this.props.title}</h1>
                <p>{this.props.message}</p>
                
                <ul>
                    {this.props.solution.map(item => (
                        <li key={item.name}>
                        {item.name} 
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