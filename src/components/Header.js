import {  useState,useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

export const Header = () =>{
    const [btnNameReact, setBtnNameReact] = useState("Login");
    //console.log("Header render");
      
    const onlineStatus = useOnlineStatus();

    const {loggedInUser}  = useContext(UserContext);
     
    const cart = useSelector()
     
    return (
            <div className="flex justify-between bg-purple-400 shadow-lg">
                      <div className="logo-container">
                         <img
                           className="w-24 h-24"
                             src={LOGO_URL} />
                        </div>
               <div className="flex items-center">
                        <ul className="flex p-4 m-4">
                            <li>
                                OnlineStatus: {onlineStatus? "✅" : "❌"}</li>
                        <li className="px-4"><Link to="/">Home</Link></li>
                        <li className="px-4">
                           <Link to="/about"> About Us</Link>
                            </li>
                            <li className="px-4">
                                <Link to ="/Grocery">Grocery</Link>
                            </li>
                        <li className="px-4">
                           <Link to="/contact"> Contact Us</Link>
                            
                            </li>
                            <li className="px-4 font-bold text-xl"><Link to="/cart">🛒</Link></li>
                        <button
                        className="login-btn"
                        onClick={()=>{
                            btnNameReact ==="Login"
                            ? setBtnNameReact("Logout")
                            : setBtnNameReact("Login");
                        }}
                        >
                            {btnNameReact}
                        </button>
                        <li className="px-4 font-bold" >{loggedInUser}</li>
                        </ul>
                </div>
            </div>
       );
};

export default Header;