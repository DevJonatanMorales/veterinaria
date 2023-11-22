import React, { useEffect, useState, useRef, useReducer } from 'react';
import { Error } from './Error';
import SimpleReactValidator from 'simple-react-validator';
import { eventAlert } from '../hook/Alerts';

export const Formulario = ({
	paciente,
	pacientes,
	setPacientes,
	setPaciente,
}) => {
	const [nombre, setNombre] = useState('');
	const [propietario, setPropietario] = useState('');
	const [identificacion, setIdentificacion] = useState('');
	const [email, setEmail] = useState('');
	const [fecha, setFecha] = useState('');
	const [sintomas, setSintomas] = useState('');
	const [error, setError] = useState(false);

	const validator = useRef(
		new SimpleReactValidator({
			locale: 'es',
			messages: {
				required: 'El campo :attribute es obligatorio.',
				alpha_space: 'El campo :attribute solo debe contener letras.',
				regex: 'El campo :attribute debe contener solo caracteres numéricos.',
				email:
					'Por favor, introduce un correo electrónico válido en el campo :attribute.',
				date: 'El campo :attribute debe ser una fecha válida.',
				min: 'La descripcion aun es muy corta.',
			},
			validators: {
				regex: {
					message: 'El campo :attribute debe contener solo numeros.',
					rule: (val, params, validator) => {
						return validator.helpers.testRegex(val, /^[0-9]{8,14}$/);
					},
					required: true,
				},
				date: {
					message: 'El campo :attribute debe ser una fecha válida.',
					rule: (val, params, validator) => {
						return validator.helpers.testRegex(val, /^\d{4}-\d{2}-\d{2}$/);
					},
					required: true,
				},
			},
			atributeNames: {
				nombre: 'Nombre',
				propietario: 'Propietario',
				identificacion: 'Identificacion',
				email: 'Email',
				fecha: 'fecha',
				sintomas: 'Sintomas',
			},
		}),
	);

	const generarId = () => {
		const random = Math.random().toString(36).substr(2);
		const date = Date.now().toString(36);

		return random + date;
	};

	const clearState = () => {
		setError(false);
		setNombre('');
		setPropietario('');
		setEmail('');
		setFecha('');
		setSintomas('');
		setIdentificacion('');
	};

	const [, forceUpdate] = useReducer(x => x + 1, 0);

	const generarPayload = () => {
		const objectPaciente = {
			nombre,
			propietario,
			identificacion,
			email,
			fecha,
			sintomas,
		};
		return objectPaciente;
	};

	const handleAgregar = () => {
		const objectPaciente = generarPayload();
		objectPaciente.id = generarId();
		setPacientes([...pacientes, objectPaciente]);
		setPaciente({});
	};

	const handleEditar = () => {
		const objectPaciente = generarPayload();
		objectPaciente.id = paciente.id;
		const pacienteActualizado = pacientes.map(pacienteState =>
			pacienteState.id === paciente.id ? objectPaciente : pacienteState,
		);
		setPacientes(pacienteActualizado);
		setPaciente({});
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (!validator.current.allValid()) {
			validator.current.showMessages();
			forceUpdate();
			setError(true);
			return;
		} else {
			setError(false);
			validator.current.hideMessages();
		}

		if (paciente.id) {
			eventAlert(
				'¿Esta seguro de editar el paciente?',
				'ADMINISTRACION',
				handleEditar,
			);
		} else {
			eventAlert(
				'¿Esta seguro de agregar el paciente?',
				'ADMINISTRACION',
				handleAgregar,
			);
		}

		clearState();
	};

	useEffect(() => {
		if (Object.keys([paciente]).length) {
			const { nombre, propietario, identificacion, email, fecha, sintomas } =
				paciente;
			setNombre(nombre);
			setPropietario(propietario);
			setEmail(email);
			setFecha(fecha);
			setIdentificacion(identificacion);
			setSintomas(sintomas);
		}
	}, [paciente]);

	return (
		<div className='md:w-1/2 lg:2/5 mx-5' onSubmit={handleSubmit}>
			<h1 className='font-black text-3xl text-center'>Seguimiento Pacientes</h1>
			<p className='text-lg mt-5 text-center mb-10'>
				Añade Paciente y{' '}
				<span className='text-indigo-600 font-bold'>Administralos</span>
			</p>

			<form className='bg-white shadow-md rounded-xl py-10 px-5 mb-10'>
				{error && <Error>TODOS LOS CAMPOS SON OBLIGATORIOS</Error>}
				<div className='mb-5'>
					<label
						className='block text-gray-700 uppercase font-bold'
						htmlFor='txtMascota'
					>
						Nombre Mascota
					</label>
					<input
						className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
						type='text'
						name='txtMascota'
						id='txtMascota'
						placeholder='Nombre de la mascota'
						value={nombre}
						onChange={e => {
							const { value } = e.target;
							setNombre(value);
						}}
					/>
					<p className='mt-1 text-red-500 font-bold'>
						{validator.current.message(
							'nombre',
							nombre,
							'required|alpha_space',
						)}
					</p>
				</div>

				<div className='mb-5'>
					<label
						className='block text-gray-700 uppercase font-bold'
						htmlFor='txtPropietario'
					>
						Nombre Propietario
					</label>
					<input
						className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
						type='text'
						name='txtPropietario'
						id='txtPropietario'
						placeholder='Nombre del propietario'
						value={propietario}
						onChange={e => {
							const { value } = e.target;
							setPropietario(value);
						}}
					/>
					<p className='mt-1 text-red-500 font-bold'>
						{validator.current.message(
							'propietario',
							propietario,
							'required|alpha_space',
						)}
					</p>
				</div>

				<div className='mb-5'>
					<label
						className='block text-gray-700 uppercase font-bold'
						htmlFor='txtPropietario'
					>
						Identificacion:
					</label>
					<input
						className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
						type='text'
						name='txtPropietario'
						id='txtPropietario'
						placeholder='Nombre del propietario'
						value={identificacion}
						onChange={e => {
							const { value } = e.target;
							setIdentificacion(value);
						}}
					/>
					<p className='mt-1 text-red-500 font-bold'>
						{validator.current.message(
							'identificacion',
							identificacion,
							'required|regex',
						)}
					</p>
				</div>

				<div className='mb-5'>
					<label
						className='block text-gray-700 uppercase font-bold'
						htmlFor='txtEmail'
					>
						Email
					</label>
					<input
						className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
						type='email'
						name='txtEmail'
						id='txtEmail'
						placeholder='Email'
						value={email}
						onChange={e => {
							const { value } = e.target;
							setEmail(value);
						}}
					/>
					<p className='mt-1 text-red-500 font-bold'>
						{validator.current.message('email', email, 'required|email')}
					</p>
				</div>

				<div className='mb-5'>
					<label
						className='block text-gray-700 uppercase font-bold'
						htmlFor='txtAlta'
					>
						Alta
					</label>
					<input
						className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
						type='date'
						name='txtAlta'
						id='txtAlta'
						placeholder='Alta'
						value={fecha}
						onChange={e => {
							const { value } = e.target;
							setFecha(value);
						}}
					/>
					<p className='mt-1 text-red-500 font-bold'>
						{validator.current.message('fecha', fecha, 'required|date')}
					</p>
				</div>

				<div className='mb-5'>
					<label
						className='block text-gray-700 uppercase font-bold'
						htmlFor='txtSintomas'
					>
						Sintomas
					</label>
					<textarea
						className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md transition-all'
						type='date'
						name='txtSintomas'
						id='txtSintomas'
						placeholder='Describe los sintomas'
						value={sintomas}
						onChange={e => {
							const { value } = e.target;
							setSintomas(value);
						}}
					/>
					<p className='mt-1 text-red-500 font-bold'>
						{validator.current.message('sintomas', sintomas, 'required|min:20')}
					</p>
				</div>

				<input
					type='submit'
					value={paciente.id ? 'EDITAR PACIENTE' : 'AGREGAR PACIENTE'}
					className='bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-700 mb-5 cursor-pointer'
				/>
			</form>
		</div>
	);
};
