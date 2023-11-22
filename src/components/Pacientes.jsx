import React from 'react';
import { eventAlert } from '../hook/Alerts';

export const Pacientes = ({ paciente, setPaciente, eliminaPaciente }) => {
	const { id, nombre, identificacion, propietario, email, fecha, sintomas } =
		paciente;

	const handelEliminar = () => eliminaPaciente(id);
	
	const question = () => {
		eventAlert(
			`¿Estas seguro de eliminar el paciente ${nombre}?`,
			'ADMINISTRACION',
			handelEliminar
		);
	};

	return (
		<div className='mx-5 bg-white  shadow-md px-5 py-10 rounded-xl mb-10'>
			<p className='font-blod mb-3 text-gray-700 uppercase font-bold'>
				Nombre: <span className='font-normal normal-case'>{nombre}</span>
			</p>

			<p className='font-blod mb-3 text-gray-700 uppercase font-bold'>
				Propietario:{' '}
				<span className='font-normal normal-case'>{propietario}</span>
			</p>

			<p className='font-blod mb-3 text-gray-700 uppercase font-bold'>
				Identificacion:{' '}
				<span className='font-normal normal-case'>{identificacion}</span>
			</p>

			<p className='font-blod mb-3 text-gray-700 uppercase font-bold'>
				Email: <span className='font-normal normal-case'> {email} </span>
			</p>

			<p className='font-blod mb-3 text-gray-700 uppercase font-bold'>
				Fecha Alta: <span className='font-normal normal-case'>{fecha}</span>
			</p>

			<p className='font-blod mb-3 text-gray-700 uppercase font-bold'>
				Sintomas: <span className='font-normal normal-case'>{sintomas}</span>
			</p>
			<div className='flex justify-between pt-3'>
				<button
					className='py-2 px-10 bg-indigo-600  hover:bg-indigo-700 text-white rounded-md font-bold'
					onClick={() => {
						setPaciente(paciente);
					}}
					type='button'
				>
					EDITAR
				</button>
				<button
					className='py-2 px-10 bg-red-600  hover:bg-red-700 text-white rounded-md font-bold md:flex md:flex-direction'
					type='button'
					onClick={question}
				>
					ELIMINAR
				</button>
			</div>
		</div>
	);
};
