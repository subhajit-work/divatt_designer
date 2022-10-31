import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { ToastrService } from 'ngx-toastr';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild(MatTabGroup)
  tabGroup!: MatTabGroup;
  hide = true;
  gender: any;
  designerProfile: any;
  data: any;
  boutiqueProfile: any;
  message2: any;
  errormsg: string | undefined;
  model: any = {};
  minDate: Date | undefined;
  maxDate: Date | undefined;
  btnloader2: boolean = false;
  constructor(
    private http : HttpClient,
    private commonUtils: CommonUtils,
    private toastrService: ToastrService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.commonFunction();
  }
  commonFunction()
  {
    const currentYear = new Date().getFullYear();
    // this.minDate = new Date(currentYear - 1, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
  }
  radioChange(e: any)
    {
      console.log(e.value);
      this.gender = e.value;
    }
  // register form start
  passwordvalid(new_password: any,conform_password: any)
  {
    console.log(new_password,conform_password);
    if (conform_password == undefined) {
      this.errormsg = '';
        
    }else if (new_password!=conform_password) {
        this.errormsg = "Password and conform password  not match.";
        setTimeout(()=>{                           // <<<---using ()=> syntax
          // this.errormsg = "";
      }, 3000);
    }else  if (new_password==conform_password)
    {
      this.errormsg = "";
    }
    else
    {
      this.errormsg = "";
    }
    
  }
  dateFormatChange(_identifier: any, event: MatDatepickerInputEvent<Date>){
    console.log('_identifier', _identifier);
    console.log('_data', event);
    
    this.model.dob = moment(event.value).format('YYYY/MM/DD');
    console.log('this.model.dob ', this.model.dob );
    
  }
  onSubmitRegForm(form: NgForm)
  {
    
    this.btnloader2 = true;
    console.log("REG-->",form.value);
     
    this.designerProfile = {
      firstName1:form.value.firstName1,
      lastName1:form.value.lastName1,
      firstName2:form.value.firstName2,
      lastName2:form.value.lastName2,
      designerName:form.value.firstName1 + ' ' + form.value.lastName1,
      email:form.value.email,
      gender:form.value.gender,
      maritalStatus:form.value.maritalStatus,
      mobileNo:form.value.mobile,
      password:form.value.password,
      dob:form.value.dob,
      altMobileNo:form.value.altmobile,
      displayName:form.value.displayName,
      qualification:form.value.qualification,
    }
    this.boutiqueProfile = {
      boutiqueName:form.value.boutiqueName,
    }
    this.data = {
      designerName:form.value.firstName1 + ' ' + form.value.lastName1,
      boutiqueProfile:this.boutiqueProfile,
      designerProfile:this.designerProfile,
    }
    this.http.post("designer/add",this.data).subscribe(
      (res:any) => {
        console.log("res",res);
        this.btnloader2 = false;
        this.toastrService.success(res.message);
        this.router.navigateByUrl('/login');
        form.reset();
        // setTimeout(() => {

          // this.tabGroup.selectedIndex = 0;
        // }, 1000);
        // setTimeout(() => {
        
        
        // },1500)
      },
      (error) =>{
        this.btnloader2 = false;
        // this.toastrService.error(error.message);
        console.log("error",error);
        this.message2 = error.error.message;
      })
  }
  // reginter form end

}
