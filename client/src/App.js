import './App.css';
import Header from './component/Header';

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Clients from './component/Clients';
import AddClientModal from './component/AddClientModal';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: cache
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModal />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;