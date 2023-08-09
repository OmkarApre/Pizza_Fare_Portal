import React,{useState} from 'react'
import { login } from '../config/MyService'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Footer from './Footer';
export default function Login() {
    const [state,setState]=useState({email:'',password:'',name:'',age:''});
    const handler=(event)=>{
        const {name,value}=event.target;
        setState({...state,[name]:value})
    }
    const History = useHistory();
    const postRegis=(event)=>{
        event.preventDefault();
        login(state)
        .then(res=>{
            console.log(res.data.msg)
            if(res.data.err==0){
               localStorage.setItem("_token",res.data.token);
               localStorage.setItem("userdetails",state.email);
               History.push("/Dash")
            }
            if(res.data.err==1){
                console.log(res.data)
            }
        })
    }
    return (
        <>
        <div style={{backgroundImage:`url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdo3Yt96brcBFc_iw1vby8rvm-ROM1dSreA&usqp=CAU")`,height:"657px", width:"1536px"}}>
            <br/><br/>
            <div className="container  col-5" style={{background:"rgb(134, 190, 101)",height:"380px",marginTop:"50px"}}>
            <h1 style={{marginTop:"50px", marginLeft:"200px"}}>Login</h1>
            <br/><br/>
            <form method="post" onSubmit={postRegis}>
                <div className="form-group">
                    <h5> EMAIL</h5>
                    <input type="email" name="email" placeholder="Email" className="form-control" onChange={handler}/>
                </div><br/><br/>
                <div className="form-group">
                    <h5> PASSWORD</h5>
                    <input type="password" name="password" placeholder="Password" className="form-control" onChange={handler}/>
                </div><br/><br/>
                <div className="text-center">
                <input type="submit" value="LOGIN" className="btn btn-dark text-center"/></div>
            </form><br/><br/>
            <p className="text-center">If Not Registered, <Link to="/Reg">Register Here</Link></p>
            </div>
            
        </div>
        
        <Footer/>
        </>
        
    )
}

