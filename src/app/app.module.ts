import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { ReportComponent } from './components/report/report.component';
import { HeaderComponent } from './widgets/header/header.component';
import { SharedModule } from './shared/shared.module';
import { ProductCardComponent } from './widgets/product-card/product-card.component';
import {MatRippleModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ProfileCompleteComponent } from './components/profile-complete/profile-complete.component';
import { InterceptorProvider } from './services/interceptors/interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    AddProductComponent,
    ProductViewComponent,
    ProfileComponent,
    ProfileEditComponent,
    OrdersComponent,
    OrderItemComponent,
    ReportComponent,
    ProfileCompleteComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    NgbModule,ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: false,
      enableHtml: true,
    }),
    InfiniteScrollModule
  ],
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProvider,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
