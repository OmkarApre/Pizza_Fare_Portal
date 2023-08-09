import React, { useEffect, useState } from 'react'
import { getPosts } from '../config/MyService'
import { connect } from "react-redux";
import jwt_decode from 'jwt-decode';
import Footer from './Footer';
import { useSelector, useDispatch } from "react-redux";
import NavbarDash from './NavbarDash';

function Dashboard(props) {
  const [postdata, setPostdata] = useState([])
  const [uid,setUid]=useState('')
  const cart = useSelector((state) => state.cartItems);
  console.log(cart);
  const dispatch = useDispatch();
 
  useEffect(()=>{
      
    if(localStorage.getItem('_token')!=undefined){
        let token=localStorage.getItem('_token');
        let decode=jwt_decode(token);
        console.log(decode)
        setUid(decode.uid)
        getPosts()
        .then(res=>{
            console.log(res.data);
            if(res.data.err==0){
                setPostdata(res.data.data);
            }
        })
    }
 },[])
  console.log(postdata)
  return (
    <>
    <div style={{backgroundImage:`url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdo3Yt96brcBFc_iw1vby8rvm-ROM1dSreA&usqp=CAU")`,marginTop:"0px",height:"900px"}}>
    <NavbarDash/>
    <div className="container" >
      {/* {postdata[0].name} */}
     <h2 className="text-light bg-dark" >Welcome : {uid}</h2>
      <div className=" row">
        {postdata.map((val, index) =>
          <div className=" container col-md-4">
            <div className="card" >
              <img src={val.image} className="card-img-top" alt="..." height="200px" />
              <div className="card-body">
                <h5 className="card-title">{val.name}</h5>
                <p className="card-text">Price:${val.price}</p>
                <a className="btn btn-dark" onClick={() =>
                  props.cart(
                    val._id,
                    val.image,
                    val.name,
                    val.price
                  )
                }>Add to cart</a>
              </div>
            </div>
          </div>)}

      </div>
          
    </div>
    </div>
    <Footer/>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    mycounter: state.count,
  };
};

const mapDispatchTopProps = (dispatch) => {
  return {
    cart: function (_id, image, name, price) {
      dispatch({
        type: "CART",
        payload: {
          id: _id,
          image: image,
          name: name,
          price: price
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchTopProps)(Dashboard);