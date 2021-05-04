import { Link } from "react-router-dom";
import "./ContactDetail.css";
export const ContactDetail = () => {
  return (
    <div className="container">
      <header className="header-contact">
        <Link to="/contactos">
          <i className="fas fa-chevron-circle-left back-btn"></i>
        </Link>

        <div className="info">
          <h1 className="name">Jane Doe</h1>
        </div>
      </header>

      <section className="contact-info">
        <div className="info-form">
          <i className="fas fa-user-circle icon-gradient"></i>
          <input
            required
            type="text"
            className="type"
            name="name"
            placeholder="Nombre"
          />
        </div>

        <div className="info-form">
          <i className="fas fa-file-signature icon-gradient"></i>
          <input
            type="text"
            className="type"
            name="surnames"
            placeholder="Apellidos"
          />
        </div>

        <div className="info-form">
          <i className="fas fa-map-marker-alt icon-gradient"></i>
          <input
            type="text"
            className="type"
            name="province"
            placeholder="Provincia donde vive"
          />
        </div>

        <div className="info-form">
          <i className="fas fa-phone icon-gradient"></i>
          <input
            type="text"
            className="type"
            name="phone-number"
            placeholder="Número de teléfono"
          />
        </div>
      </section>
      <button className="button">EDITAR</button>
    </div>
  );
};
