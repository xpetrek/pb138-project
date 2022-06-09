import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useTranslation } from './useTranslation';

const useField = (id: string, required?: boolean, validateOn?: string) => {
	const t = useTranslation();

	const [value, setValue] = useState('');
	const [touched, setTouched] = useState(false);
	const [errMessage, setErrMessage] = useState('');

	useEffect(() => {
		validation();
	}, [value]);

	const isEmailValid = () => {
		const pattern = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
		setErrMessage('');
		if (!pattern.test(value)) setErrMessage(t('invalidEmail'));
	};

	const isPasswordValid = () => {
		setErrMessage('');
		if (value.length < 8) setErrMessage(t('passwordShort'));
	};

	const isNameValid = () => {
		if (value.length >= 3 || value.length <= 20) setErrMessage('');
		if (value.length < 3) setErrMessage(t('nameShort'));
		else if (value.length > 20) setErrMessage(t('nameLong'));
	};

	const validation = () => {
		if (validateOn === undefined) return;
		if (validateOn === 'name') isNameValid();
		if (validateOn === 'email') isEmailValid();
		if (validateOn === 'password') isPasswordValid();
	};

	const error = required && touched && (!value || errMessage !== '');

	return [
		// Current value for convenient access
		value,
		// Props for the TextField
		{
			id,
			value,
			onChange: useCallback(
				(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
					setValue(e.target.value),
				[]
			),
			onBlur: useCallback(() => {
				setTouched(true);
			}, []),
			required,
			error,
			helperText: error
				? value.length > 0
					? errMessage
					: t('required')
				: undefined
		}
	] as const;
};

export default useField;
