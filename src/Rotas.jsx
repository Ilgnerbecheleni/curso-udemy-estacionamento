import { BrowserRouter,Route,Routes  } from "react-router-dom";
import Estacionamento from "./pages/Estacionamento";
import Definicoes from "./pages/Definicoes";


const Rotas = ()=>{
    return(
        <BrowserRouter>
           <Routes>
           <Route path="/" element={<Estacionamento />}/>
           <Route path="/definicoes" element={<Definicoes />}/>
          
           </Routes>
           
        </BrowserRouter>
    )
}


export default Rotas;