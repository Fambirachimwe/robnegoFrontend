import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  // Link
} from "react-router-dom";
import Home from "./Home";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Login from "./Login";
import Register from "./Register";

const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">

        <Router>
          {
            localStorage.getItem('token') ? (
              <Redirect to="/" />
            ) :

              (
                <Redirect to="/login" />
              )
          }
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Register />
            </Route>

          </Switch>

        </Router>


      </div>
    </QueryClientProvider>

  );
}

export default App;
