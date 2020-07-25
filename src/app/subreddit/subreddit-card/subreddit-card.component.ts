import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../subreddit.service';
import { Subreddit } from '../subreddit';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subreddit-card',
  templateUrl: './subreddit-card.component.html',
  styleUrls: ['./subreddit-card.component.css']
})
export class SubredditCardComponent implements OnInit {

  subreddit: Subreddit;

  constructor(private subredditService: SubredditService, private activatedRoute: ActivatedRoute) {
    this.subreddit = new Subreddit();
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.getSubreddit(id);
  }

  getSubreddit(subredditId: number) {
    this.subredditService.getSubreddit(subredditId).subscribe( resp => this.subreddit = resp);
  }

}
