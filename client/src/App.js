import { BrowserRouter as Router, Route, Routes } from "react-router-dom" 
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Header from './component/Header';

import './App.css';
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";

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
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:id" element={<ProjectPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
