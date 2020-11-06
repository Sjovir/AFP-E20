import CustomError from './custom-error';

export default class ServerInternalError extends CustomError {
  constructor() {
    super(
      'ServerInternalError',
      'An error occured inside the server. Please try again later.'
    );
  }
}
