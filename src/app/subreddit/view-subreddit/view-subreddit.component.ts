import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubredditService } from '../subreddit.service';
import { Subreddit } from '../subreddit';
import { Post } from '../../posts/post';
import { PostService } from '../../posts/post.service';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit {

  subreddit: Subreddit;
  posts: Post[];

  constructor(private activatedRoute: ActivatedRoute,
              private subredditService: SubredditService,
              private postService: PostService) {
    this.subreddit = new Subreddit();
    this.posts = [];
  }

  ngOnInit(): void {
    let subredditId = this.activatedRoute.snapshot.params.id;
    this.getSubreddit(subredditId);
    this.getPostsForSubreddit(subredditId);
  }

  getSubreddit(id: number) {
    this.subredditService.getSubreddit(id).subscribe(response => this.subreddit = response);
  }

  getPostsForSubreddit(id: number) {
    this.postService.getAllPostsBySubreddit(id).subscribe(response => this.posts = response);
  }


}
