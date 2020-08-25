declare namespace Express {
  interface Request {
    token?: string;
    tokenData?: { name: string }
  }
}
