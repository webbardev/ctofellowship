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

    const handleValidationAndValueChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            // Check if input is valid
            const regex = /^[a-zA-Z0-9]*$/;

            if (!regex.test(event.target.value)) {
                setIsValid(false);
                setShowValidation(true);
            } else {
                setIsValid(true);
                setShowValidation(false);
            }

            setValue(event.target.value);
        },
        []
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
                onChange={handleValidationAndValueChange}
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
