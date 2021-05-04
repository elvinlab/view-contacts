import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ContactDetail } from "../components/contact-detail/ContactDetail";
import { ContactScreen } from "../components/contacts-screen/ContactScreen";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/contactos" component={ContactScreen} />
          <Route exact path="/contacto/:action" component={ContactDetail} />
          <Redirect to="/contactos" />
        </Switch>
      </div>
    </Router>
  );
};
