import CustomError from './custom-error';

export default class LinkedError extends CustomError {
  constructor(message?: string) {
    super('LinkedError', message);
  }
}
