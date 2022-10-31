import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from './services/auth/auth.service';
import { CommonUtils } from './services/common-utils/common-utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'divatt_designer';
  logoutDataSubscribe: any;
  login: any;
  constructor(
    private activatedRoute : ActivatedRoute,
    private http : HttpClient,
    private authService : LoginService,
    
    private commonUtils: CommonUtils, // common functionlity come here
  ) {
    
    this.authService.autoLogin();
console.log("auth>>>>>>>>>",this.authService);

    // this.onSiteInformation();
    // this.initializeApp();

  }
  ngOnInit(){
    this.logoutDataSubscribe = this.authService.globalparamsData.subscribe((res:any) => {
      if(res != null || res != undefined){
        console.log("login not.....",res);
        this.login = res.uid;
      }
    });
  }

}
