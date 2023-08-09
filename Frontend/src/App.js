import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import NavbarDash from './components/NavbarDash';
import Orderdata from './components/Orderdata';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart'
import {  Route, Switch} from "react-router-dom";

function App() {
  return (
   <div>
      <Switch>
        <Route path="/Dash" exact component={Dashboard} />
        <Route path="/Dash/cart" exact component={Cart} />
        <Route path="/orders" exact component={Orderdata} />
        <Route path="/Reg" exact component={Register} />
        <Route path="/" exact component={Login} />
      </Switch>
   </div>
  );
}

export default App;
