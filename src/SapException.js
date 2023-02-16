export default class SapException extends Error {
  constructor(message, input, output) {
    super(message);
    this.input = input;
    this.output = output;
  }
}
