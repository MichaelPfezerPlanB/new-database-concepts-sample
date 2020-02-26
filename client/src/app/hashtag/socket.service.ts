import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from "../../environments/environment";
import {Post} from "./hashtag.interfaces";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SocketService {
  public posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  public hashtags$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
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
    this.socket.on('Hashtags', (hashtagsServer: string) =>{
      //hier kommt das Ergebnis vom Server, wenn 'getHashtags' aufgerufen wurde
      var hashtags = this.hashtags$.getValue();
      hashtags = JSON.parse(hashtagsServer);

      console.log("server:");
      console.log(hashtagsServer);

      console.log("Array$:");
      console.log(this.hashtags$);
      
      //Ergebnis von JSON in Post-Objekte konvertieren
      this.hashtags$.next(hashtags);

      //Alle Ergebnise in Console ausgeben
      // this.hashtags$.forEach(post => {
      //   console.log(post);
      // });
    });
  }

  public getHashtags(hashtag: string) {
    //ruft die Methode auf dem Server(index.js) auf
    this.socket.emit('getHashtags', hashtag);

  
    return this.hashtags$;


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
