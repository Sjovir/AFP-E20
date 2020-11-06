import CustomError from './custom-error';

export default class ExistsError extends CustomError {
  constructor(message?: string) {
    super('ExistsError', message);
  }
}
