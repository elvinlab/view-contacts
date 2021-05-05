import { createContext } from 'react';
import IContact from '../interfaces/IContact';

export const initialState: IContactState = {
    contacts: [],
    currentContact: {}
};

export interface IContactActions {
    type: 'ADD_CONTACT' | 'REMOVE_CONTACT' | 'CONTACT_SET_ACTIVE' | 'EDIT_CONTACT';
    payload: IContact;
}

export interface IContactState {
    contacts: IContact[];
    currentContact: { [key: string]: IContact };
}

export const contactReducer = (state: IContactState, action: IContactActions) => {
    let contact = action.payload;
    let currentContact = { ...state.currentContact };

    switch (action.type) {
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };

        case 'REMOVE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter((e) => e.name !== action.payload.name)
            };

        case 'EDIT_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map((e) => (e.name === action.payload.name ? action.payload : e))
            };

        case 'CONTACT_SET_ACTIVE':
            currentContact[contact.name] = contact;
            return { ...state, currentContact };

        default:
            return state;
    }
};

export interface IContactContext {
    contactState: IContactState;
    contactDispatch: React.Dispatch<IContactActions>;
}

const ContactContext = createContext<IContactContext>({
    contactState: initialState,
    contactDispatch: () => undefined
});

export const ContactContextProvider = ContactContext.Provider;
export default ContactContext;
