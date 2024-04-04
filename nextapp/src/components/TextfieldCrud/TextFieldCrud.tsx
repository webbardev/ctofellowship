import React, { useCallback, useMemo, useState } from 'react';
import '../../../styles/globals.scss';

interface ITextFieldCrud {
    changeAction: (value: string) => void;
}

export const TextFieldCrud: React.FC<ITextFieldCrud> = (props) => {
    const { changeAction } = props;

    const [value, setValue] = useState('');
    const [showValidation, setShowValidation] = useState(false);

    const [isValid, setIsValid] = useState<boolean>(true);

    const handleValidation = useCallback((valueToCheck: string) => {
        const regex = /^[a-zA-Z0-9]*$/;

        if (!regex.test(valueToCheck)) {
            setIsValid(false);
            setShowValidation(true);
        } else {
            setIsValid(true);
            setShowValidation(false);
        }
    }, []);

    const handleValueChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;

            handleValidation(newValue);
            setValue(newValue);
        },
        [handleValidation]
    );

    const submitIfValid = useCallback(() => {
        if (isValid) {
            changeAction(value);
            setValue('');
        }
    }, [changeAction, isValid, value]);

    const validationStyles = useMemo(() => {
        if (showValidation && !isValid) {
            return 'border-red-500 text-red-500';
        }

        return 'border-neutral-700 text-neutral-700';
    }, [isValid, showValidation]);

    return (
        <section className="relative grid w-full grid-cols-2 gap-2">
            <input
                className={`rounded border p-2 ${validationStyles}`}
                data-test-id="textfieldcrud-input"
                data-test-validation={isValid ? '1' : '0'}
                value={value}
                onChange={handleValueChange}
            />
            <button
                className="rounded bg-neutral-700 p-2 text-white"
                data-test-id="textfieldcrud-button"
                onClick={submitIfValid}
                disabled={!isValid}
            >
                Submit
            </button>
        </section>
    );
};
