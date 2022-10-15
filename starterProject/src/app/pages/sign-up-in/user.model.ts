export class User {
    constructor(
        public email: string,
         public id: string,
          private _token?: string,
        private _tokenExpirationDate?: Date
        ){}

        get token(){
            //check if token expiration date is not expired and if that date even exists
            if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
                return null;
            }
            return this._token
        }
}