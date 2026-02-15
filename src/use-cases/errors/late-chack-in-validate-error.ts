export class LateCheckInValidationError extends Error {
  constructor() {
    super("The check-in can only be validation between 20 after its creation.");
  }
}
