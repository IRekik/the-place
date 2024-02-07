declare namespace Express {
  export interface Request {
    user?: User;
  }
  export interface Response {
    user?: User;
  }
}

interface User {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
}
