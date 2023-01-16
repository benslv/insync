export function chunk<T>(arr: T[], chunkSize: number): T[][] {
	const output = [];

	for (let i = 0; i < arr.length; i += chunkSize) {
		output.push(arr.slice(i, i + chunkSize));
	}

	return output;
}
