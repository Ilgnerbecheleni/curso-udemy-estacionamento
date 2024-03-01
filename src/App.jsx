

import './App.css'
import Rotas from './Rotas'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
  

function App() {

 return(
  <>
  <ToastContainer autoClose={1000}/>
  <Rotas/>
  </>
 )
}

export default App
