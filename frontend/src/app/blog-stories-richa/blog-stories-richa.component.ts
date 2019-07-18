import { Component, OnInit } from '@angular/core';
import { storyManagementService } from '../storyManagement.service';
import { BlogmanagementService } from '../blogmanagement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-stories-richa',
  templateUrl: './blog-stories-richa.component.html',
  styleUrls: ['./blog-stories-richa.component.scss']
})
export class BlogStoriesRichaComponent implements OnInit {
  Blogs: any = [];   
  public BlogData: any = {}
  Stories: any = [];   
  public StoryData: any = {}

  constructor(private toastr: ToastrService,private storyManagementService: storyManagementService,private blogManagementService: BlogmanagementService,) { }

  ngOnInit() {
    this.storyManagementService.getApprovedStory().subscribe(storyData =>
      {
        this.Stories=storyData;
      }); 
      
      this.blogManagementService.getBlog().subscribe(blogData =>
        {
          this.Blogs=blogData;
        }); 
  }
}
