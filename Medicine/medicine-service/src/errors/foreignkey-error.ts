export default class ForeignKeyError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ForeignKeyError';
  }
}
