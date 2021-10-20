import './App.css';
import { NavBarMenu } from './components/NavBarMenu';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Registro } from './views/Registro';
import { Home } from './views/Home';
import { Contacto } from './views/Contacto';
import { Layout } from 'antd';
import { RegistroModal } from './views/RegistroModal';
import { v4 as uuid } from 'uuid';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <div className="App">

      <Router>
        <Switch>

          <Layout className="layout">
            <Header>
              <div className="logo"><img src="/onepiece.png" width="100" alt="logo" /></div>
              <NavBarMenu />
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <div className="site-layout-content" style={{ margin: '50px 0' }}>

                <Route exact path="/registro" component={Registro} />
                <Route exact path="/registromodal" component={RegistroModal} />
                {/* <Route exact path="/registromodal/:id" component={RegistroModal} /> */}
                {/**
                 * Ahora si funciona. se agrega un key al azar para que obligue a renderizar el componente. de esta manera funciona el llamado. 
                 * no es una solucion optima, pero funciona.
                 */}
                <Route exact path="/registromodal/:id" render={(props)=> <RegistroModal {...props} key={uuid()} />} />

                <Route exact path="/registro/:id" component={Registro} />
                <Route exact path="/" component={Home} />
                <Route exact path="/contacto" component={Contacto} />

              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ejercicio de Ejemplo CRUD con AntD</Footer>
          </Layout>,


        </Switch>
      </Router >
    </div >
  );
}

export default App;
