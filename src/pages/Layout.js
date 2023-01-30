import { Container, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"

const Layout = () => {
  return (
    <div className="hatter">
      <header className="text-center">
        <img src="http://localhost:3000/logo_otr.png" /> 
        <h1 className="text-center">Oktatói Teljesítményértékelési Rendszer</h1>
      </header>
      <nav className="mb-3">
        <Navbar />
      </nav>
      <Container className="p-3 bg-white lekerekitett"><Outlet /></Container>
      <footer className="p-5 text-center"></footer>
    </div>
  )
};

export default Layout;