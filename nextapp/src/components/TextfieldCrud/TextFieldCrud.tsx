import React, { useCallback, useState } from 'react';
import '../../../styles/globals.scss';

interface ITextFieldCrud {}

export const TextFieldCrud: React.FC<ITextFieldCrud> = () => {
    const [value, setValue] = useState('');

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }, []);

    const handleSubmit = useCallback(() => {}, []);

    return (
        <section className="relative grid w-full grid-cols-2 gap-2">
            <input
                className="rounded border border-neutral-700 p-2"
                data-test-id="textfieldcrud-input"
                value={value}
                onChange={handleChange}
            />
            <button
                className="rounded bg-neutral-700 p-2 text-white"
                data-test-id="textfieldcrud-button"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </section>
    );
};
