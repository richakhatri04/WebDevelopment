import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { BlogmanagementService } from '../blogmanagement.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from "@angular/platform-browser";
import { AuthService } from '../auth.sevice';

@Component({
  selector: 'app-add-blog-richa',
  templateUrl: './add-blog-richa.component.html',
  styleUrls: ['./add-blog-richa.component.scss']
})
export class AddBlogRichaComponent implements OnInit {
  currentUserId: string;
  currentUserType: string;
  currentFirstName: string;
  currentLastName: string;
  currentUser: any;
  public BlogData: any = {}

  constructor( 
    private blogs: BlogmanagementService,
    private toastr: ToastrService,
    private titleService: Title,
    private authService: AuthService
    ){  
      this.titleService.setTitle("Add Blogs - StraySpirit");
    }

    addBlogForm = new FormGroup({
    blogTitle: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    petCategory: new FormControl('', Validators.required),
    petTopic: new FormControl('', Validators.required),
    imageUrl: new FormControl(''),
    blogExpiryDate:new FormControl('')
    
  })

  ngOnInit() {
    this.currentUserId=this.authService.getUserId();
    console.log("This id has logged in: ",this.currentUserId);
    this.currentUserType = this.authService.getUserType();
    if(this.currentUserType==='personal'){
      this.authService.getUserById(this.currentUserId).subscribe(currentUserData =>{
        this.currentUser=currentUserData;
        console.log("Logged in user details:",this.currentUser);
      })
    }
    else{
      this.authService.getOrgById(this.currentUserId).subscribe(currentUserData =>{
        this.currentUser=currentUserData;
        console.log("Logged in user details:",this.currentUser);
      })
    }
  }
  private imageSrc: string = '';
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log("IMAGE URL"+this.imageSrc);
  }
  addBlogs(){
    if(this.currentUserType==='personal'){
      this.currentFirstName = this.currentUser["firstName"];
      this.currentLastName = this.currentUser["lastName"];
    }
    else{
      this.currentFirstName = this.currentUser["organizationtName"];
      this.currentLastName = this.currentUser["organizationtName"];
    }
     this.BlogData = {
      blogTitle: this.addBlogForm.get('blogTitle').value,
      contentModel: this.addBlogForm.get('content').value,
      petCategory:this.addBlogForm.get('petCategory').value,
      petTopic:this.addBlogForm.get('petTopic').value,
      blogPicModel: this.imageSrc,
      blogPostDate:new Date(),
      blogExpiryDate:this.addBlogForm.get('blogExpiryDate').value,
      blogPublisher: {
        userId: this.currentUserId,
        firstName: this.currentFirstName,
        lastName: this.currentLastName
        }
    }
    console.log(this.BlogData);
    this.blogs.newBlog(this.BlogData);
    this.showSuccess();
    setTimeout(()=>{  
      window.location.reload();
       }, 2000);
  }
  showSuccess() {
    this.toastr.success('Blog added!', 'SUCCESS!', {
      timeOut: 5500,
      closeButton: true,
      progressBar: true
    });
  }
}
