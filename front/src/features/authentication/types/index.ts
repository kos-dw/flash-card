export type Response = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};
export type User = {
  id: string;
  username: string;
  email: string;
  jwt: string;
};

export type ResponseWithToken = {
  id: number;
  username: string;
  email: string;
};
