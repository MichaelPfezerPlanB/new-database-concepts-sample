import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../feed.interfaces";
import {SocketService} from "../socket.service";
import { EventEmitterService } from '../../event-emitter.service';    

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss'],
  providers: [SocketService]
})
export class FeedPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];

  constructor(private socket: SocketService, private eventEmitterService: EventEmitterService) {
  }

  ngOnInit(): void {
    this.socket.posts$.subscribe(posts => this.posts = posts);

    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFeedPageComponentFunction.subscribe((id:number) => {    
        this.likePost(id);    
      });    
    }    
  }

  ngOnDestroy(): void {
    this.socket.close();
  }

  addPost(content: string) {
    let id =1;
    let likes = 0;

    this.socket.addPost({id, content, likes});
  }

  likePost(id: number){
    console.log(id);
    this.socket.likePost(id);
  }
}
