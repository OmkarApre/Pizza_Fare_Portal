import React, { Component, Fragment } from 'react'
import footer from "./footer.css";

export class Footer extends Component {
    render() {
        return (
            <Fragment>
                 <div className="footer__container">
                     <div className="links">
                        
                        <ul className="menu">
                            <li className="menu__item"><a></a></li>
                            <li className="menu__item"><a></a></li>
                            <li className="menu__item"><a></a></li>
                        </ul>
                    </div>
                    <p className="copy" >&copy Copyright reserved 2021.</p>
                 </div>
                 
            </Fragment>
           
        )
    }
}

export default Footer
