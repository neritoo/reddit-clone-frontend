import { Component, OnInit } from '@angular/core';
import { Post } from '../posts/post';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostService) {
    this.posts = [];
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getAllPosts().subscribe(response => this.posts = response)
  }

  goToPost(postId: number) {
    
  }

}
