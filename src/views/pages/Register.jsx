import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../../components/Layout"
import { register as registerUser } from "../../controllers/authController"

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [loader, setLoader] = useState(false)

  const navigate = useNavigate()

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
      const responseData = await registerUser(formData)

      if (!responseData.success) {
        alert(responseData.error)
        return
      }

      alert(`✅ Usuario creado con éxito: ${responseData.data._id}`)
      navigate("/login")
    } catch (error) {
      console.log("Error al registrar el usuario", error)
    } finally {
      setLoader(false)
    }
  }

  return (
    <Layout>
      <div className="center-auth">
        <form className="form-container" onSubmit={handleSubmit}>
          <h3>Crear Cuenta</h3>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            onChange={handleChange}
          />
          <button type="submit" className="btn btn--primary" aria-busy={loader} disabled={loader}>{loader ? "Registrando..." : "Registrarse"}</button>
        </form>
      </div>
    </Layout>
  )
}

export default Register
