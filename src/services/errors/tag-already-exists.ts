export class TagAlreadyExists extends Error {
    constructor() {
      super('Tag already exists');
    }
  }
  