export interface CreateUser{
    username:string,
    email:string,
    password:string
}

export interface IUserWithPosts {
  _id: string;
  userPosts: any[]; // or define properly
  userFollowers: string[];
  isFollowed?: boolean;
  // other fields you need
}

export interface IToken {
  username: string | null;
  userID: string | null;
  displayName: string | null;
  email: string | null;
}


export interface ICreatePost {
  user:string;
  image:string;
  caption:string;
}

export interface ICreateUser {
  username:string;
  email:string;
  password:string;
  displayName:string;
}

export interface ILogin {
  email:string;
  password:string;
}
