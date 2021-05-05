import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UseForm } from '../../hooks/UseForm';

import Swal from 'sweetalert2';
import ContactContext from '../../contexts/ContactContext';
import SearchResults from 'react-filter-search';

import './ContactScreen.css';
import IContact from '../../interfaces/IContact';
interface filter {
    search: string;
}

export const ContactScreen = () => {
    const {
        contactState: { contacts },
        contactDispatch
    } = useContext(ContactContext);

    const { values, handleInputChange } = UseForm<filter>({
        search: ''
    });

    const { search } = values;

    const removeContact = (contactSelected: IContact) => {
        Swal.fire({
            title: '¿ESTÁS SEGURO/A?',
            text: 'No se podrá recuperar el contacto una vez borrado',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                contactDispatch({ type: 'REMOVE_CONTACT', payload: contactSelected });
            }
        });
    };

    return (
        <div className="container">
            <header className="header">
                <form className="search-bar">
                    <input type="search-name" className="contact-filter" name="search" placeholder="Buscar" value={search} onChange={handleInputChange} />
                </form>
            </header>

            {contacts.length > 0 ? (
                <SearchResults
                    value={search}
                    data={contacts}
                    renderResults={(results: any) => (
                        <section className="contacts">
                            {results.map((contact: IContact, index: number) => (
                                <ul key={`${contact.name}:${index + 1}`} className="contacts-list">
                                    <div className="contact-section">
                                        <li className="list__element">
                                            <p className="contact-name">{`${contact.name} ${contact.surnames}`}</p>
                                        </li>
                                        <li className="list__element" onClick={() => contactDispatch({ type: 'CONTACT_SET_ACTIVE', payload: contact })}>
                                            <i onClick={() => removeContact(contact)} className="far fa-trash-alt remove-contact"></i>
                                            <Link to={`/${contact.name}/editar`}>
                                                <i className="far fa-edit edit-contact"></i>
                                            </Link>
                                        </li>
                                    </div>

                                    <hr />
                                </ul>
                            ))}
                        </section>
                    )}
                />
            ) : (
                <p className="contact-name">No tiene contactos</p>
            )}
            <Link to="/contacto/agregar" className="buttonAdd">
                Agregar contacto
            </Link>
        </div>
    );
};
