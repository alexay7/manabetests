function doubleDigit(num:number):string {
	if (num < 10){
		return `0${num}`;
	}

	return num.toString();
}

export function convertSecondsToTime(seconds:number):string {
	if (seconds > 3600){
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds - hours * 3600) / 60);
		const remainingSeconds = seconds - hours * 3600 - minutes * 60;
		return `${hours}:${doubleDigit(minutes)}:${doubleDigit(remainingSeconds)}`;
	}

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds - minutes * 60;

	return `${doubleDigit(minutes)}:${doubleDigit(remainingSeconds)}`;
}