const throwError = (message: string): Error => {
	const err = new Error(message);
	throw err;
};

export default throwError;
