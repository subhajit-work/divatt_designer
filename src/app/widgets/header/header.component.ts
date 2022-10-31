import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'common-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  designerid: any;
  disabled: boolean = true;
  loginDataSubscribe: any;
  get_user_dtls: any;

  constructor(
    private router: Router,
    private authService: LoginService,private http:HttpClient,
  ) { }
  openleftnav: boolean = false;
  ngOnInit() {
    this.loginDataSubscribe = this.authService.globalparamsData.subscribe((res:any) => {
      console.log('(header)  globalparamsData res ssss >>>>>>>>>>>', res);
      if(res != null || res != undefined){
        console.log('this.get_user_dtls************', this.get_user_dtls);
        // user details set
        // this.designerid = this.get_user_dtls.uid;
        this.http.get("designer/"+res.uid).subscribe(
          (res:any) => {
            if(res.profileStatus == "COMPLETED")
            {
              this.disabled = false;
            }
            else
            {
              this.disabled = true;
            }
          },
          (error:any) =>{
          })
      }
    });
  }
  logOutUser(){
    this.authService.logout();
  }
  clickUrl(url:any){
    this.router.navigate([url]);
  }
  // clickBox(){
  //   this.router.navigate(['/order-list']);
  // }
  // clickProfile(){
  //   this.router.navigate(['/profile']);
  // }
  openNav(){
    this.openleftnav = !this.openleftnav;
  }
  closeNav(){
    
  }
}
