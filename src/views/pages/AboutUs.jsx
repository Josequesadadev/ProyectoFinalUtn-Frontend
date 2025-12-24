import Layout from "../../components/Layout"

const AboutUs = () => {
  return (
    <Layout>
      <div className="page-banner">Sobre Nosotros</div>

      <section className="page-section">
        <h2>Nuestra Historia</h2>
        <p>
          Nacimos de muchas horas frente a la pantalla, de noches sin dormir, partidas épicas y PCs armadas pieza por pieza.
          Empezamos como gamers ayudando a otros gamers, buscando siempre el mejor rendimiento, el mejor setup y el precio justo.
          Hoy somos una tienda creada por y para la comunidad, donde cada producto está pensado para llevar tu experiencia de juego al siguiente nivel.
          No vendemos solo hardware: vendemos potencia, rendimiento y pasión por el gaming.   
        </p>

        <h2>Misión</h2>
        <p>
          Brindar a cada gamer los mejores productos y soluciones tecnológicas, con asesoramiento real y honesto, para que pueda jugar, competir y crear sin límites.
          Queremos que cada compra sea una mejora real en tu setup y una experiencia confiable de principio a fin.
        </p>

        <h2>Visión</h2>
        <p>
          Convertirnos en una tienda gamer de referencia, reconocida por la calidad de nuestros productos, la cercanía con la comunidad y el compromiso con la innovación.
          Soñamos con ser el lugar donde todo gamer sabe que va a encontrar rendimiento, confianza y pasión en cada componente.
        </p>
      </section>
    </Layout>
  )
}

export default AboutUs
