import { Component, OnInit, Input } from '@angular/core';
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { Post } from '../../posts/post';
import { AuthService } from '../../auth/services/auth.service';
import { PostService } from '../../posts/post.service';
import { VoteService } from '../vote.service';
import { Vote } from '../vote';
import { VoteType } from '../vote-type';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: Post;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  voteRequest: Vote;

  constructor(private authService: AuthService,
              private postService: PostService,
              private voteService: VoteService,
              private toastr: ToastrService) {
    this.voteRequest = new Vote();
  }

  ngOnInit(): void {

  }

  upvotePost() {
    this.voteRequest.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downvotePost() {
    this.voteRequest.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  vote() {
    this.voteRequest.postId = this.post.id;

    this.voteService.vote(this.voteRequest).subscribe(response => {
      this.updateDetails();
      this.toastr.success(response.message);
    }, error => {
      if (error.status === 403) {
        this.toastr.error('Para votar debes estar logueado!');
        throwError(error);
        return;
      }
      this.toastr.error(error.error.error);
      throwError(error);
    });
  }

  updateDetails() {
    this.postService.getPost(this.post.id).subscribe(post => this.post = post);
  }

}
