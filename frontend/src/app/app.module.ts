import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// https://mdbootstrap.com/docs/angular/
import{ MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule , FormsModule  } from '@angular/forms';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { PetlistingComponent } from './petlisting/petlisting.component';
import { ProductlistingComponent } from './productlisting/productlisting.component';
import { PetProfilePageComponent } from './pet-profile-page/pet-profile-page.component';
import { WhyAdoptCatComponent } from './why-adopt-cat/why-adopt-cat.component';
import { WhyadoptdogComponent } from './whyadoptdog/whyadoptdog.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { ProfileNavComponent } from './profile-nav/profile-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {MatButtonModule, MatIconModule, MatTableModule} from '@angular/material';
import { ProfileInventoryComponent } from './profile-inventory/profile-inventory.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgxPaginationModule} from 'ngx-pagination';

import { LoginDheerajComponent } from './login-dheeraj/login-dheeraj.component';


import { ForgotComponent } from './forgot-pwd/forgot.component';

import { RegistrationAdityaComponent } from './registration-aditya/registration-aditya.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterAparnaComponent } from './register_aparna/register_aparna.component';
import { RescueComponent } from './rescue/rescue.component';

import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { ProfilePetAdsComponent } from './profile-pet-ads/profile-pet-ads.component';
import { EventListComponent } from './event-list/event-list.component';

import { ToastrModule } from 'ngx-toastr';
import {MatExpansionModule} from '@angular/material/expansion';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ProfileEventComponent } from './profile-event/profile-event.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import { EditPetsComponent } from './edit-pets/edit-pets.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import { MyAdoptionsComponent } from './my-adoptions/my-adoptions.component';
import { AdoptionRequestComponent } from './adoption-request/adoption-request.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { AdminApproveContentComponent } from './admin-approve-content/admin-approve-content.component';
import { DonateLakshmiComponent } from './donate-lakshmi/donate-lakshmi.component';
import { ChangePasswordLakshmiComponent } from './change-password-lakshmi/change-password-lakshmi.component';
import { ForgotpasswordLakshmiComponent } from './forgotpassword-lakshmi/forgotpassword-lakshmi.component';
import { HomepageSravanComponent } from './homepage-sravan/homepage-sravan.component';
import { SravanForumComponent } from './sravan-forum/sravan-forum.component';
import { SravanChangepasswordComponent } from './sravan-changepassword/sravan-changepassword.component';
import { FaqSravanComponent } from './faq-sravan/faq-sravan.component';
import { DonateSravanComponent } from './donate-sravan/donate-sravan.component';
import { ChangePasswordShehzeenComponent } from './change-password-shehzeen/change-password-shehzeen.component';
import { HomepageShehzeenComponent } from './homepage-shehzeen/homepage-shehzeen.component';
import { ProductReviewShehzeenComponent } from './product-review-shehzeen/product-review-shehzeen.component';
import { DonateShehzeenComponent } from './donate-shehzeen/donate-shehzeen.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DiscussionformsAjithComponent } from './discussionforms-ajith/discussionforms-ajith.component';
import { DonationsAjithComponent } from './donations-ajith/donations-ajith.component';
import { ShoppingcartAjithComponent } from './shoppingcart-ajith/shoppingcart-ajith.component';
import { AddStoryRichaComponent } from './add-story-richa/add-story-richa.component';
import { BlogStoriesRichaComponent } from './blog-stories-richa/blog-stories-richa.component';
import { ForgotPasswordRichaComponent } from './forgot-password-richa/forgot-password-richa.component';
import { AdoptRichaComponent } from './adopt-richa/adopt-richa.component';
import { HomeRichaComponent } from './home-richa/home-richa.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HomeOldComponent } from './home-old/home-old.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CdkTableModule } from "@angular/cdk/table";
import { SravanFeedbackComponent } from './sravan-feedback/sravan-feedback.component';
import { OrderManagmentShehzeenComponent } from './order-managment-shehzeen/order-managment-shehzeen.component';
import { ParticularOrderManageComponent } from './particular-order-manage/particular-order-manage.component';
import { MatRippleModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material'; // Added for date picker in blog module by Richa Khatri
import { AddBlogRichaComponent } from './add-blog-richa/add-blog-richa.component';

import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';




// import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    HomeComponent,
    PetlistingComponent,
    ProductlistingComponent,
    WhyAdoptCatComponent,
    ProfileHomeComponent,
    ProfileNavComponent,
    ProfileInventoryComponent,
    PetProfilePageComponent,
    WhyadoptdogComponent,
    PetProfilePageComponent,
    ProductDetailPageComponent,
    RegistrationAdityaComponent,
    FooterComponent,
    LoginDheerajComponent,
    ForgotComponent,
    EventListComponent,
    ContactComponent,
    RegisterAparnaComponent,
    RescueComponent,
    ProfilePetAdsComponent,
    EventDetailComponent,
    ProfileEventComponent,
    EditPetsComponent,
    EditInventoryComponent,
    AdoptionFormComponent,
    MyAdoptionsComponent,
    AdoptionRequestComponent,
    ConfirmationComponent,
    AdminUserManagementComponent,
    AdminApproveContentComponent,
    DonateLakshmiComponent,
    ChangePasswordLakshmiComponent,
    ForgotpasswordLakshmiComponent,
    HomepageSravanComponent,
    SravanForumComponent,
    SravanChangepasswordComponent,
    FaqSravanComponent,
    DonateSravanComponent,
    ChangePasswordShehzeenComponent,
    HomepageShehzeenComponent,
    ProductReviewShehzeenComponent,
    DonateShehzeenComponent,
    DiscussionformsAjithComponent,
    DonationsAjithComponent,
    ShoppingcartAjithComponent,
    AddStoryRichaComponent,
    BlogStoriesRichaComponent,
    ForgotPasswordRichaComponent,
    HomeRichaComponent,
    AdoptRichaComponent,
    HomeOldComponent,
    UnauthorizedComponent,
    SravanFeedbackComponent,
    OrderManagmentShehzeenComponent,
    ParticularOrderManageComponent,
    AddBlogRichaComponent,
	PaymentGatewayComponent
  ],
  imports: [
    MatProgressBarModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    MatAutocompleteModule,
    NgxPaginationModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    CdkTableModule,
    MatTableModule,
    MatRippleModule,  // Added for date picker in blog module  by Richa Khatri
    MatDatepickerModule, // Added for date picker in blog module by Richa Khatri
    MatNativeDateModule// Added for date picker in blog module by Richa Khatri
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
