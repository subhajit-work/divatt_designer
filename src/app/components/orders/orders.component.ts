import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  tab: any = 'New';
  active_class = false;
  productsList: any=[];
  pageNo: any = 0;
  searchTerm: any = '';
  get_user_dtls: any;
  designerid: any;
  isListLoading: boolean  = false;
  allCounts:any= {};
  noProductFound: boolean = false;
  nomoreProductFound: boolean = false;
  lemit:any = 11;
  constructor(
    private authService:LoginService,
    private modalService: NgbModal,
    private http:HttpClient,
    private toastrService: ToastrService,
    private commonUtils: CommonUtils,private router:Router
    ) { }

    private loginDataSubscribe: Subscription | undefined;
    private tableListSubscribe: Subscription | undefined;
    
  // startDate = new Date()
  // endDate = new Date()
  
  ngOnInit(){
    this.tab = 'New';
    this.loginDataSubscribe = this.authService.globalparamsData.subscribe((res:any) => {
      console.log('(header)  globalparamsData res ssss >>>>>>>>>>>', res);
      if(res != null || res != undefined){
        this.get_user_dtls = res.logininfo;
        console.log('this.get_user_dtls************', this.get_user_dtls);
        // user details set
        this.designerid = this.get_user_dtls.uid;
        this.http.get("designer/"+this.designerid).subscribe(
          (res:any) => {
            if(res.profileStatus == "COMPLETED")
            {
                this.onListDate();
            }
            else
            {
              this.router.navigateByUrl('/profile-complete');
            }
          },
          (error:any) =>{
          })
        this.commonUtils.onClicksigninCheck(res);
      }
    });
    
  }
  ngAfterViewInit() {
    this.tab = 'New';
    console.log("First call.....");
    
  }

  custom_modal(content: any){
    this.modalService.open(content, { size: 'xl' });
  }

  // on tab change
  onClick(type:any,check: any) {
    console.log(check);
   this.productsList = [];
   this.pageNo = 0;
  if(type == 'dropdown')
  {
    this.tab = check.target.value;
  }else{
    this.tab = check;
  }
 this.onListDate();
}
 // Searching start
 searchingData(e:any)
 {
   this.productsList = [];
   this.pageNo = 0;
   console.log(e.target.value);
   this.searchTerm = e.target.value;
   this.onListDate();
 }
 // Searching end
//  orderlist data
 onListDate()
  {
    this.isListLoading = true;
    var api = 'userOrder/list/'+this.designerid+'?orderItemStatus='+this.tab+'&page='+this.pageNo+'&limit='+this.lemit+'&sortName=productId&sort=DESC&keyword='+this.searchTerm;
    // var api = 'designerProduct/designerProductList/'+this.designerid+'?status='+this.tab+'&page='+ 0 +'&limit='+ 10 +'&sortName='+this.sortColumnName+'&sort='+this.sortOrderName+'&keyword='+this.searchTerm;
    this.tableListSubscribe = this.http.get(api).subscribe(
      (res:any) => {
        this.allCounts = {
          new:res.New,
          packed:res.Packed,
          shipped:res.Shipped,
          delivered:res.Delivered,
          return:res.Return,
          orders:res.Active
        }
        console.log("get order list....", res);
        this.productsList = [];
        for (let index = 0; index < res.data.length; index++) {
          for (let j = 0; j < res.data[index].OrderSKUDetails.length; j++) {
            this.productsList.push(res.data[index].OrderSKUDetails[j]);  
          }
            
        }
        console.log("productsList...",this.productsList);
        
        if(!this.productsList.length){ this.noProductFound = true; }
        else{ this.noProductFound = false; }
        
        if(this.productsList.length > 0 && res.data.length == 0)
        {
          this.nomoreProductFound = true;
        }
        else{
          this.nomoreProductFound = false;
        }
        this.isListLoading = false;
      },
      (errRes:any) => {
        this.toastrService.error(errRes.error.message);
        this.isListLoading = false;
      }
    );
  }

// orderlist data
  
//  scrolling data
posts:any = ' '.repeat(100).split('').map((s, i) => i + 1)
 onScroll() {
  const length = this.posts.length;
  const p = ' '.repeat(100).split('').map((s, i) => i + 1 + length);
    this.pageNo = this.pageNo  + 1;
    // this.onListDate();
    // This approach should be used to avoid creating another memory address to the array
    while(p.length) this.posts.push(p.shift())    
}
//  scrolling data

  active(){
    this.active_class = !this.active_class;
    console.log("hello22222.....", this.active_class);
  }
  clear(){
    this.active_class = false;
    console.log("hello.....", this.active_class);
  }

   // ngOnDestroy start
   ngOnDestroy() {
    if(this.loginDataSubscribe !== undefined){
      this.loginDataSubscribe.unsubscribe();
    }
    if(this.tableListSubscribe !== undefined){
      this.tableListSubscribe.unsubscribe();
    }
  }  
  // ngOnDestroy end
}
