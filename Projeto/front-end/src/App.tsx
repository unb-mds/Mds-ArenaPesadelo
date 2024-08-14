import { AuthProvider } from "./contexts/AuthContext";
import { Routes } from "./routes";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import GlobalStyles from './styles/global';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <ToastContainer />
    </StyleSheetManager>
  );
}

export default App;
