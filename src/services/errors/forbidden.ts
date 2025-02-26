export class Forbidden extends Error {
  constructor() {
    super(`Forbidden: you don't have permission for that`);
  }
}
