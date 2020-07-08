import { Component, OnInit, Input } from '@angular/core';
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


  @Input() posts: Array<Post>;
  faComments = faComments;

  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }

  goToPost(postId: number) {
    this.router.navigate(['view-post', postId]);
  }

  upvotePost() {

  }

  downvotePost() {

  }

}
