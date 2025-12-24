import { useState } from "react"
import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  })

  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL
  const { token } = useAuth()
  const [loader, setLoader] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)

    const dataToSend = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    }

    console.log(token)

    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      })

      if (!response.ok) {
        alert("❌ Error al cargar el producto")
        return
      }

      alert("✅ Éxito al guardar el nuevo producto")
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: ""
      })
      navigate("/")
    } catch (error) {

    } finally {
      setLoader(false)
    }
  }

  const handleChange = (e) => {
    const nombreDeInput = e.target.name
    setFormData({ ...formData, [nombreDeInput]: e.target.value })
  }

  return (
    <Layout>
      <div className="page-banner">Agregar Nuevo Producto</div>

      <section className="page-section">
        <form className="form-container"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            minLength={3}
            maxLength={20}
            onChange={(e) => handleChange(e)}
            value={formData.name}
          />
          <input
            type="text"
            placeholder="Descripción"
            name="description"
            minLength={3}
            maxLength={200}
            onChange={(e) => handleChange(e)}
            value={formData.description}
          />
          <input
            type="number"
            placeholder="Precio"
            name="price"
            min={0}
            onChange={(e) => handleChange(e)}
            value={formData.price}
          />
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            min={0}
            onChange={(e) => handleChange(e)}
            value={formData.stock}
          />
          <input
            type="text"
            placeholder="Categoría"
            name="category"
            minLength={3}
            maxLength={20}
            onChange={(e) => handleChange(e)}
            value={formData.category}
          />
          <button type="submit" className="btn btn--primary" aria-busy={loader} disabled={loader}>{loader ? "Agregando..." : "Agregar"}</button>
        </form>
      </section>
    </Layout>
  )
}

export default AddProduct
