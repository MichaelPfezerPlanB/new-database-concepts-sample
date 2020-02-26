import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { EventEmitterService } from './event-emitter.service';
import { HashtagComponent } from './hashtag/hashtag-page/hashtag.component';
import { HashtagModule } from './hashtag/hashtag.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HashtagModule
  ],
  providers: [EventEmitterService],
  bootstrap: [AppComponent],
  schemas: [HashtagComponent]
})
export class AppModule {
}
