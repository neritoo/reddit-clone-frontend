import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../posts/post';
import { Comment } from '../../comments/comment';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../posts/post.service';
import { CommentService } from '../../comments/comment.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  posts: Post[];
  comments: Comment[];
  name: string;
  postLength: number;
  commentLength: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, 
              private commentService: CommentService) {
    this.posts = [];
    this.comments = [];
  }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.params.name;
    this.getPosts();
    this.getComments();
  }

  getPosts() {
    this.postService.getAllPostsByUser(this.name).subscribe(response => {
      this.posts = response;
      this.postLength = response.length;
    }, error => {
      console.log(error);
      throwError(error);
    });
  }

  getComments() {
    this.commentService.getAllCommentsForUser(this.name).subscribe(response => {
      this.comments = response;
      this.commentLength = response.length;
    }, error => {
      console.log(error);
      throwError(error);
    });
  }

}
