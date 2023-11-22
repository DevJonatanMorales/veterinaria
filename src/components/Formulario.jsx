import React, { useEffect, useState } from 'react';
import { Error } from './Error';

export const Formulario = ({paciente, pacientes, setPacientes, setPaciente}) => {
	const [nombre, setNombre] = useState('');
	const [propietario, setPropietario] = useState('');
	const [email, setEmail] = useState('');
	const [fecha, setFecha] = useState('');
	const [sintomas, setSintomas] = useState('');
	const [error, setError] = useState(false)

	const generarId = () => {
		const random = Math.random().toString(36).substr(2)
		const date = Date.now().toString(36)

		return random + date
	}
	
	const clearState = () => {
		setError(false)
		setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if ([nombre, propietario, email, fecha, sintomas].includes('')) {
			setError(true)
			return
		} 
		
		setError(false)
		const objectPaciente = {
			nombre,
      propietario,
      email,
      fecha,
      sintomas,
		}

		if(paciente.id){
			objectPaciente.id = paciente.id
			const pacienteActualizado = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objectPaciente : pacienteState)
			setPacientes(pacienteActualizado)
			setPaciente({})
		} else {
			objectPaciente.id = generarId()
			setPacientes([...pacientes, objectPaciente])
			setPaciente({})
		}

		clearState()
	}

	useEffect(() => {
		if(Object.keys([paciente]).length){
			const { nombre, propietario, email, fecha, sintomas } = paciente
			setNombre(nombre)
			setPropietario(propietario)
			setEmail(email)
			setFecha(fecha)
			setSintomas(sintomas)
		}
	}, [paciente])

	return (
		<div className='md:w-1/2 lg:2/5 mx-5' onSubmit={handleSubmit} >
			<h1 className='font-black text-3xl text-center'>Seguimiento Pacientes</h1>
			<p className='text-lg mt-5 text-center mb-10'>
				Añade Paciente y{' '}
				<span className='text-indigo-600 font-bold'>Administralos</span>
			</p>

			<form className='bg-white shadow-md rounded-xl py-10 px-5 mb-10'>
				{error && (
					<Error>TODOS LOS CAMPOS SON OBLIGATORIOS</Error>
				)}
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
