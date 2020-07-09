import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxWebstorageModule } from "ngx-webstorage";
import { ToastrModule } from "ngx-toastr";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EditorModule } from "@tinymce/tinymce-angular";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './token.interceptor';
import { PostCardComponent } from './posts/post-card/post-card.component';
import { VoteButtonComponent } from './votes/vote-button/vote-button.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SubredditSideBarComponent } from './subreddit/subreddit-side-bar/subreddit-side-bar.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { ListSubredditsComponent } from './subreddit/list-subreddits/list-subreddits.component';
import { ViewPostComponent } from './posts/view-post/view-post.component';
import { CommentsComponent } from './comments/comments.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { ViewSubredditComponent } from './subreddit/view-subreddit/view-subreddit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostCardComponent,
    VoteButtonComponent,
    SideBarComponent,
    SubredditSideBarComponent,
    CreateSubredditComponent,
    CreatePostComponent,
    ListSubredditsComponent,
    ViewPostComponent,
    CommentsComponent,
    UserProfileComponent,
    ViewSubredditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
