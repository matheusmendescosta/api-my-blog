export class FailUpdatePermission extends Error {
  constructor() {
    super('Failed to update user permission');
  }
}
