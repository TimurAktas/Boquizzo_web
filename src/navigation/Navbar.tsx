import { Avatar } from "@mui/material";
import "../styles/navbar.css"
export default function Navbar() {
    const userAccessToken = localStorage.getItem("accessToken")

    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          BO-Quizzo Logo
        </a>
        <div className="navigation-menu">
          {userAccessToken &&  <div style={{margin: 5}}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </div>}
         
        </div>
      </nav>
    );
  }
