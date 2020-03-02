import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {FeedPageComponent} from './feed-page/feed-page.component';
import {RouterModule} from "@angular/router";
import {PostComponent} from './post/post.component';
import { HashtagComponent } from './hashtag-page/hashtag.component';

@NgModule({
  declarations: [HashtagComponent, PostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HashtagComponent}
    ]),
  ]
})
export class HashtagModule {
}
