import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  isLoading: boolean = false;
  api_url: any = 'auth/login';
  model:any = {};
  errorMsg: string = '';
  formSubmitSubscribe: any;
  logoutDataSubscribe: any;
  isLogin: boolean = false;
  get_user_dtls: any;
  userId: any;
  constructor(private authService:LoginService,private router:Router,
    private commonUtils: CommonUtils,private http : HttpClient,
    private toastrService: ToastrService) { }

  ngOnInit(){
    this.model.type = 'DESIGNER';
    this.logoutDataSubscribe = this.authService.globalparamsData.subscribe((res:any) => {
      console.log('(header)  globalparamsData res ssss >>>>>>>>>>>', res);
      if(res != null || res != undefined){
        this.get_user_dtls = res.logininfo;
        console.log('this.get_user_dtls************', this.get_user_dtls);
        // user details set
        this.router.navigateByUrl('/home');
        this.userId = this.get_user_dtls.uid;
        this.isLogin = true;
        this.commonUtils.onClicksigninCheck(res);
        // this.authService.autoLogin();
      }else{this.isLogin = false;}
    });
  }
  onSubmitSingInForm(form:NgForm){
    console.log('form >>', form.value);
    if(!form.valid){
      return;
    }
    this.isLoading = true;
    this.authenticate(form, form.value);
    // form.reset();

  }
  // authenticate function
  authenticate(_form:any, form_data:any) {
    this.isLoading = true;
    let authObs: Observable<any>;
        authObs = this.authService.login(this.api_url, form_data, '')
        this.errorMsg = '';
        this.formSubmitSubscribe = authObs.subscribe(
          (resData:any) => {
            console.log('resData ============= (sign in) ))))))))))))))>', resData);
              this.commonUtils.onClicksigninCheck(resData);

              // user details set
              this.commonUtils.onSigninUserInfo(resData);
              
              // this.toastrService.success(resData.message);
              this.isLoading = false;
              if(resData.profileStatus == "APPROVE")
              {
                this.router.navigateByUrl('/profile-complete');
              }else if(resData.profileStatus == "COMPLETED")
              {
                this.router.navigateByUrl('/home');
              }
              // this.router.navigateByUrl('/home');
              // this.router.navigateByUrl('/home');
              _form.reset();
              this.isLoading = false;
            
          },
          (errRes:any) => {
            this.isLoading = false;
            console.log("error handeller >>@@",errRes );
            
              this.toastrService.error(errRes.error.message);
          }
        );
  }
// login form submit end
  
}
