import React from 'react';

export const Error = ({children}) => {
	return (
		<div className='bg-red-500 text-white text-center font-bold p-3 mb-3 rounded-md'>
			<p>{children}</p>
		</div>
	);
};
