export default class ExistsError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ExistsError';
  }
}
