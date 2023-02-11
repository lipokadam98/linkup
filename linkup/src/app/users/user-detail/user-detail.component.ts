import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription, take} from "rxjs";
import {User} from "../../shared/models/user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {getPostsByUserId} from "../../state/posts/post.actions";
import {selectUserPosts} from "../../state/posts/post.selectors";
import {getUserDetailById} from "../../state/users/user.actions";
import {getSelectedUser} from "../../state/users/user.selectors";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit, OnDestroy{

  public posts$ = this.store.select(selectUserPosts);
  user: User | undefined;
  userDetailSub = new Subscription();
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe( data=>{
      let id = data["id"];
      if(id){
        this.store.dispatch(getPostsByUserId({userId: id}));
        this.store.dispatch(getUserDetailById({id: id}));
      }
     }
    )

    this.userDetailSub = this.store.select(getSelectedUser).subscribe(user=>{
        this.user = user;
    });
  }

  ngOnDestroy() {
    this.userDetailSub.unsubscribe();
  }

}
