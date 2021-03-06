import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  public post: Post;
  public comments: Comment[];
  public commentsObservable: Observable<Comment[]>;
  newComment = false;


  constructor(private route: ActivatedRoute, private postService: PostService, private authService: AuthService) { 
    this.route.params.forEach((urlParameters) => {
      let postId = urlParameters['id'];
      this.postService.getPost(postId).subscribe((post) => {
        this.post = post;
      });
      this.postService.getComments(postId).subscribe((comments) => {
        this.comments = comments;
      });
    });
  }

  ngOnInit() {
  }

  openNewComment(){
    this.newComment = true;
  }

  closeNewComment() {
    this.newComment = false;
  }

}
