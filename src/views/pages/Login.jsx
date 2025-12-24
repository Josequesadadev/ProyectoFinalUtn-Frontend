import { useNavigate } from "react-router-dom"
import Layout from "../../components/Layout"
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"
import { login as loginUser } from "../../controllers/authController"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [loader, setLoader] = useState(false)

  const { login } = useAuth()
  const navigateUser = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      const responseData = await loginUser(formData)

      if (responseData.error) {
        alert(responseData.error)
        return
      }

      // login exitoso
      login(responseData.token)
      navigateUser("/")
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  }

  return (
    <Layout>
      <div className="center-auth">
        <form className="form-container" onSubmit={handleSubmit}>
          <h3>Iniciar Sesión</h3>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn--primary" aria-busy={loader} disabled={loader}>{loader ? "Ingresando..." : "Ingresar"}</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
