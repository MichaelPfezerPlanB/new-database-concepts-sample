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

  public $Post: Post;
  constructor(private eventEmitterService: EventEmitterService) {
    this.$Post = {
      id: null,
      content: "0",
      likes: null,
      status: true,
    }
  }

  ngOnInit() {
    this.setLinks();
    if (localStorage.getItem("heart"+this.post.id) == "false") {
      this.$Post.status = false;
    }
    else{
      
    }
  }

  ngAfterViewInit(){
    this.setLinks();
    if (localStorage.getItem("heart"+this.post.id) == "false") {
      this.$Post.status = false;
    }
    else{
      
    }
  }

  public setLinks(){
    var text = document.querySelectorAll(".card-body")
    
    text.forEach(element => {
      element.innerHTML = element.innerHTML.replace(/#(\w+)/g, '<a href="/hashtag?hash=$1">#$1</a>');
    });
  }

  CallFeedPageComponentLikeFunction(id:number){    
    this.eventEmitterService.onLikeButtonClick(id);
    this.$Post.status = false;    
  }    
  public changeCheck($event: any): void{
    this.$Post.status = false;
  }

}
