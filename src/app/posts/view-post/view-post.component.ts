import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Post } from '../post';
import { PostService } from '../post.service';
import { throwError } from 'rxjs';
import { Comment } from '../../comments/comment';
import { CommentService } from '../../comments/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: Post;
  commentForm: FormGroup;
  comment: Comment;
  comments: Comment[];

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private fb: FormBuilder,private commentService: CommentService) {
    this.post = new Post();
    this.comment = new Comment();
    this.comments = [];
  }

  ngOnInit(): void {
    this.createCommentForm();
    this.postId = this.activatedRoute.snapshot.params.id;
    this.getPost();
    this.getCommentsForPost();
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe(response => {
      this.post = response;
    }, error => {
      console.log(error);
      throwError(error);
    });
  }

  createCommentForm() {
    this.commentForm = this.fb.group({
      text: ["", Validators.required]
    });
  }

  postComment() {
    this.comment.postId = this.postId;
    this.comment.text = this.commentForm.controls.text.value;

    this.commentService.postComment(this.comment).subscribe(response => {
      this.commentForm.reset();
      this.getCommentsForPost();
    }, error => {
      console.log(error);
      throwError(error);
    });
  }

  getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(response => {
      this.comments = response;
    }, error => {
      console.log(error);
      throwError(error);
    });
  }

}
