import { useEffect, useState } from 'react';
import { Formulario } from './components/Formulario';
import { Header } from './components/Header';
import { Listado } from './components/ListadoPacientes';

function App() {
	const [pacientes, setPacientes] = useState([]);
	const [paciente, setPaciente] = useState({});
	const [rendeListo, setRendeListo] = useState(false);

	const eliminaPaciente = id => {
		const pacientesFiltrados = pacientes.filter(paciente => paciente.id !== id);
		setPacientes(pacientesFiltrados);
	};

	const obtenerLS = () => {
		const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
		setPacientes(pacientesLS);
		setRendeListo(true);
	};

	const agregaLS = () => {
		localStorage.setItem('pacientes', JSON.stringify(pacientes));
	};

	useEffect(() => {
		obtenerLS();
	}, []);

	useEffect(() => {
		if(rendeListo) agregaLS();
	}, [pacientes]);

	return (
		<div className='container mx-auto pt-20'>
			<Header />
			<div className='mt-12 md:flex'>
				<Formulario
					paciente={paciente}
					setPaciente={setPaciente}
					pacientes={pacientes}
					setPacientes={setPacientes}
				/>
				<Listado
					pacientes={pacientes}
					setPaciente={setPaciente}
					eliminaPaciente={eliminaPaciente}
				/>
			</div>
		</div>
	);
}

export default App;
