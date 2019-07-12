import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// components
import BookList from './BookList';
import Home from './Home';
import Search from './Search';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <Search />
            </div>
        </ApolloProvider>
    );
  }
}
export default App;