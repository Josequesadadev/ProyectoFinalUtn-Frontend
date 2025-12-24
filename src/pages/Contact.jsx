import { useState } from "react";
import Layout from "../components/Layout";

export default function Contact() {
  const [form, setForm] = useState({
    subject: "",
    email: "",
    message: ""
  });
  const [loader, setLoader] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    try {
      const response = await fetch(`${API_URL}/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })
      const dataResponse = await response.json()

      console.log(dataResponse)
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  };

  return (
    <Layout>
      <div className="page-banner">Contacto</div>

      <form className="contact-form" onSubmit={handleSubmit}>


        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Asunto</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mensaje</label>
          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn--primary" aria-busy={loader} disabled={loader}>{loader ? "Enviando..." : "Enviar"}</button>
      </form>
    </Layout>
  );
}
