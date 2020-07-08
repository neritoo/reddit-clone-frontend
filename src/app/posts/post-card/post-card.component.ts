import { Component, OnInit } from '@angular/core';
import { faComments } from "@fortawesome/free-solid-svg-icons";

import { PostService } from '../post.service';
import { Post } from '../post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {


  posts: Array<Post>;
  faComments = faComments;

  constructor(private postService: PostService, private router: Router) {
    this.posts = [];
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getAllPosts().subscribe(response => this.posts = response)
  }

  goToPost(postId: number) {
    this.router.navigate(['view-post', postId]);
  }

  upvotePost() {

  }

  downvotePost() {

  }

}
