export class User{

  constructor(public email: string, public userId: string, public displayName: string, private _token?: string | null, private _tokenExpirationDate?: Date | null, private creationDate? : Date){

  }

  get token(){
    //Megvizsgáljuk hogy a token lejárati dátuma nem kisebb-e mint a jelenlegi dátum
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }
    return this._token;
  }

  get expirationDate(){
    return this._tokenExpirationDate;
  }
}
