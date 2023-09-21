export class UserExistsError extends Error {
  constructor() {
    super();
    this.name = 'UserExists';
    this.message = 'User with this email already exists.';
  }
}