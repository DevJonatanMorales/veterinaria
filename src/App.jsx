import { Formulario } from './components/Formulario';
import { Header } from './components/Header';
import { Listado } from './components/ListadoPacientes';

function App() {
	return <div className='container mx-auto mt-20' >
    <Header />
    <Formulario />
    <Listado />
  </div>;
}

export default App;
