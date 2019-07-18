import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { storyManagementService } from '../storyManagement.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from "@angular/platform-browser";
import { AuthService } from '../auth.sevice';

@Component({
  selector: 'app-add-story-richa',
  templateUrl: './add-story-richa.component.html',
  styleUrls: ['./add-story-richa.component.scss']
})
export class AddStoryRichaComponent implements OnInit {
  currentUserId: string;
  currentUserType: string;
  currentFirstName: string;
  currentLastName: string;
  currentUser: any;
  public StoryData: any = {}

  constructor( 
    private stories: storyManagementService,
    private toastr: ToastrService,
    private titleService: Title,
    private authService: AuthService
    ){  
      this.titleService.setTitle("Stories - StraySpirit");
    }

    addStoryForm = new FormGroup({
    storyTitle: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    imageUrl: new FormControl(''),
    petCategory: new FormControl('', Validators.required)
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
  addStory(){
    if(this.currentUserType==='personal'){
      this.currentFirstName = this.currentUser["firstName"];
      this.currentLastName = this.currentUser["lastName"];
    }
    else{
      this.currentFirstName = this.currentUser["organizationtName"];
      this.currentLastName = this.currentUser["organizationtName"];
    }
     this.StoryData = {
      storyTitle: this.addStoryForm.get('storyTitle').value,
      storycontentModel: this.addStoryForm.get('content').value,
      storyPicModel: this.imageSrc,
      storyPublisher: {
        userId: this.currentUserId,
        firstName: this.currentFirstName,
        lastName: this.currentLastName
        },
        storyCategory:this.addStoryForm.get('petCategory').value
    }
    console.log(this.StoryData);
    this.stories.newStory(this.StoryData);
    this.showSuccess();
    setTimeout(()=>{  
      window.location.reload();
       }, 2000);
  }
  showSuccess() {
    this.toastr.success('Pet Story added!', 'SUCCESS!', {
      timeOut: 5500,
      closeButton: true,
      progressBar: true
    });
  }

}
