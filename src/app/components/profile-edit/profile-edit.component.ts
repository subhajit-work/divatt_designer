import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  hide_data = false;
  private getProfileData: Subscription | undefined;
  designerid:number  | undefined ;
  modal: any = {};
  loginDataSubscribe: any;
  get_user_dtls: any;
  imageLoader: boolean = false;
  constructor(private authService:LoginService,private http:HttpClient,
    private toastrService: ToastrService,private commonUtils: CommonUtils) { }

  ngOnInit(): void {
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
  selectFile(event:any,identifire:any){
    if(event.target.files[0] != undefined)
        {
          this.imageLoader = true;
          var fd = new FormData(); 
          fd.append("file", event.target.files[0]);
          this.http.post("admin/profile/s3/upload",fd).subscribe(
            (res:any) => {
              if(identifire == 'aadharCard')
              {
                this.modal.aadharCard = res.path;
              }else{
                this.modal.panCard = res.path;
              }
              console.log(this.modal.aadharCard,this.modal.panCard);
              
            },
            (error) =>{

            })
        }
  }
  // getDesignerProfiledata start
  getDesignerProfiledata()
  {
    
    this.getProfileData = this.http.get("designer/"+this.designerid).subscribe(
      (res:any) => {
        // this.modal = res;
        this.modal = {
          firstName1:res.designerProfile.firstName1,
          firstName2:res.designerProfile.firstName2,
          lastName1:res.designerProfile.lastName1,
          lastName2:res.designerProfile.lastName2,
          email:res.designerProfile.email,
          gender:res.designerProfile.gender,
          mobileNo:res.designerProfile.mobileNo,
          dob:res.designerProfile.dob,
          displayName:res.designerProfile.displayName,
          country:res.designerProfile.country,
          state:res.designerProfile.state,
          city:res.designerProfile.city,
          altMobileNo:res.designerProfile.altMobileNo,
          profilePic:res.designerProfile.profilePic,
          designerCategory:res.designerProfile.designerCategory,
          digitalSignature:res.designerProfile.digitalSignature,
          address:res.socialProfile.address,
          description:res.socialProfile.description,
          facebookLink:res.socialProfile.facebookLink,
          instagramLink:res.socialProfile.instagramLink,
          youtubeLink:res.socialProfile.youtubeLink,
          boutiqueName:res.boutiqueProfile.boutiqueName,
          experience:res.boutiqueProfile.experience,
          firmName:res.boutiqueProfile.firmName,
          gstin:res.boutiqueProfile.gstin,
          operatingCity:res.boutiqueProfile.operatingCity,
          professionalCategory:res.boutiqueProfile.professionalCategory,
          yearOfOperation:res.boutiqueProfile.yearOfOperation,
        }
        if(res.designerPersonalInfoEntity)
        {
          this.modal.accountNumber = res.designerPersonalInfoEntity.bankDetails.accountNumber;
          this.modal.bankName = res.designerPersonalInfoEntity.bankDetails.bankName;
          this.modal.ifscCode = res.designerPersonalInfoEntity.bankDetails.ifscCode;
          this.modal.panCard = res.designerPersonalInfoEntity.designerDocuments.panCard,
          this.modal.aadharCard = res.designerPersonalInfoEntity.designerDocuments.aadharCard;
        }
        this.modal.dateOfbirth = moment(res.designerProfile.dob).format('YYYY-MM-DD');
        console.log("profiledata",this.modal);
      },
      (error:any) =>{
      })
  }
  // getDesignerProfiledata end
  // changeFateFormat start
  changeFateFormat(date:Date)
  {
    console.log(date);
    // this.modal.dob = moment(date).format('YYYY/MM/DD');
    console.log(this.modal.dob);
    
  }
  // changeFateFormat end
  onClick(_event: any){
    console.log("Slide Toggle Value", _event);
  }
  profile_edit()
  {
    this.hide_data= false;
    console.log("submit...");
    
  }

}
