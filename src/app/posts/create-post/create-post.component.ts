import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { PostRequest } from '../post-request';
import { Subreddit } from '../../subreddit/subreddit';
import { SubredditService } from '../../subreddit/subreddit.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  post: PostRequest;
  subreddits: Subreddit[];
  createPostForm: FormGroup;

  constructor(private postService: PostService,
              private subredditService: SubredditService,
              private router: Router,
              private fb: FormBuilder) {
                this.subreddits = [];
                this.post = new PostRequest();
              }

  ngOnInit(): void {
    this.createForm();
    this.getSubreddits();
  }

  createForm() {
    this.createPostForm = this.fb.group({
      postName: ["", Validators.required],
      url: [""],
      subredditName: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  getSubreddits() {
    this.subredditService.getAllSubreddits().subscribe(response => {
      this.subreddits = response
    }, error => {
      console.log(error);
      throwError(error);
    });
  }

  createPost() {
    this.post.postName = this.createPostForm.controls.postName.value;
    this.post.url = this.createPostForm.controls.url.value;
    this.post.subredditName = this.createPostForm.controls.subredditName.value;
    this.post.description = this.createPostForm.controls.description.value;

    this.postService.createPost(this.post).subscribe(response => {
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
      throwError(error);
    });
  }
  
  discardPost() {
    this.router.navigate(['/home']);
  }

}
