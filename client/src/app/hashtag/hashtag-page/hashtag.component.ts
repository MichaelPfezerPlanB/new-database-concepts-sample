import {Component, OnDestroy, OnInit, Input} from '@angular/core';
 import {Post} from "../hashtag.interfaces";
 import {SocketService} from "../socket.service";
 import { EventEmitterService } from '../../event-emitter.service';    


@Component({ 
    selector: 'hashtag-feed-page',
    templateUrl: 'hashtag.component.html', 
    styleUrls: ['hashtag.component.scss'],
    providers: [SocketService]
})
export class HashtagComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public liked_posts: number[] =[];
  
  constructor(private socket: SocketService, private eventEmitterService: EventEmitterService) {
  }

  ngOnInit(): void {
    //Lade Hashtags
    this.socket.hashtags$.subscribe(posts => this.posts = posts);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const hashtag = urlParams.get('hash');

    this.socket.getHashtags(hashtag);
    
    console.log("Post amount in component: " + this.posts.length);
    this.posts.forEach(element => {
      console.log(element.content);
    });

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
    if(!this.liked_posts.includes(id)){
      console.log(id);

      this.socket.likePost(id);
      this.liked_posts.push(id);
    }
  }
}
