import { useState, useLayoutEffect } from 'react';

export function useLocalStorageState(key, defaultValue = '') {
	const [state, setState] = useState(() => defaultValue);
	// Runs on mount
	useLayoutEffect(() => {
		const newValue = JSON.parse(window.localStorage.getItem(key))
		if (newValue !== null) {
			setState(newValue);
		}
	}, [key]);
	// Runs when the state is changed
	useLayoutEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(state))
	}, [key, state])
	return [state, setState]
}