export interface CreateUser{
    username:String,
    email:String,
    password:String
}

export interface IUserWithPosts {
  _id: string;
  userPosts: any[]; // or define properly
  userFollowers: string[];
  isFollowed?: boolean;
  // other fields you need
}

export interface IToken {
  username:string;
  userID:string,
  displayName:string;
  emial:string;
}

export interface ICreatePost {
  user:string;
  image:string;
  caption:string;
}