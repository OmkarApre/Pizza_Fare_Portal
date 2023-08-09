import React from 'react'
import { connect } from "react-redux";
import { Route, Switch, Link, useHistory } from "react-router-dom";


function NavbarDash(props) {
  let History = useHistory();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    History.push("/")

  }
  return (
    <div>

<nav class="navbar-expand-lg navbar-light bg-light" >
  <div class="container-fluid"  style={{background:"rgb(122, 160, 152)"}}>
    <a class="navbar-brand" href="#"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span ></span>
    </button>
    <div class="collapse navbar-collapse" >
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" ><Link to="/Dash" class="nav-link">Home</Link></a>
        <a class="nav-link"> <Link to="/Dash/cart" class="nav-link">Cart {props.mycounter}</Link></a>
        <a class="nav-link"> <Link to="/orders" class="nav-link">Orders</Link></a>
        <a class="nav-link" ><Link to="/" class="nav-link">Logout</Link></a>
        
    
      </div>
    </div>
  </div>
</nav>
      {/* <Dashboard/> */}
     
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    mycounter: state.count,
  };
};
export default connect(mapStateToProps)(NavbarDash);
