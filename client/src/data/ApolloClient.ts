import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/currencies',
});

export default client;
