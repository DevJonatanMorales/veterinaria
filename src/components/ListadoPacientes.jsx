import React from 'react';
import { Pacientes } from './Pacientes';

export const Listado = ({ pacientes, setPaciente, eliminaPaciente }) => {
	return (
		<div className='md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll'>
			{pacientes && pacientes.length ? (
				<>
					<h2 className='font-black text-3xl text-center'>Listado Pacientes</h2>
					<p className='mt-5 text-xl mb-10 text-center'>
						Administra tus {''}
						<span className='text-indigo-600 font-bold text-xl'>
							Pacientes y Citas
						</span>
					</p>
					{pacientes.map(paciente => (
						<Pacientes
							key={paciente.id}
							paciente={paciente}
							setPaciente={setPaciente}
							eliminaPaciente={eliminaPaciente}
						/>
					))}
				</>
			) : (
				<>
					<h2 className='font-black text-3xl text-center'>No Hay Pacientes</h2>
					<p className='mt-5 text-xl mb-10 text-center'>
						¡Comiensa agregando tus {''}
						<span className='text-indigo-600 font-bold text-xl'>
							Pacientes!
						</span>
					</p>
				</>
			)}
		</div>
	);
};
