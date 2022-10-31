import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of, empty, Observable } from 'rxjs';
import { take, map, tap, delay, switchMap, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';
import { CommonUtils } from '../../services/common-utils/common-utils';
import { ToastrService } from 'ngx-toastr';
 
const API_URL = environment.apiUrl;
// const API_MASTER = environment.apiMaster;

/* tslint:disable */ 
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  current_url_path_name:any;

  // private _globalparamsData = null;
  private _globalparamsData:any = new BehaviorSubject(null);

  // get token session master as observable
  get globalparamsData(){
    return this._globalparamsData.asObservable();
  }

  // get token session master as a non observable
  public getTokenSessionMaster() {
    return this._globalparamsData.value;
  }
 
  constructor(
    private commonUtils : CommonUtils,
    private http : HttpClient,
    private router: Router,
    private location: Location,
    private toastrService: ToastrService,
  ) {
  }
 

  //----- login check for website start------
  autoLogin(){
    // console.log('Localstorage Data', JSON.parse(localStorage.getItem('divattdesignerGlobalParamsData')));
    let localStoragedata:any = localStorage.getItem('divattdesignerGlobalParamsData');
    let autologinObsData:any = JSON.parse(localStoragedata);
    this._globalparamsData.next(autologinObsData);
    // this.router.navigate(['/home']);
    return autologinObsData;
  }
  // login check for website end
  
  // ================= login service call start ==================
    login(_url:any, _data:any, _siteInfo:any) {
      return this.http.post(`${_url}`, _data).pipe(
        tap(this.setGlobalParams.bind(this)) //use for response value send
      );
    }
    // ---setGlobalParams function defination----
    private setGlobalParams(resData:any){
      console.log('..................set 11 >', resData);
      this._globalparamsData.next(
        {
          'token': resData.token,
          'username': resData.username,
          'uid': resData.uid,
          'logininfo': resData
        }
      );

      // stroage
      this.storeAuthData(resData);
    }
    //--- storeAuthData function defination---
    private storeAuthData(_data:any) {
      console.log('data>>>>>>>>>>>>>>>>>>>>>>>> s', _data);

      // set stroage data
      localStorage.setItem('divattdesignerGlobalParamsData', JSON.stringify({
        'token': _data.token,
        'username': _data.username,
        'uid': _data.uid,
        'logininfo': _data
      }));
      var x:any = localStorage.getItem('divattdesignerGlobalParamsData');

      console.log('Localstorage Data', JSON.parse(x));
      
    }
  //login service call end
// currentUserValue return value
  public get currentUserValue() {
    let localStorageData2:any = localStorage.getItem('divattdesignerGlobalParamsData');
    var currentUserSubject =  JSON.parse(localStorageData2)
    return currentUserSubject;
  }
  // currentUserValue return value
  //======================= logout functionlity start ==============
    logout() {
      localStorage.removeItem("divattdesignerGlobalParamsData");
      this._globalparamsData = new BehaviorSubject(null);
      this.commonUtils.onClicksigninCheck(null);
      this.router.navigateByUrl('/divatt-designer').then(() => {
        this.toastrService.success('Logout Successfully');
        setTimeout(() => {
          location.reload();
        }, 500);
      });
    
    }
  // logout functionlity end
 
}