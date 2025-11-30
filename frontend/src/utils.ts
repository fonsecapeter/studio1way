class InvariantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvariantError";
  }
}

export const invariant = (expectation: boolean, msg: string) => {
  if (!expectation) {
    throw new InvariantError(msg);
  }
};
