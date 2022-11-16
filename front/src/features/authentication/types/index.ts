export interface Response {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
export interface User {
  id: string;
  username: string;
  email: string;
  jwt: string;
}

export interface ResponseWithToken {
  id: number;
  username: string;
  email: string;
}
