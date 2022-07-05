import { Provider } from "react-redux";
import checkForToken from "./helpers/checkForToken";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store/store";
import moment from "moment";

/**TODO: moment configuration */
import 'moment/locale/es';
moment.locale('es');

checkForToken();

function App() {
  return (
    <>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </>
  );
}

export default App;
