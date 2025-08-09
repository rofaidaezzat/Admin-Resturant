import { Provider } from "react-redux";
import "./App.css";
import { store } from "./app/store";
import AdminPanel from "./Pages/AdminPanel";

function App() {
  return (
    <>
      <Provider store={store}>
        <AdminPanel />
      </Provider>
    </>
  );
}

export default App;
