
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { AppRouter } from "./routes/Router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App
