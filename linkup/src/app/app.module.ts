import { PostComponent } from './posts/post/post.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FriendComponent } from './friends/friend/friend.component';
import { HttpClientModule } from '@angular/common/http';
import { LeftSideNavComponent } from './navbar/left-side-nav/left-side-nav.component';
import { RightSideNavComponent } from './navbar/right-side-nav/right-side-nav.component';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { AuthModule } from './auth/auth.module';
import { FriendsModule } from './friends/friends.module';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewPostComponent,
    WelcomeComponent,
    PostComponent,
    FriendComponent,
    LeftSideNavComponent,
    RightSideNavComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    AuthModule,
    FriendsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
