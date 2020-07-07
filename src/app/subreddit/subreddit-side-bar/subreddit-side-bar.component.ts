import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../subreddit.service';
import { Subreddit } from '../subreddit';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits: Subreddit[];
  displayViewAll: boolean;

  constructor(private subredditService: SubredditService) {
    this.subreddits = [];
    this.displayViewAll = false;
  }

  ngOnInit(): void {
    this.getSubreddits();
  }

  getSubreddits() {
    this.subredditService.getAllSubreddits().subscribe(subreddits => {
      if (subreddits.length >= 4) {
        this.subreddits = subreddits.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = subreddits;
      }
    });
  }

}
