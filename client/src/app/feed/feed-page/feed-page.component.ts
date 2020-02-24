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
  public liked_posts: number[] =[];

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

  getHashtagsTest(){
    //Methoden aufruf in socket.service.ts
    this.socket.getHashtags("test");
  }

  addPost(content: string) {
    let id =1;
    let likes = 0;
  }

  likePost(id: number){
    if(!this.liked_posts.includes(id)){
      console.log(id);

      this.socket.likePost(id);
      this.liked_posts.push(id);
      
      
    }
  }
  
}
