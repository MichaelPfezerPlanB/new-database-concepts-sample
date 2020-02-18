import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../feed.interfaces";
import { EventEmitterService } from '../../event-emitter.service';    

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() public post: Post | null = null;

  constructor(private eventEmitterService: EventEmitterService) {
  }

  ngOnInit() {
  }

  CallFeedPageComponentLikeFunction(id:number){    
    this.eventEmitterService.onLikeButtonClick(id);    
  }    

}
