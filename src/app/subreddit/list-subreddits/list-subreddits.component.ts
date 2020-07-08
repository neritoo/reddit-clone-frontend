import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../subreddit.service';
import { Subreddit } from '../subreddit';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subreddits: Subreddit[];

  constructor(private subredditService: SubredditService) {
    this.subreddits = [];
  }

  ngOnInit(): void {
    this.getSubreddits();
  }

  getSubreddits() {
    this.subredditService.getAllSubreddits().subscribe(response => {
      this.subreddits = response;

    }, error => {
      console.log(error);
      throwError(error);
    });
  }

}
