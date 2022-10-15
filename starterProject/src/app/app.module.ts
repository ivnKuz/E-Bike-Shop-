import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LeftBlockComponent } from './left-block/left-block.component';
import { ProductListItemsComponent } from './productPage/product-list-items/product-list-items.component';
import { RightBlockComponent } from './right-block/right-block.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactComponent } from './pages/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './marker.service';
import { PopupService } from './popup.service';
import { BikeDataService } from './bike-data.service';
import { ProductDetailsComponent } from './productPage/product-details/product-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderFormComponent } from './pages/order-page/bike-order-form/order-form.component';
import { NewEditProductFormComponent } from './pages/new-edit-product/new-product-form/new-edit-product-form.component';
import { BikeOrderSubmitedComponent } from './pages/order-page/bike-order-submited/bike-order-submited.component';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpInComponent } from './pages/sign-up-in/sign-up-in.component'
import { MaterialModule } from './material/material.module';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { LoginAuthService } from './pages/sign-up-in/login-auth.service';
@NgModule({
  declarations: [
    AppComponent,
    LeftBlockComponent,
    ProductListItemsComponent,
    RightBlockComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    ProductDetailsComponent,
    OrderFormComponent,
    BikeOrderSubmitedComponent,
    NewEditProductFormComponent,
    SignUpInComponent,
    LoadingSpinnerComponent
  ],
  entryComponents:[SignUpInComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    MarkerService, 
    PopupService,
    BikeDataService,
    AuthService,
    LoginAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
