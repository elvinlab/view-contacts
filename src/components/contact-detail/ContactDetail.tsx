import { ChangeEvent, useEffect } from 'react';
import { FormEvent, useContext, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ContactContext from '../../contexts/ContactContext';
import IContact from '../../interfaces/IContact';

import '../../assets/css/ContactDetail.css';
interface RouteParams {
    uuid: string;
    action: string;
}

export const ContactDetail = () => {
    let { uuid, action } = useParams<RouteParams>();
    const [redirect, setRedirect] = useState<boolean>(false);

    const [formValues, setFormValues] = useState<IContact>({
        uuid: uuid,
        name: '',
        surnames: '',
        province: '',
        phone: ''
    });

    const {
        contactState: { currentContact },
        contactDispatch
    } = useContext(ContactContext);

    useEffect(() => {
        if (currentContact[uuid]) {
            setFormValues(currentContact[uuid]);
        }
    }, [currentContact, uuid]);

    const { name, surnames, province, phone } = formValues;

    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (phone.length !== 8) {
            return Swal.fire('Error', 'Ingresar número válido', 'error');
        }

        if (currentContact[uuid]) {
            contactDispatch({ type: 'EDIT_CONTACT', payload: formValues });
        } else {
            contactDispatch({ type: 'ADD_CONTACT', payload: formValues });
        }
        setRedirect(true);
    };

    if (redirect) {
        return <Redirect to="/contactos" />;
    } else {
        return (
            <div className="container">
                <header className="header-contact">
                    <Link to="/contactos">
                        <i className="fas fa-chevron-circle-left back-btn"></i>
                    </Link>

                    <div className="info">
                        <h1 className="name">{action === 'agregar' ? 'Agregar contacto' : currentContact[uuid].name}</h1>
                    </div>
                </header>

                <form className="contact-info" onSubmit={handleSubmitForm}>
                    <div className="info-form">
                        <i className="fas fa-user-circle icon-gradient"></i>
                        <input required type="text" className="type" name="name" placeholder="Nombre" value={name} onChange={handleInputChange} />
                    </div>

                    <div className="info-form">
                        <i className="fas fa-file-signature icon-gradient"></i>
                        <input required type="text" className="type" name="surnames" placeholder="Apellidos" value={surnames} onChange={handleInputChange} />
                    </div>

                    <div className="info-form">
                        <i className="fas fa-map-marker-alt icon-gradient"></i>
                        <input required type="text" className="type" name="province" placeholder="Provincia donde vive" value={province} onChange={handleInputChange} />
                    </div>

                    <div className="info-form">
                        <i className="fas fa-phone icon-gradient"></i>
                        <input required type="text" className="type" name="phone" placeholder="Número de teléfono" maxLength={8} value={phone} onChange={handleInputChange} pattern="[0-9]+" />
                    </div>

                    <button className="button" type="submit">
                        {action === 'agregar' ? 'AGREGAR' : 'EDITAR'}
                    </button>
                </form>
            </div>
        );
    }
};
