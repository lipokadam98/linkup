import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  getDocs,
  query,
  where
} from '@angular/fire/firestore';
import {User} from '../../shared/models/user.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataStorageService {

  private readonly usersCollection : CollectionReference;

  constructor(private readonly firestore: Firestore) {
    this.usersCollection = collection(this.firestore,'users');
  }

   async getUserById(userId: string){
    const q = query(this.usersCollection, where("userId", "==", userId));
    let user: User | undefined;

      const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            user = doc.data() as User;
      });

    return Promise.resolve(user);
  }

  getAllUsers(){
    return collectionData(this.usersCollection, {
      idField: 'id',
    }) as Observable<User[]>;
  }

  createUser(user: User){
    return addDoc(this.usersCollection,JSON.parse(JSON.stringify(user)));
  }
}
