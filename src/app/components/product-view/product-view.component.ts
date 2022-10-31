import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  productId: any;
  productDataSubscribe: any;
  productDetail: any = {};
  private getProfileData: Subscription | undefined;
  designerid:number  | undefined;
  loginDataSubscribe: any;
  get_user_dtls: any;
  designerprofiledata: any = {};
  sizeactive: any;
  coloractive: any;
  constructor( private activatedRoute: ActivatedRoute,private http:HttpClient,
    private authService: LoginService,private toastrService: ToastrService,private commonUtils: CommonUtils) { }
  
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.getProductdetails();
    this.loginDataSubscribe = this.authService.globalparamsData.subscribe((res:any) => {
      console.log('(header)  globalparamsData res ssss >>>>>>>>>>>', res);
      if(res != null || res != undefined){
        this.get_user_dtls = res.logininfo;
        console.log('this.get_user_dtls************', this.get_user_dtls);
        // user details set
        this.designerid = this.get_user_dtls.uid;
        this.getDesignerProfiledata();
        this.commonUtils.onClicksigninCheck(res);
      }
    });
  }
  // getProductdetails start
  getProductdetails()
  {
    this.productDataSubscribe = this.http.get('user/view/'+this.productId).subscribe(
      (response:any) => {
        console.log("response",response);
        this.productDetail = response;
        
      },
      errRes => {
        console.log("error handeller >>@@",errRes );
        
      }
    );
  }
  // getProductdetails end
  // activeSize start
  activeSize(type:any,name:any)
  {
    if(type == 'size')
    {
      this.sizeactive = name;
    }
    else if(type == 'color')
    {
      this.coloractive = name;
    }
  }
  // activeSize end
   // getDesignerProfiledata start
   getDesignerProfiledata()
   {
     
     this.getProfileData = this.http.get("designer/"+this.designerid).subscribe(
       (res:any) => {
         this.designerprofiledata = res;
       },
       (error:any) =>{
       })
   }
   // getDesignerProfiledata end
}