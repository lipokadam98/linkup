import { UsersModule } from './users/users.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { FriendsModule } from './friends/friends.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { PostsModule } from './posts/posts.module';
import { NavbarModule } from './navbar/navbar.module';
import {StoreModule} from "@ngrx/store";
import {userReducer} from "./state/users/user.reducer";
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./state/users/user.effects";
import {authReducer} from "./state/auth/auth.reducer";
import {AuthEffects} from "./state/auth/auth.effects";
import {postReducer} from "./state/posts/post.reducer";
import {PostsEffects} from "./state/posts/post.effects";
import {NgxImageCompressService} from "ngx-image-compress";
import {LeftSideNavComponent} from "./welcome/left-side-nav/left-side-nav.component";
import {RightSideNavComponent} from "./welcome/right-side-nav/right-side-nav.component";
import {MatButtonModule} from "@angular/material/button";
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftSideNavComponent,
    RightSideNavComponent,
    WelcomeComponent,
    NotFoundComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    FriendsModule,
    UsersModule,
    PostsModule,
    StoreModule.forRoot({users: userReducer, user: authReducer, posts: postReducer}),
    EffectsModule.forRoot([UserEffects, AuthEffects, PostsEffects]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    NavbarModule,
    MatButtonModule,
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
