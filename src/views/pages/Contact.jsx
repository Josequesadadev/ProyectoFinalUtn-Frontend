import { useState } from "react";
import Layout from "../../components/Layout";
import { sendEmail } from "../../controllers/emailController";

export default function Contact() {
  const [form, setForm] = useState({
    subject: "",
    email: "",
    message: ""
  });
  const [loader, setLoader] = useState(false)

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
      const dataResponse = await sendEmail(form)
      if (dataResponse.success) {
        alert("✅ Mensaje enviado correctamente")
        setForm({ subject: "", email: "", message: "" })
      } else {
        alert(`❌ Error: ${dataResponse.error || "No se pudo enviar el mensaje"}`)
      }
    } catch (error) {
      console.log(error)
      alert('❌ Error al enviar el mensaje')
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
