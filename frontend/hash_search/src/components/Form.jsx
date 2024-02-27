import React, { useState } from 'react';

const Form = ({onSubmit}) => {
    const [quantity, setQuantity] = useState('');

    const handleChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(quantity);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Quantidade de registros:
                <input 
                    type="number"
                    value={quantity}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Buscar</button>
        </form>
    );
};

export default Form;