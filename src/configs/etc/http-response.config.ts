const HttpStatus = {
	200: 'OK',
	201: 'Created',
	400: 'Bad Request',
	401: 'Unauthorized',
	403: 'Forbidden',
	404: 'Not Found',
	409: 'Conflict',
	500: 'Internal Server Error',
};

export class HttpResponse {
	statusCode: number;
	message: string;

	constructor(code: number) {
		this.statusCode = code;
		this.message = HttpStatus[code];
	}
}

export function status(code: number, extraMessage?: string): HttpResponse {
	const response = new HttpResponse(code);

	if (extraMessage) {
		response.message += `: ${extraMessage}`;
	}

	return response;
}
