const React = require('react');
const Layout = require('./layout.jsx');

module.exports = class Restricted extends React.PureComponent {

    render() {
        return (
            <Layout>
                 
               Welcome to Restricted Area
            </Layout>
        )
    } 

}