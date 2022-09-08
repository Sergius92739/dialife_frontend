export interface IAuthState {
  user: null | IUser,
  token: null | string,
  isLoading: boolean,
  status: null | string,
  error: Error | null,
}

export interface IUser {
  _id: string,
  username: string,
  password: string,
  isAdmin: boolean,
  posts: [],
  createdAt: string,
  updatedAt: string,
  __v: number
}

export interface IDataRegister {
  newUser: IUser,
  token: string,
  message: string,
}

export interface IDataLogin {
  user: IUser,
  token: string,
  message: string
}