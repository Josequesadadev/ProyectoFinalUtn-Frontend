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
          {/* Logo a la izquierda */}
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              GameStore
            </Link>
          </div>

          {/* Enlaces de navegación centrados - CON ESTILO VERDE NEON */}
          <div className="nav-center">
            <Link to="/">Nuestros productos</Link>
            <Link to="/sobre-nosotros">Sobre nosotros</Link>
            <Link to="/contacto">Contactanos</Link>
            
            {/* Mostrar "Agregar producto" solo cuando el usuario está logueado */}
            {user && <Link to="/agregar-producto">Agregar producto</Link>}
          </div>

          {/* Enlaces de autenticación a la derecha */}
          <div className="nav-right">
            {
              !user ? (
                <>
                  <Link to="/login" className="btn">Iniciar Sesión</Link>
                  <Link to="/registro" className="btn btn--primary">Registrarse</Link>
                </>
              ) : (
                <>
                  <span className="user-greeting">Hola, {user.id}</span>
                  <button onClick={handleLogout} className="btn">Cerrar Sesión</button>
                </>
              )
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