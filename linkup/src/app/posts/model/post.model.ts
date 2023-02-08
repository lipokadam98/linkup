export class Post{
  constructor(public message: string,public creationDate: Date, public userId: string | undefined,public image?: any, public id?: string){}
}
