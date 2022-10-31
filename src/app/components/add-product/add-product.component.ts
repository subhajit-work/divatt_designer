import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { HttpClient } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/auth/auth.service';
import * as moment from 'moment';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})

export class AddProductComponent implements OnInit, OnDestroy {
  
  @Output() changed = new EventEmitter<boolean>();
  private getCategoryListSubscribe: Subscription | undefined;
  private getSpecificationListSubscribe: Subscription | undefined;
  private getsubCategoryListSubscribe: Subscription | undefined;
  private getMesormentListSubscribe: Subscription | undefined;
  private getHSNListSubscribe: Subscription | undefined;
  private addProductSubcribe: Subscription | undefined;
  private getColorListSubscribe: Subscription | undefined;
  private getDesignerSubcribe: Subscription | undefined;
  loginDataSubscribe: any;
  get_user_dtls: any;
  designerid: number | undefined;
  productdtl: any = { };
  hsnData: any;
  categoryslist: any;
  catName: any;
  specificationlist: any;
  standredSOH: any = [];
  mesormentList: any = [];
  selectedList: any = [];
  subcategorylist: any;
  save_subcategorylist: any;
  editextraspecification: boolean = false;
  catname: any;
  subcatname: any;
  subcatName: any;
  HSNlist: any;
  setData: any;
  btnloader: boolean = false;
  hsnsearchlist: any;
  colourlist: any;
  active: string = "";
  uplodeimgloader:boolean=false;
  frontImage: any;
  back: any;
  side: any;
  close: any;
  neck: any;
  image6: any;
  image7: any;
  image8: any;
  giftWrap=false;
  customization=false;
  cod=false;
  allData:any = {};
  addgift=false;
  userData: any;
  extraSpecifications:any={};
  imageArray : any = [];
  index: any;
  constructor(
    private authService:LoginService,
    private commonUtils:CommonUtils,
    private router:Router,
    private http:HttpClient,
    private toastrService: ToastrService,
    config: NgbCarouselConfig
  ) { 
    config.interval = 2000;
    config.keyboard = true;
    config.wrap = true;
    config.pauseOnHover = true;
  }

  discountTypelist=[
    {id:1,name:"Flat"},
    {id:2,name:"Percentage"},
    {id:3,name:"None"}
  ]
  pricetyplist=[
    {id:1,name:"Without Tax"},
    {id:2,name:"Inclusive Tax"}
  ]
  ngOnInit() {    
    this.productdtl.discountValue = 0;
  }
  ngAfterViewInit() {
    this.commonFunction();
  }
  // commonFunction start

  commonFunction()
  {
    console.log("Add Product Page");
    this.loginDataSubscribe = this.authService.globalparamsData.subscribe((res:any) => {
      console.log('(header)  globalparamsData res ssss >>>>>>>>>>>', res);
      if(res != null || res != undefined){
        this.get_user_dtls = res.logininfo;
        console.log('this.get_user_dtls************', this.get_user_dtls);
        // user details set
        this.designerid = this.get_user_dtls.uid;
        // this.getcategoryList();
        // this.getHSNlist('');
        // this.getColorList();
        // this.getdesignerById();
        this.getDesignerProfiledata();
        this.http.get("designer/"+this.designerid).subscribe(
          (res:any) => {
            if(res.profileStatus == "COMPLETED")
              {
                this.getcategoryList();
                this.getHSNlist('');
                this.getColorList();
                this.getdesignerById();
              }else
              {
                this.router.navigateByUrl('/profile-complete');
      
              }
            
          },
          (error) =>{
            console.log("error",error);
          })
        this.commonUtils.onClicksigninCheck(res);
      }
    });
    
  }

    // getDesignerProfiledata for check perpession start
getDesignerProfiledata()
{
  // console.log("this.getDesignerProfiledata(val.uid)",this.designerId);
  
  this.http.get("designer/"+this.designerid).subscribe(
    (res:any) => {
      if(res.profileStatus == 'COMPLETED')
      {
        this.userData = res;
      }else
      {
        let pageUrl = this.router.url.split("/");
        console.log('pageUrl', pageUrl[1]);
        if(pageUrl[1] == 'add-designer-product')
        {
          this.toastrService.error('error',"Sorry ! You don't have any permission on product.");
          this.router.navigateByUrl('/error');
        }
      }
      
      
    },
    (error) =>{
      console.log("error",error);
    })
}
// getDesignerProfiledata for check perpession  end
  // getcatById start
  getdesignerById()
  {
    this.getDesignerSubcribe = this.http.get("designer/"+this.designerid).subscribe(
      (res:any) => {
        this.userData = res;
        console.log("this.userData",this.userData);
        
      },
      (error) => {
        
      }
    )
  }
  // getcatById end

   // changeDateFormat start
   changeDateFormat(identifier: any,date: any)
   {
     if(identifier == 'indealstart')
     {
       this.productdtl.indealstart= moment(date).format('YYYY/MM/DD');
       console.log(this.productdtl.indealstart,date);
       
     }else if(identifier == 'indealend')
     {
       this.productdtl.indealend= moment(date).format('YYYY/MM/DD');
       console.log(this.productdtl.indealend,date);
       
     }
   }
   // changeDateFormat end

   /*------Sale price calculation start------*/
  // oldmrp;
  // o_mrp
  salePriceCalculation(amount: any,discountType: any,mrp: any,discountValue: any,identifier: any){
    // indiaPrice start
    if(identifier == 'indiaPrice')
    {
      console.log(identifier);
      
      if(this.productdtl.indmrp)
      {

      }else 
      {
        this.productdtl.indmrp = amount;
      }
      if(!discountValue)
      {
        discountValue = 0;
      }else{
        this.productdtl.indealPriceError = false
      }
      var taxValue = this.hsnData.taxValue * this.productdtl.indmrp;
      this.productdtl.indealPrice = taxValue + this.productdtl.indmrp;
      if(this.productdtl.inddiscountType == 'Flat')
      {
          // this.productdtl.indmrp = amount;
          this.productdtl.indmrp = amount - discountValue
          taxValue = this.hsnData.taxValue * this.productdtl.indmrp;
          this.productdtl.indealPrice = taxValue + this.productdtl.indmrp;
          if(discountValue > this.productdtl.amount)
          {
            this.productdtl.indealPriceError = true
            this.productdtl.indmrp = this.productdtl.amount;
            this.productdtl.discountValue = 0;
            taxValue = this.hsnData.taxValue * this.productdtl.indmrp;
            this.productdtl.indealPrice = taxValue + this.productdtl.amount;
            console.log(this.productdtl.indealPrice,this.productdtl.discountValue,this.productdtl.indmrp);
            
          }

      }else if(this.productdtl.inddiscountType == 'Percentage')
      {
          // this.productdtl.indmrp = amount;
          this.productdtl.indmrp = amount - (amount * (discountValue/100));
          taxValue = this.hsnData.taxValue * this.productdtl.indmrp;
          this.productdtl.indealPrice = taxValue + this.productdtl.indmrp;
          if(discountValue > 100)
          {
            this.productdtl.indealPriceError = true
            this.productdtl.indmrp = this.productdtl.amount;
            this.productdtl.discountValue = 0;
            taxValue = this.hsnData.taxValue * this.productdtl.indmrp;
            this.productdtl.indealPrice = taxValue + this.productdtl.amount;
            
          }

      }else if(this.productdtl.inddiscountType == "None"){
        this.productdtl.indmrp = amount;
        taxValue = this.hsnData.taxValue * this.productdtl.indmrp;
          this.productdtl.indealPrice = taxValue + this.productdtl.indmrp;
      }
    }
    // indiaPrice  end
    // usPrice start
    else if(identifier == 'usPrice')
    {
      console.log(identifier);
      
      if(this.productdtl.usmrp)
      {

      }else 
      {
        this.productdtl.usmrp = amount;
      }
      if(!discountValue)
      {
        discountValue = 0;
      }else{
        this.productdtl.usdealPriceError = false
      }
      var taxValue = this.hsnData.taxValue * this.productdtl.usmrp;
      this.productdtl.usdealPrice = taxValue + this.productdtl.usmrp;
      if(this.productdtl.usdiscountType == 'Flat')
      {
          // this.productdtl.indmrp = amount;
          this.productdtl.usmrp = amount - discountValue
          taxValue = this.hsnData.taxValue * this.productdtl.usmrp;
          this.productdtl.usdealPrice = taxValue + this.productdtl.usmrp;
          if(discountValue > this.productdtl.usamount)
          {
            this.productdtl.usdealPriceError = true
            this.productdtl.usmrp = this.productdtl.usamount;
            this.productdtl.usdiscountValue = 0;
            taxValue = this.hsnData.taxValue * this.productdtl.usmrp;
            this.productdtl.usdealPrice = taxValue + this.productdtl.usamount;
            
          }

      }else if(this.productdtl.usdiscountType == 'Percentage')
      {
          // this.productdtl.indmrp = amount;
          this.productdtl.usmrp = amount - (amount * (discountValue/100));
          taxValue = this.hsnData.taxValue * this.productdtl.usmrp;
          this.productdtl.usdealPrice = taxValue + this.productdtl.usmrp;
          if(discountValue > 100)
          {
            this.productdtl.usdealPriceError = true
            this.productdtl.usmrp = this.productdtl.usamount;
            this.productdtl.usdiscountValue = 0;
            taxValue = this.hsnData.taxValue * this.productdtl.usmrp;
            this.productdtl.usdealPrice = taxValue + this.productdtl.usamount;
            
          }

      }else if(this.productdtl.usdiscountType == "None"){
        this.productdtl.usmrp = amount;
        taxValue = this.hsnData.taxValue * this.productdtl.usmrp;
          this.productdtl.usdealPrice = taxValue + this.productdtl.usmrp;
      }
    }
    // usPrice  end
   console.log();
   
  }
  /*Sale price calculation end*/

  ngsel(id: any)
  {
    console.log("select price type...", id);
  }

  // getcategoryList start
  getcategoryList()
  {
    console.log("get category Product Page start");
    this.getCategoryListSubscribe = this.http.get("category/getCategoryList").subscribe(
      (res:any) => {
        console.log("get category Product Page after claa api");
        console.log("res",res);
        this.categoryslist = res;
        this.toastrService.success(res.message);
      },
      (error) =>{
        this.toastrService.error(error.message);
      })
  }
  // getcategoryList end

  customization1(value: any){
    console.log("Test...");
    
    console.log("customization...", value);
  }
   //getColorList start 
   getColorList()
   {
     this.getColorListSubscribe = this.http.get("adminMData/coloreList").subscribe(
       (res:any) => {
         console.log("color list.....",res);
         this.colourlist = res;
       },
       (error) =>{
         this.toastrService.error(error.message);
       })
   }
   //getColorList end
  changeColor(value: any){
    console.log("color...", value);
    this.active = value;
  }

  categorySelected(cat_id: any, calltype: any){

    for (let i = 0; i < this.categoryslist.length; i++) {
      if(cat_id == this.categoryslist[i].id){
        this.catName = this.categoryslist[i].categoryName;
      }
    }
    console.log("category name after...",this.catName);
    console.log("category id...",cat_id);
    console.log("category value...",calltype);
    if(calltype == 'onchange')
    {
      this.productdtl.subCategoryId = null;
      this.specificationlist = null;
      this.standredSOH = [{}]
      this.mesormentList = [];
      this.selectedList = []
      this.editextraspecification = false;
      if(cat_id)
      {
        this.getSpecification(cat_id);
    
        this.getsubCategoryListSubscribe = this.http.get("subcategory/getAllSubcategory/"+cat_id).subscribe(
          (res:any) => {
            console.log("res",res);
            this.subcategorylist = res;
            console.log("subcategory list....",this.subcategorylist);
          },
          (error) =>{
            this.toastrService.error(error.message);
          })
      }
      
    }else if(calltype == 'onload')
    {
      console.log("calltype",calltype);
      if(cat_id)
      {
        this.getSpecification(cat_id);
    
        this.getsubCategoryListSubscribe = this.http.get("subcategory/getAllSubcategory/"+cat_id).subscribe(
          (res:any) => {
            console.log("res",res);
            this.subcategorylist = res;
            this.save_subcategorylist = res;
            this.getMesormentList('onload');
            
          },
          (error) =>{
            this.toastrService.error(error.message);
          })
      }
     
    }
      this.subcategorylist = [];
      this.specificationlist = null;
    
  }
  SubcatSelected(subcat_id: any, calltype: any)
  {
    for (let i = 0; i < this.categoryslist.length; i++) {
      if(subcat_id == this.subcategorylist[i].id){
        this.subcatName = this.subcategorylist[i].categoryName;
      }
    }
    this.subcatname = this.subcatName;
    this.standredSOH = [{}];
    this.mesormentList = [];
    this.selectedList = [];
    this.getMesormentList('onchange') 
  }
  // Specification get start
  getSpecification(cat_id: any){
    this.getSpecificationListSubscribe = this.http.get("specification/listOfSpecification/"+cat_id).subscribe(
      (res:any) => {
        console.log("res",res);
        this.specificationlist = res
        console.log("this.specificationlist",this.specificationlist);
        console.log("Len",this.specificationlist.name);
        
      },
      (error) =>{
        console.log("error",error);
      })
  }
  // Specification get end
  // get HSN list start
  getHSNlist(key: any)
  {
    this.getHSNListSubscribe = this.http.get("hsn/getactiveHSNList?searchKeyword="+key).subscribe(
      (res:any) => {
        console.log("res",res);
        this.HSNlist = res;
        this.hsnsearchlist = this.HSNlist;
        console.log("HSNlist...",this.HSNlist);
       
      },
      (error) =>{
        // console.log("error",error);
        // this.commonUtils.presentToast('error', error.error.message);


      })
  }
  // get HSN list end
  // hsnSelected start
  hsnSelected(hsndata: any)
  {
    console.log("hsndata",hsndata);
    
    this.hsnData = hsndata
    if(hsndata == undefined)
    {
      this.productdtl.amount = '';
      this.productdtl.indmrp = '';
      this.productdtl.indealPrice = '';
      this.productdtl.inddiscountType = 'None';
      this.productdtl.inddiscountValue = '';
    }
  }
  // hsnSelected end
  onKey(value: any) { 
    console.log("search Data...", value.value);
    this.search(value.value);
  }
  // search(value: string) { 
  //   let filter = value;
  //   for (let i = 0; i < this.HSNlist.length; i++) {
  //     return this.HSNlist[i].hsnCode.filter((filter));
  //   }
    
  // }
  search(query: string){
    console.log(query);
    
    let data=this.hsnsearchlist;
    this.HSNlist=data.filter((element: { hsnCode: string; })=> element.hsnCode.toString().indexOf(query.toString())> -1);
    console.log("this.HSNlist>>>>>>>>",this.HSNlist);
  }

  // getMesormentList start
getMesormentList(calltype: any)
{ 
  console.log("hello.... Apurba");
  
  if (calltype == 'onchange') {
    this.getMesormentListSubscribe = this.http.get("productMeasurement/view/"+this.catName+'/'+this.subcatname).subscribe(
      (res:any) => {
        console.log("res",res);
  
        this.mesormentList = res.measurementKey;
        console.log('mesormentList.....',this.mesormentList);
        
      },
      (error) =>{
        // console.log("error",error);
        this.toastrService.error(error.message);
  
      })
  }
  
  
}
// getMesormentList end

setval(data: any)
{
  this.setData=data;
}
toggleDisabled(val: any) {
  console.log("val",val,this.selectedList,this.mesormentList,this.mesormentList.length);
  var selector;
  if(val != undefined)
  {
    console.log("undefined")
    if(val != '')
    {
      for (let j = 0; j < this.mesormentList.length; j++) {
        if(this.mesormentList[j].name==val){
          if(this.mesormentList[j].disabled==true)
              this.mesormentList[j].disabled=false
              else
              this.mesormentList[j].disabled=true
        }
        if(this.mesormentList[j].name==this.setData){
          if(this.mesormentList[j].disabled==true)
              this.mesormentList[j].disabled=false
              else
              this.mesormentList[j].disabled=true
        }
    
      }
    }
  } 
  console.log("this.selectedList",selector,this.mesormentList);
  
  // const mesorment: any = this.mesormentList[1];
  // mesorment.disabled = !mesorment.disabled;
}

addImage(){

}

  /* -----------Image uploading start----------- */
  uploder = true;
  // singleFileUploadfront()
  // {
  //   this.uploder = true;
  // }
  private imageidentifier: string = '';
  

  handleInputChange(e: any, index: any) {
    this.uploder = true;
    console.log("files....",e.target.files[0]);
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    // this.imageidentifier = imageidentifier;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.uplodeimgloader = true;
    var fd = new FormData();
    console.log("fd",e);
    
    fd.append("file", e.target.files[0]); 
     
    

    this.index = this.imageArray.length;
    console.log("index Data...", this.index);
    
    // this.imageArray.push(null);
    console.log(" image Array....",this.imageArray);
    console.log("Size of image Array....",this.imageArray.length);
    
    this.productdtl.front = this.frontImage;
      console.log("this.frontImage",this.productdtl.front);
      this.http.post("admin/profile/s3/upload",fd).subscribe(
        (res:any) => {
          this.frontImage = res.path;
          // for (let i = 0; i < this.imageArray.length; i++) {
          //   if(this.imageArray[i] == index ){
          //   }
          // }
            this.uploder = false;

          this.imageArray.push({name:res.path});          
          
          // this.imageArray.push(e.target.files[0]);
          this.uploder = false;
          this.uplodeimgloader = false;
        },
        (error) =>{
          console.log("error",error);
          this.uplodeimgloader = false;
          this.toastrService.error(error.message);
          this.uploder = false;
      })
    console.log("this.productdtl",this.productdtl);
  }
  /* Image uploading end */
  
// form submit start
onSubmitProductAdd(form:NgForm)
{
  this.btnloader =true;
  console.log("this.SOH",form.value,this.standredSOH);
  // console.log("Len",this.specificationlist.name,this.specificationlist.length);
//  for (let index = 0; index < this.specificationlist.length; index++) {
//     this.extraSpecifications[this.specificationlist[index].name] = form.value[`specificationValue`+index];
//     console.log('form.value.specificationValue+index;', form.value[`specificationValue`+index]);
    
//     console.log("Len",this.specificationlist[index].name);
//   }
  // console.log("final objeect is", this.extraSpecifications); 
  
  // create small objects start
  var age = {
    min:form.value.min,
    max:form.value.max,
  }
  var indPrice = {
    dealStart:form.value.indealstart,
    dealEnd:form.value.indealend,
    mrp:form.value.indmrp,
    dealPrice:this.productdtl.indealPrice,
    discountType:form.value.inddiscountType,
    discountValue:form.value.inddiscountValue
  }

  var usPrice = {
    dealStart:form.value.usdealstart,
    dealEnd:form.value.usdealend,
    mrp:form.value.usmrp,
    dealPrice:this.productdtl.usdealPrice,
    discountType:form.value.usdiscountType,
    discountValue:form.value.usdiscountValue
  }
  var purchaseQuantity={
    purchaseMax:form.value.purchaseMax,
    purchaseMin:form.value.purchaseMin
  }
  var price ={
    indPrice:indPrice,
    usPrice:usPrice,
  }
  var giftQnty = {
    IN:form.value.inamount,
    US:form.value.usamount,
  }
  var images = this.imageArray;
 
  
  // create small objects end
 // set boolean value start
 var composition = {
    cotton:form.value.cotton,
    polystar:form.value.polystar,
  }
 var specifications = {
  productDetails:form.value.productDetails,
  fittingInformation:form.value.fittingInformation,
  Style:form.value.Style,
  composition:composition,
  washingInformation:form.value.washingInformation
 }
//  var standeredSOH = [
//   {
//     notify:form.value.notify,
//     oos:form.value.oos,
//     sizeType:form.value.sizeType,
//     soh:form.value.soh,
//   }
  
//  ]
var standeredSOH = this.standredSOH;

 
 
// set boolean value end
  // for()
  // customize for gifiwrap start and main allData object
  if(this.addgift == false)
  {
    
    this.allData = 
    {
      categoryId:form.value.categoryId,
      subCategoryId:form.value.subCategoryId,
      designerId:this.userData.designerId,
      designerName:this.userData.designerProfile.firstName1 +' '+this.userData.designerProfile.lastName1,
      colour:form.value.colour,
      price:price,
      customizationSOH:form.value.customizationSOH,
      age:age,
      gender:form.value.gender,
      customization:this.customization,
      cod:this.cod,
      giftWrap:this.giftWrap,
      purchaseQuantity:purchaseQuantity,
      priceType:form.value.priceType,
      productDescription:form.value.productDescription,
      productName:form.value.productName,
      taxInclusive:form.value.taxInclusive,
      standeredSOH:standeredSOH,
      taxPercentage:form.value.taxPercentage,
      images:images,
      extraSpecifications:this.extraSpecifications,
      specifications:specifications,
      hsnData:this.hsnData
    }
  }
  else
  {
    this.allData = 
    {
      categoryId:form.value.categoryId,
      subCategoryId:form.value.subCategoryId,
      price:price,
      age:age,
      gender:form.value.gender,
      cod:this.cod,
      colour:form.value.colour,
      customizationSOH:form.value.customizationSOH,
      customozation:this.customization,
      giftWrap:this.giftWrap,
      designerId:this.userData.designerId,
      designerName:this.userData.designerProfile.firstName1 +' '+this.userData.designerProfile.lastName1,
      purchaseQuantity:purchaseQuantity,
      giftQnty:giftQnty,
      priceType:form.value.priceType,
      productDescription:form.value.productDescription,
      productName:form.value.productName,
      taxInclusive:form.value.taxInclusive,
      taxPercentage:form.value.taxPercentage,
      images:images,
      standeredSOH:standeredSOH,
      specifications:specifications,
      extraSpecifications:this.extraSpecifications,
      hsnData:this.hsnData
    }
  }
  // ccustomize for gifiwrap end
      //  console.log("this.allData",this.allData);
      //  if(this.action == 'add')
      //  {
         
        if(form.value.giftWrap != null)
        {
          this.giftWrap = form.value.giftWrap;
        }
        if(form.value.customization != null)
        {
         this.customization = form.value.customization;
        }
        if(form.value.cod != null)
        {
         this.cod = form.value.cod;
        }
        this.addProductSubcribe = this.http.post('designerProduct/add', this.allData).subscribe((res:any) =>{
          this.btnloader = false;
          form.reset();
          this.toastrService.success(res.message);
          this.router.navigateByUrl("home");
          },error =>{
            console.log(error);
            this.btnloader = false;
            this.toastrService.error(error.message);
        })
      //  }else if(this.action == 'edit')
      //  {
      //    if(form.value.dealEnd == undefined)
      //   this.addProductSubcribe = this.http.put('designerProduct/update/'+this.id,this.allData).subscribe((res:any) =>{
      //     this.btnloader = false;
      //     // form.reset();
      //     this.commonUtils.presentToast('success', res.message);
      //     this.router.navigateByUrl("product-list");
      //     },error =>{
      //       console.log(error);
      //       this.btnloader = false;
      //       this.commonUtils.presentToast('error', error.error.message);
      //   })
      //  }
       
 
 
}
// form submit end

  // ngOnDestroy start
  ngOnDestroy() {
    if(this.getCategoryListSubscribe !== undefined){
      this.getCategoryListSubscribe.unsubscribe();
    }
    if(this.getSpecificationListSubscribe !== undefined){
      this.getSpecificationListSubscribe.unsubscribe();
    }
    if(this.getsubCategoryListSubscribe !== undefined){
      this.getsubCategoryListSubscribe.unsubscribe();
    }
    if(this.getMesormentListSubscribe !== undefined){
      this.getMesormentListSubscribe.unsubscribe();
    }
    if(this.getHSNListSubscribe !== undefined){
      this.getHSNListSubscribe.unsubscribe();
    }
    if(this.addProductSubcribe !== undefined){
      this.addProductSubcribe.unsubscribe();
    }
    if(this.getColorListSubscribe !== undefined){
      this.getColorListSubscribe.unsubscribe();
    }
    if(this.getDesignerSubcribe !== undefined){
      this.getDesignerSubcribe.unsubscribe();
    }
  }  
  // ngOnDestroy end

 

}
