// src/layouts/Layout.jsx
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigateUser = useNavigate()

  const handleLogout = () => {
    logout()
    navigateUser("/login")
  }

  return (
    <>
      <header className="layout-header">
        <nav className="layout-nav container">

          <div className="nav-center">
            <Link to="/">Nuestros productos</Link>
            <Link to="/sobre-nosotros">Sobre nosotros</Link>
            <Link to="/contacto">Contactanos</Link>
            { user && <Link to="/agregar-producto">Agregar producto</Link> }
          </div>

          <div className="nav-right">
            {
              !user ?
                <>
                  <Link to="/login" className="btn">Login</Link>
                  <Link to="/registro" className="btn">Registro</Link>
                </>
                :
                <>
                  <button className="btn" onClick={handleLogout}>Cerrar sesión</button>
                </>
            }
          </div>
        </nav>

      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <p>Sitio desarrollado por Jose Quesada</p>
      </footer>
    </>
  )
}

export default Layout
