import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HashtagComponent } from './hashtag/hashtag-page/hashtag.component';

const routes: Routes = [
  {path: '', redirectTo: '/feed', pathMatch: 'full'},
  { path: 'hashtag', component: HashtagComponent },
  {path: 'feed', loadChildren: () => import('./feed/feed.module').then(r => r.FeedModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
