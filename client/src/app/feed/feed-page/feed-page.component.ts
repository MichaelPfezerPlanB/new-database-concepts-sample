import {Component, OnDestroy, OnInit, ViewChild, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__, ReflectiveKey} from '@angular/core';
import {Post} from "../feed.interfaces";
import {SocketService} from "../socket.service";
import { EventEmitterService } from '../../event-emitter.service';    
import { PostComponent } from '../post/post.component';


@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss'],
  providers: [SocketService]
})
export class FeedPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public temp_posts: Post[] = [];
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

  addPost(content: string) {
    let id =1;
    let likes = null;
    let status = false;
    this.socket.addPost({id, content, likes, status});
  }

  likePost(id: number){
    if(!this.liked_posts.includes(id)){

      this.posts[id].status = false;
      this.socket.likePost(id);
      this.liked_posts.push(id);
      localStorage.setItem("heart"+id, "false");
      console.log("heart"+id);
    }
  }
}
