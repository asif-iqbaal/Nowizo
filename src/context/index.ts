export interface CreateUser{
    username:string,
    email:string,
    password:string
}

export interface IUserWithPosts {
  _id: string;
  userPosts: []; 
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

export interface IUserData {
  _id:string;
  username:string;
  email:string;
  avatar?:string;
  isAdmin:boolean;
  like:number;
  displayName:string;
  followers:number;
  following:number;
  bio:string;
  posts:number;
  isVerified:boolean;
  comments:number;
  isFollowed:boolean;
  isFollowing:boolean;
  id:string
  userPosts:[{
    image:string;
    caption:string;
    _id:string;
    likes:number;
    comments:string
  }];
  userFollowers:[];
  userFollowing:[];
}

export interface IUser {
  username: string;
  displayName: string;
  avatar: string;
}

export interface IUserPosts {
  user: IUser;
  image: string;
  caption: string;
  _id: string;
  likes: number;
  comments: string;
  length:number;
}
