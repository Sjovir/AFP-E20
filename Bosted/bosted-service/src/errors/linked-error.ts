export default class LinkedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'LinkedError';
  }
}
