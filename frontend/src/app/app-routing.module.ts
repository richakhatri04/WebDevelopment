import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { PetlistingComponent } from './petlisting/petlisting.component';
import { ProductlistingComponent } from './productlisting/productlisting.component';

import { PetProfilePageComponent } from './pet-profile-page/pet-profile-page.component';
import { WhyAdoptCatComponent } from './why-adopt-cat/why-adopt-cat.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { ProfileInventoryComponent } from './profile-inventory/profile-inventory.component';
import { ProfileNavComponent } from './profile-nav/profile-nav.component';
import {ProductDetailPageComponent} from './product-detail-page/product-detail-page.component';
import { WhyadoptdogComponent } from './whyadoptdog/whyadoptdog.component';
import { ContactComponent } from './contact/contact.component';
import { SravanFeedbackComponent } from './sravan-feedback/sravan-feedback.component';


import { DonateLakshmiComponent } from './donate-lakshmi/donate-lakshmi.component';

import { LoginDheerajComponent } from './login-dheeraj/login-dheeraj.component';
import { ParticularOrderManageComponent } from './particular-order-manage/particular-order-manage.component';



import { ForgotComponent} from './forgot-pwd/forgot.component';
import {RegistrationAdityaComponent} from './registration-aditya/registration-aditya.component';
import { RegisterAparnaComponent } from './register_aparna/register_aparna.component';
import { RescueComponent } from './rescue/rescue.component';
import { AuthGuard } from './auth.guard';
import { ProfilePetAdsComponent } from './profile-pet-ads/profile-pet-ads.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ProfileEventComponent } from './profile-event/profile-event.component';
import { EditPetsComponent } from './edit-pets/edit-pets.component';
import { EventListComponent } from './event-list/event-list.component';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import { MyAdoptionsComponent } from './my-adoptions/my-adoptions.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { AdoptionRequestComponent } from './adoption-request/adoption-request.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';

import { AdminUserManagementComponent} from "./admin-user-management/admin-user-management.component";
import { AdminApproveContentComponent} from "./admin-approve-content/admin-approve-content.component";
import { ChangePasswordLakshmiComponent } from './change-password-lakshmi/change-password-lakshmi.component';
import { ForgotpasswordLakshmiComponent } from './forgotpassword-lakshmi/forgotpassword-lakshmi.component';
import { HomeRichaComponent } from './home-richa/home-richa.component';
import { ForgotPasswordRichaComponent } from './forgot-password-richa/forgot-password-richa.component';
import { BlogStoriesRichaComponent } from './blog-stories-richa/blog-stories-richa.component';
import { AddStoryRichaComponent } from './add-story-richa/add-story-richa.component';
import { AdoptRichaComponent } from './adopt-richa/adopt-richa.component';
import { HomepageSravanComponent } from './homepage-sravan/homepage-sravan.component';
import { SravanForumComponent } from './sravan-forum/sravan-forum.component';
import { FaqSravanComponent } from './faq-sravan/faq-sravan.component';
import { DonateSravanComponent } from './donate-sravan/donate-sravan.component';
import { ChangePasswordShehzeenComponent } from './change-password-shehzeen/change-password-shehzeen.component';
import { DonateShehzeenComponent } from './donate-shehzeen/donate-shehzeen.component';
import { HomepageShehzeenComponent } from './homepage-shehzeen/homepage-shehzeen.component';
import { ProductReviewShehzeenComponent } from './product-review-shehzeen/product-review-shehzeen.component';
import { DonationsAjithComponent } from './donations-ajith/donations-ajith.component';
import { ShoppingcartAjithComponent } from './shoppingcart-ajith/shoppingcart-ajith.component';
import { DiscussionformsAjithComponent } from './discussionforms-ajith/discussionforms-ajith.component';
import { SravanChangepasswordComponent } from './sravan-changepassword/sravan-changepassword.component';
import { SuperAdminGuard } from "./super-admin.guard";
import { AdminGuard } from "./admin.guard";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { OrderManagmentShehzeenComponent } from './order-managment-shehzeen/order-managment-shehzeen.component';
import { AddBlogRichaComponent } from './add-blog-richa/add-blog-richa.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pets', component:  PetlistingComponent },
  { path: 'shop', component: ProductlistingComponent },
  { path: 'pet-profile/:id',component: PetProfilePageComponent},
  { path:'why-adopt-cat' ,component:WhyAdoptCatComponent},
  { path: 'why-adopt-dog',component:WhyadoptdogComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'register-aparna', component: RegisterAparnaComponent },
  { path: 'event-list', component: EventListComponent },
  {path: 'myorders', component : ParticularOrderManageComponent},

  { path: 'login-Dheeraj',component:LoginDheerajComponent},
  { path: 'rescue', component: RescueComponent },


  {path: 'forgot-pwd',component:ForgotComponent},
  {path: 'updateOrderManagment/:id',component:OrderManagmentShehzeenComponent},


  {path:'confirmation/:token',component:ConfirmationComponent},
  {path:'event-detail/:id',component:EventDetailComponent},
  {path:'adopt/:id',component:AdoptionFormComponent, canActivate:[AuthGuard]},

  {path: 'forgot-pwd',component:ForgotComponent},

//New Routes
  {path:'forgotpassword',component:ForgotPasswordRichaComponent},
  {path:'blogs',component:BlogStoriesRichaComponent},
  {path:'home-richa',component:HomeRichaComponent},
  {path:'change-password',component:SravanChangepasswordComponent},
  {path:'home-sraven',component:HomepageSravanComponent},
  {path:'forums',component:SravanForumComponent},
  {path:'faq',component:FaqSravanComponent},
  {path:'donate',component:DonateShehzeenComponent},
  {path:'product-detail/:id',component:ProductReviewShehzeenComponent},
  {path:'cart',component:ShoppingcartAjithComponent},
  { path: 'user_management', canActivate: [SuperAdminGuard], component: AdminUserManagementComponent },
  { path: 'approve_content', canActivate: [AdminGuard], component: AdminApproveContentComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'feedback', component: SravanFeedbackComponent },
  { path: 'payment_gateway', component: PaymentGatewayComponent},

  // Implemented nested routes https://angular-2-training-book.rangle.io/handout/routing/child_routes.html
  { path:'profile',
    component:ProfileNavComponent,
     canActivate:[AuthGuard],
    children: [
      { path: '', component: ProfileHomeComponent },
      { path: 'inventory', component: ProfileInventoryComponent },
      { path: 'my-pet-ads', component: ProfilePetAdsComponent },
      { path: 'my-events', component: ProfileEventComponent },
      { path: 'edit-pet/:id', component: EditPetsComponent },
      {path: 'edit-inventory/:id', component: EditInventoryComponent},
      { path: 'my-adoptions', component: MyAdoptionsComponent },
      { path: 'adoption-request/:id', component: AdoptionRequestComponent },
      {  path:'addstory',component:AddStoryRichaComponent},
      {path:'addblog', component:AddBlogRichaComponent},
      { path: 'approve_content', component: AdminApproveContentComponent }, // new route
    ]
  },
  {path:'product/:id',component:ProductReviewShehzeenComponent},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
