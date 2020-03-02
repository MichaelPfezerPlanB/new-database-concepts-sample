import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {Post} from "../hashtag.interfaces";
import { EventEmitterService } from '../../event-emitter.service';    

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input() public post: Post | null = null;

  constructor(private eventEmitterService: EventEmitterService) {
  }

  ngOnInit() {
    this.setLinks();
  }

  ngAfterViewInit(){
    this.setLinks();
  }

  public setLinks(){
    var text = document.querySelectorAll(".card-body")
    
    text.forEach(element => {
      element.innerHTML = element.innerHTML.replace(/#(\w+)/g, '<a href="/hashtag?hash=$1">#$1</a>');
    });
  }

  CallFeedPageComponentLikeFunction(id:number){    
    this.eventEmitterService.onLikeButtonClick(id);    
  }    

}
