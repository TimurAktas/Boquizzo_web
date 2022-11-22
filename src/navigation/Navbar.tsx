import { Avatar } from "@mui/material";
import "../styles/navbar.css"
export default function Navbar() {
    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          Quizzo
        </a>
        <div className="navigation-menu">
          <div style={{margin: 5}}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </div>
        </div>
      </nav>
    );
  }
