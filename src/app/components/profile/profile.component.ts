import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  show = false;
  hide_data= true;
  designerid:number  | undefined ;
  designerprofiledata: any = {};
  loginDataSubscribe: any;
  get_user_dtls: any;
  profilestatusLoader: boolean = false;
  modal: any = {};
  imageLoader: boolean = false;
  formloader: boolean = true;
  designerProfile: any;
  alldesignerProfiledata: any;
  profileupdateApi: any;
  previewimageSrc_aadher: any;
  previewimageSrc_pan: any;
  private getProfileData: Subscription | undefined;
  private changeProfileStatusSubscribe: Subscription | undefined;
  private profileupdateSubcribe: Subscription | undefined;
  
  constructor(private authService:LoginService,private modalService: NgbModal,private http:HttpClient,
    private toastrService: ToastrService,private commonUtils: CommonUtils) { }

  ngOnInit() {
    this.loginDataSubscribe = this.authService.globalparamsData.subscribe((res:any) => {
      console.log('(header)  globalparamsData res ssss >>>>>>>>>>>', res);
      if(res != null || res != undefined){
        this.get_user_dtls = res.logininfo;
        console.log('this.get_user_dtls************', this.get_user_dtls);
        // user details set
        this.designerid = this.get_user_dtls.uid;
        this.getDesignerProfiledata();
        this.commonUtils.onClicksigninCheck(res);
        this.profileupdateApi = 'designer/profile/update';
      }
    });
  }
  hide_details(){
    this.hide_data = false;
    // console.log("submit.....");
    
  }
    // getDesignerProfiledata start
    getDesignerProfiledata()
    {
      this.getProfileData = this.http.get("designer/"+this.designerid).subscribe(
        (res:any) => {
          this.designerprofiledata = res;
          this.previewimageSrc_aadher = res.designerPersonalInfoEntity.designerDocuments.aadharCard;
          this.previewimageSrc_pan = res.designerPersonalInfoEntity.designerDocuments.panCard; 
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
            accountNumber:res.designerPersonalInfoEntity.bankDetails.accountNumber,
            bankName:res.designerPersonalInfoEntity.bankDetails.bankName,
            ifscCode:res.designerPersonalInfoEntity.bankDetails.ifscCode,
          }
          console.log("designerPersonalInfoEntity.designerDocuments", res.designerPersonalInfoEntity.designerDocuments.aadharCard);
          
          this.modal.dateOfbirth = moment(res.designerProfile.dob).format('YYYY-MM-DD');
          console.log("profiledata",this.modal);
          console.log("profiledata",this.designerprofiledata);
        },

        (error:any) =>{
        })
    }
    // getDesignerProfiledata end

    // activeDesigner start
  activeDesigner(status:any)
  {
    this.changeProfileStatusSubscribe =this.http.put('designer/designerCurrentStatus/'+status,'').subscribe(
      (res:any) => {
        this.profilestatusLoader = false;
        this.toastrService.success(res.message);
        this.getDesignerProfiledata();
      },(error:any)=>{
        this.profilestatusLoader = false;
        this.toastrService.error(error.error.message);
        this.getDesignerProfiledata();
      }); 
  }

  // chooseFile
  chooseFile(_identifier: any ,image: any)
  {
    var allowedExtensions =/(\.jpg|\.jpeg|\.png)$/i;

      if(image.target.files[0] != undefined)
      {
        this.imageLoader = true;
        var fd = new FormData(); 
        fd.append("file", image.target.files[0]);
        this.http.post("admin/profile/s3/upload",fd).subscribe(
          (res:any) => {
            console.log();
            if(_identifier == 'DESIGNER')
            {
              this.designerprofiledata.designerProfile.profilePic = res.path;
              // this.uplodeProfilepicDesigner()
            }
            this.imageLoader = false;
          },
          (error) =>{
            console.log("error",error);
            
          })
      }
    // }
    // console.log('image',image.target.files[0]);
    
  }
  // chooseFile

  selectFile(event:any,identifire:any){
    if(event.target.files[0] != undefined)
        {
          this.imageLoader = true;
          var fd = new FormData(); 
          fd.append("file", event.target.files[0]);
          this.http.post("admin/profile/s3/upload",fd).subscribe(
            (res:any) => {
              console.log("file data.....", res);
              
              if(identifire == 'aadharCard')
              {
                // this.modal.aadharCard = res.path;
                // this.modal.aadharCard = res.fileName;
                this.previewimageSrc_aadher = res.path;
                // this.designerprofiledata.aadharCard = res.path;
              }else{
                // this.modal.panCard = res.fileName;
                // this.modal.panCard = res.path;
                this.previewimageSrc_pan = res.path;
              }
              console.log('Aadhar card and pancard',this.modal.aadharCard,this.modal.panCard);
              
            },
            (error) =>{

            })
        }
  }
  // changeFateFormat start
  changeFateFormat(date:Date)
  {
    console.log(date);
    // this.modal.dob = moment(date).format('YYYY/MM/DD');
    console.log(this.modal.dob);
    
  }
  // changeFateFormat end
  onClick(_event: any, identifier: any){
    console.log("Slide Toggle Value", _event.checked);
    console.log("Slide Toggle Value....", identifier);
    
  }
  // profile_edit()
  // {
  //   this.hide_data= false;
  //   console.log("submit...");
    
  // }
  onSubmitProfile(form:NgForm){
    console.log(form);

    this.formloader = true;
    var boutiqueProfile = {
      boutiqueName:form.value.boutiqueName,
      experience:form.value.experience,
      firmName:form.value.firmName,
      gstin:form.value.gstin,
      operatingCity:form.value.operatingCity,
      professionalCategory:form.value.professionalCategory,
      yearOfOperation:form.value.yearOfOperation,
    }
    this.designerProfile;
   
    if(form.value.dob == undefined)
    {
      // this.designerProfile = {
      //   dob:
      // }
      var dob =moment(this.designerprofiledata.dob).format('YYYY/MM/DD');
    }
    else
    {
      // this.designerProfile = {
      //   dob:form.value.dob,
        
      // }
      dob = form.value.dob;
    }
    this.designerProfile = {
      altMobileNo:form.value.altMobileNo,
      profilePic:form.value.profilePic,
      displayName:form.value.displayName,
      email:this.designerprofiledata.email,
      password:this.designerprofiledata.password,
      firstName1:form.value.firstName1,
      firstName2:form.value.firstName2,
      gender:form.value.gender,
      lastName1:form.value.lastName1,
      lastName2:form.value.lastName2,
      maritalStatus:form.value.maritalStatus,
      mobileNo:form.value.mobileNo,
      qualification:form.value.qualification,
      dob:dob,
      country:form.value.country,
      state:form.value.state,
      city:form.value.city,

  }
    var socialProfile= {
      achievements: form.value.achievements,
      address: form.value.address,
      description: form.value.description,
      facebookLink: form.value.facebookLink,
      instagramLink: form.value.instagramLink,
      youtubeLink:form.value.youtubeLink,
    }
    
    var designerPersonalInfoEntity = {
      designerId:this.designerprofiledata.designerId,
      bankDetails : {
        accountNumber:form.value.accountNumber,
        bankName:form.value.bankName,
        ifscCode:form.value.ifscCode
      },
      designerDocuments:{
        aadharCard:this.previewimageSrc_aadher,
        panCard:this.previewimageSrc_pan,
        // void_check:form.value.void_check
      }
    }
    this.alldesignerProfiledata = {
      boutiqueProfile:boutiqueProfile,
      designerProfile:this.designerProfile,
      socialProfile:socialProfile,
      designerPersonalInfoEntity:designerPersonalInfoEntity,
      email:this.designerprofiledata.email,
      password:this.designerprofiledata.password,
      designerId:this.designerprofiledata.designerId,
      designerName:this.designerprofiledata.firstName1 +' '+ this.designerprofiledata.lastName1
    }
    
    // this.allProfiledata = form.value
    console.log("this.designerprofiledata",this.alldesignerProfiledata);
    
    console.log(form.value);
   this.profileupdateSubcribe =  this.http.put(this.profileupdateApi,this.alldesignerProfiledata).subscribe((res:any) =>{
    this.formloader = false; 
      this.toastrService.success(res.message);
      },error =>{
        this.formloader = false;
        console.log("error",error);
        this.toastrService.success(error.message);
        
        // recall category list
    })
    
  }

  // activeDesigner end
      // ----------- destroy unsubscription start ---------
  ngOnDestroy() {
    if(this.loginDataSubscribe !== undefined){
      this.loginDataSubscribe.unsubscribe();
    }
    if(this.getProfileData !== undefined){
      this.getProfileData.unsubscribe();
    }
    if(this.changeProfileStatusSubscribe !== undefined){
      this.changeProfileStatusSubscribe.unsubscribe();
    }
    if(this.profileupdateSubcribe !== undefined){
      this.profileupdateSubcribe.unsubscribe();
    }
  }
  // ----------- destroy unsubscription end ---------
}
