import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { SubredditService } from '../subreddit.service';
import { Subreddit } from '../subreddit';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  createSubredditForm: FormGroup;
  subreddit: Subreddit;

  constructor(private fb: FormBuilder,
      private subredditService: SubredditService,
      private router: Router) {
    this.subreddit = new Subreddit();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.createSubredditForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required]
    })
  }

  discard() {
    this.router.navigate(['/home']);
  }

  createSubreddit() {
    this.subreddit.name = this.createSubredditForm.controls.title.value;
    this.subreddit.description = this.createSubredditForm.controls.description.value;

    this.subredditService.createSubreddit(this.subreddit).subscribe(response => {
      this.router.navigate(['list-subreddits']);
    }, error => {
      console.log('Error al crear subreddit');
      throwError(error);
    });
  }

}
