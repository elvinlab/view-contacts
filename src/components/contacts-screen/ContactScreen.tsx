import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./ContactScreen.css";

export const ContactScreen = () => {
  const removeContact = () => {
    Swal.fire({
      title: "¿ESTÁS SEGURO/A?",
      text: "No se podrá recuperar el contacto una vez borrado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container">
      <header className="header">
        <form className="search-bar">
          <input
            type="search-name"
            className="contact-filter"
            name="search"
            placeholder="Buscar"
          />
        </form>
      </header>

      <section className="contacts">
        <ul className="contacts-list">
          <div className="contact-section">
            <li className="list__element">
              <p className="contact-name">John Doe</p>
            </li>

            <li className="list__element">
              <i
                onClick={() => removeContact()}
                className="far fa-trash-alt remove-contact"
              ></i>
              <Link to="/contacto/editar">
                <i className="far fa-edit edit-contact"></i>
              </Link>
            </li>
          </div>

          <hr />
        </ul>
      </section>
      <button className="buttonAdd">Agregar contacto</button>
    </div>
  );
};
