import {Injectable} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {
  collectionChanges,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  where
} from '@angular/fire/firestore';
import {addDoc, collection} from '@firebase/firestore';
import {Post} from 'src/app/posts/model/post.model';
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {selectAuthUser} from "../../state/auth/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class PostDataStorageService {

  private readonly postsCollection : CollectionReference;

  constructor(
    private store: Store<AppState>,
    private readonly firestore: Firestore) {
      this.postsCollection = collection(this.firestore,'posts');
    }

  getAllPosts(){
   return collectionChanges(this.postsCollection).pipe(switchMap(()=>{
     return collectionData(this.postsCollection, {
       idField: 'id',
     }) as Observable<Post[]>;
   }));
  }

  async getPostsByUserId(userId: string){
    let posts: Post[] = [];

      const q = query(this.postsCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        posts.push(doc.data() as Post);
      });

    return Promise.resolve(posts);
  }

  createPost(message: string){
   return this.store.select(selectAuthUser).pipe(switchMap(
      (user)=> addDoc(this.postsCollection,JSON.parse(JSON.stringify(new Post(message,new Date(),user?.userId))))
     )
    )
  }

  deletePost(id: string | undefined){
    const postDocumentumReference = doc(this.firestore, `posts/${id}`);
    return deleteDoc(postDocumentumReference);
  }
}
