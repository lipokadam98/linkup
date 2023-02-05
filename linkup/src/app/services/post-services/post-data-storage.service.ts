import {PostService} from './post.service';
import {Injectable} from '@angular/core';
import {map, Observable, take} from 'rxjs';
import {
  collectionChanges,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore
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
    private postsService: PostService,
    private store: Store<AppState>,
    private readonly firestore: Firestore) {
      this.postsCollection = collection(this.firestore,'posts');
    }

  getAllPosts(){
    collectionChanges(this.postsCollection).subscribe(()=>{
      const posts = collectionData(this.postsCollection, {
        idField: 'id',
      }) as Observable<Post[]>;

      posts.pipe(take(1)).pipe(map((posts: Post[])=>{
        return posts.sort((a: Post, b: Post) => {
          return new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();
        });

      })).subscribe(data=>{
        this.postsService.addPosts(data);
      });
    });
  }

  createPost(message: string){
    this.store.select(selectAuthUser).pipe(take(1)).subscribe( user =>{
      if(user){
        addDoc(this.postsCollection,JSON.parse(JSON.stringify(new Post(message,new Date(),user.userId)))).then();
      }
    });
  }

  deletePost(id: string | undefined){
    const postDocumentumReference = doc(this.firestore, `posts/${id}`);
    deleteDoc(postDocumentumReference).then(()=>{
      this.postsService.deletePost(id);
    });
  }
}
