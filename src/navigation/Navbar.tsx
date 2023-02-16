import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../styles/navbar.css"
export default function Navbar() {
    const userData = useSelector((state: RootState) => state.user.data);
    const aufgabenBild = require('../assets/Quizzo.png');
    
    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          <img src={aufgabenBild} width="160" height="30"/>
        </a>
        <div className="navigation-menu">
          {userData &&  <div style={{margin: 5}}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </div>}
         
        </div>
      </nav>
    );
  }
