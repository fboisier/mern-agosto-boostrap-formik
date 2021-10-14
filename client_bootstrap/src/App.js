import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { NavBarMenu } from "./components/NavBarMenu";
import { Contacto } from "./views/Contacto";
import { Home } from "./views/Home";
import { Registro } from "./views/Registro";

const App = () => {
  return (
    <>

      <Router>

        <NavBarMenu />
        <Container className="mt-4">

          <Switch>
            
            <Route exact path="/registro" component={Registro} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/contacto" component={Contacto} />
            

            <Redirect
              exact
              from="/"
              to="/login"
            />

            
          </Switch>

        </Container>
      </Router>

    </>
  );
}

export default App;