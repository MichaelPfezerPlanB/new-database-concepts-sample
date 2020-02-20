import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from "../../environments/environment";
import {Post} from "./feed.interfaces";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SocketService {
  public posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  private socket: SocketIOClient.Socket = io(environment.socketHost);

  constructor() {
    this.socket.on('post', (rawPost: string) => {
      const posts = this.posts$.getValue();
      posts.unshift(JSON.parse(rawPost));
      this.posts$.next(posts);
    });
    this.socket.on('previous posts', (rawPosts: string) => {
      const posts: Post[] = JSON.parse(rawPosts);

      // Reverse the posts to have the correct chronological order (new -> old)
      this.posts$.next(posts.reverse());
    });
    this.socket.on('Hashtags', (hashtags: string) =>{
      console.log(hashtags);


      var posts: Post[] = JSON.parse(hashtags);
      posts.forEach(post => {
        console.log(post);
      });

      // hashtags.forEach(element => {
      //   var post = JSON.parse(element);
      //   console.log(post);

      //   posts.push(post);
      // });
    });
  }

  public getHashtags(hashtag: string) {
    this.socket.emit('getHashtags', hashtag);
  }

  public addPost(post: Post) {
    this.socket.emit('post', JSON.stringify(post));
  }

  public likePost(id: number) {
    this.socket.emit('like', id);
  }

  public close(): void {
    this.socket.close();
    this.posts$.complete();
  }
}
