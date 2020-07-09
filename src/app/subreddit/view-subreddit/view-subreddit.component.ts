import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubredditService } from '../subreddit.service';
import { Subreddit } from '../subreddit';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit {

  subreddit: Subreddit;

  constructor(private activatedRoute: ActivatedRoute, private subredditService: SubredditService) {
    this.subreddit = new Subreddit();
  }

  ngOnInit(): void {
    let subredditId = this.activatedRoute.snapshot.params.id;
    this.getSubreddit(subredditId);
  }

  getSubreddit(id: number) {
    this.subredditService.getSubreddit(id).subscribe(response => this.subreddit = response);
  }


}
