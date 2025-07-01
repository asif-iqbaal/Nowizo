export interface CreateUser{
    username:String,
    email:String,
    password:String
}

export interface IUserWithPosts {
  _id: String;
  userPosts: any[]; // or define properly
  userFollowers: String[];
  isFollowed?: boolean;
  // other fields you need
}

export interface IToken {
  username:String;
  userID:String,
  displayName:String;
  emial:String;
}

export interface ICreatePost {
  user:String;
  image:String;
  caption:String;
}