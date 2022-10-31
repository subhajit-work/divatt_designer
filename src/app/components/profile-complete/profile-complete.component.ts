import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile-complete',
  templateUrl: './profile-complete.component.html',
  styleUrls: ['./profile-complete.component.scss']
})
export class ProfileCompleteComponent implements OnInit {
  designerId: any;
  loginDataSubscribe: any;
  get_user_dtls: any;

  constructor(private activatedRoute: ActivatedRoute,private authService:LoginService,) { }

  ngOnInit(): void {
    this.designerId = this.activatedRoute.snapshot.params['orderId'];
    this.loginDataSubscribe = this.authService.globalparamsData.subscribe((res:any) => {
      console.log('UserData', res);
      if(res != null || res != undefined){
        // this.get_user_dtls = res.logininfo;
        // console.log('this.get_user_dtls************', this.get_user_dtls);
        // user details set
        this.designerId = res.uid;
        console.log('UserData', res,this.designerId);

        // this.commonUtils.onClicksigninCheck(res);
      }
    });
  }

}
