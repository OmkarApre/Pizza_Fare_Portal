import React, { useEffect, useState } from 'react'
import { getOrders } from '../config/MyService'
import jwt_decode from 'jwt-decode';
import NavbarDash from './NavbarDash';
import Footer from './Footer';

export default function Orderdata() {
  const [orders, setOrders] = useState([])
  const [uid,setUid]=useState('')
  
  useEffect(()=>{
      
    if(localStorage.getItem('_token')!=undefined){
        let token=localStorage.getItem('_token');
        let decode=jwt_decode(token);
        console.log(decode)
        setUid(decode.uid)
        getOrders()
        .then(res=>{
            console.log(res.data);
            if(res.data.err==0){
              setOrders(res.data.data);
            }
        })
    }
 },[])
  let arr = [];
  for (let i = 0; i < orders.length; i++) {
    // arr.push(orders[i].name)
    // arr.push(" ")
    console.log(orders[i].name)
  }
  return (
    <>
    <NavbarDash/>
    <div className="container col-6" style={{backgroundImage:`url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdo3Yt96brcBFc_iw1vby8rvm-ROM1dSreA&usqp=CAU")`,height:"590px",width:"1536px"}}>
      
      <br/>
      <br/>
      <table class="table bg-light table-bordered text-uppercase">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Card details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((val, index) =>
            <tr>
              <td>{index + 1}</td>
              <td>{val.name}</td>
              <td>{val.price}</td>
              <td>{val.card}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  )
}
