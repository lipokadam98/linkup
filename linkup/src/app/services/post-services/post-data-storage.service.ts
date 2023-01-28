import { PostService } from './post.service';
import { Injectable } from '@angular/core';
import { Observable, take, map } from 'rxjs';
import { CollectionReference, DocumentData, Firestore, collectionData, deleteDoc, doc, getDoc, collectionChanges } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { AuthService } from '../auth-services/auth.service';
import { Post } from 'src/app/posts/model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostDataStorageService {

  private postsCollection : CollectionReference<DocumentData>;

  constructor(
    private postsService: PostService,
    private authService: AuthService,
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
    addDoc(this.postsCollection,JSON.parse(JSON.stringify(new Post(message,new Date(),this.authService.user.value?.userId))));
  }

  deletePost(id: string | undefined){
    const postDocumentumReference = doc(this.firestore, `posts/${id}`);
    deleteDoc(postDocumentumReference).then(()=>{
      this.postsService.deletePost(id);
    });
  }

 /* getPosts(){
    return this.httpClient.get<{[key: string]: Post}>("https://linkup-8c013-default-rtdb.europe-west1.firebasedatabase.app/posts.json?print=pretty").pipe(map(responseData => {
      const postsArray = [];
      for(const key in responseData){
       if(responseData.hasOwnProperty(key)){
         postsArray.push({...responseData[key], id: key});
       }
      }

      return postsArray as Post[];
     })).subscribe(data=>{
        this.postsService.addPosts(data);
     });
   }

   savePost(message: string){
     this.httpClient.post("https://linkup-8c013-default-rtdb.europe-west1.firebasedatabase.app/posts.json",{
       message: message,
       userName: this.authService.user.value?.displayName,
       userId: this.authService.user.value?.id
     }).subscribe( ()=>{
       this.getPosts();
     }
     );
   }*/
}
