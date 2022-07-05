import React from 'react';
import nada from '../../assets/nada.svg'
export const NoPost = ({text}) => {
    return (
        <div className='no-post-component'>
            <div className='post-image-container'>
                <object type="image/svg+xml" data={nada}>
                    Error al cargar svg
                </object>
                <p>{text}</p>
            </div>
        </div>
    )
}
