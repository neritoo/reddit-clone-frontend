import { Component, OnInit, Input } from '@angular/core';
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { Post } from '../../posts/post';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: Post;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  constructor() { }

  ngOnInit(): void {

  }

  upvotePost() {

  }

  downvotePost() {
    
  }

}
