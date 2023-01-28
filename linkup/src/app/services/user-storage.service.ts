import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  private userCollection : CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.userCollection = collection(this.firestore,'users');
  }

  getAllUsers(){

    /*collectionChanges(this.postsCollection).subscribe(()=>{
      const posts = collectionData(this.postsCollection, {
        idField: 'id',
      }) as Observable<Post[]>;

      posts.pipe(take(1)).subscribe(data=>{
        this.postsService.addPosts(data);
      });
    });*/
  }

  createUser(message: string){
    //addDoc(this.postsCollection,JSON.parse(JSON.stringify(new User(message,new Date(),this.authService.user.value?.id))));
  }
}
