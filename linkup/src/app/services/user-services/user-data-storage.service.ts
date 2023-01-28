import { AuthResponseData } from '../auth-services/auth.service';
import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, getDocs, limit, query, startAt, where} from '@angular/fire/firestore';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataStorageService {

  private usersCollection : CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.usersCollection = collection(this.firestore,'users');
  }

   async getAllUsers(){

    const q = query(this.usersCollection, where("userId", "==", "gDgJSdU2EsUaovu72pkgm8tARpC2"),limit(1));

    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        return doc.data() as User;
    });
  }

  createUser(data: AuthResponseData){
    return addDoc(this.usersCollection,JSON.parse(JSON.stringify(new User(data.email,data.localId,data.displayName,null,null,new Date()))));
  }
}
