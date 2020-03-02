import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {Post} from "../feed.interfaces";
import { EventEmitterService } from '../../event-emitter.service';
import { StringDecoder } from 'string_decoder';
import { utf8Encode } from '@angular/compiler/src/util';
import { encode, decode } from 'punycode';
import { HtmlParser, getHtmlTagDefinition } from '@angular/compiler';
import { ɵescapeHtml } from '@angular/platform-browser';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

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


}
  CallFeedPageComponentLikeFunction(id:number){
    this.eventEmitterService.onLikeButtonClick(id);
  }
}
