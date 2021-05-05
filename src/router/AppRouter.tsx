import { useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ContactDetail } from '../components/contact-detail/ContactDetail';
import { ContactScreen } from '../components/contacts-screen/ContactScreen';
import { ContactContextProvider, contactReducer, initialState } from '../contexts/ContactContext';


export const AppRouter = () => {
    const [contactState, contactDispatch] = useReducer(contactReducer, initialState);

    const contactContextValues = {
        contactState,
        contactDispatch
    };

    return (
        <ContactContextProvider value={contactContextValues}>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/contactos" component={ContactScreen} />
                        <Route exact path="/:key/:action" component={ContactDetail} />
                        <Redirect to="/contactos" />
                    </Switch>
                </div>
            </Router>
        </ContactContextProvider>
    );
};
