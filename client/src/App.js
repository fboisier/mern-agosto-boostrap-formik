import './App.css';
import Main from './Main';
import Detail from './views/Detail';
import Update from './views/Update';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route exact path="/people">
            <Main />
          </Route>

          <Route
            path="/people/:id/edit"
            component={Update}
          />


          <Route
            path="/people/:id"
            component={Detail}
          />

        </Switch>

      </Router>
    </div>
  );
}

export default App;
