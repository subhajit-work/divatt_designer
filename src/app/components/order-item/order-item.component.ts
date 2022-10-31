import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  private getOrderItemData: Subscription | undefined;
  orderItem: any = {};
  orderId: any;
  invoiceurl: string = '';
  constructor(private modalService: NgbModal,private activatedRoute: ActivatedRoute,private http:HttpClient,
    private toastrService: ToastrService,private commonUtils: CommonUtils) { }
  
  packed_done = false;
  shipped_done = false;
  delivered_done = false;
  orders_done = false;
  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.params['orderId'];
    this.invoiceurl = environment.apiUrl+"/"+"userOrder/getOrderByInvoiceId";
    this.getOrderItemdetailsdata();
  }
  orderpack_modal(content: any){
    this.modalService.open(content, { size: 'sm' });
  }
  ordershipped_modal(content: any){
    this.modalService.open(content, { size: 'sm' });
  }
  orderdeliver_modal(content: any){
    this.modalService.open(content, { size: 'sm' });
  }
  packOrder(){
    this.packed_done = true;
    this.modalService.dismissAll();
  }
  shippedOrder(){
    if(this.packed_done == true){
      this.shipped_done = true;
      this.modalService.dismissAll();
    }
  }
  deliveredOrder(){
    if(this.packed_done == true && this.shipped_done == true){
      this.delivered_done = true;
      this.modalService.dismissAll();
    }
  }
  orders_modal(content: any){
    this.modalService.open(content, { size: 'sm' });
  }
  verify_Orders(){
    this.orders_done = true;
    this.modalService.dismissAll();
  }
  message_modal(content: any){
    this.modalService.open(content, { size: 'md' });
  }
    // getOrderItemdata start
    getOrderItemdetailsdata()
    {
      
      this.getOrderItemData = this.http.get("userOrder/getOrder/"+this.orderId).subscribe(
        (res:any) => {
          this.orderItem = res;
        },
        (error:any) =>{
        })
    }
    // getDesignerProfiledata end
    // ----------- destroy unsubscription start ---------
  ngOnDestroy() {
    if(this.getOrderItemData !== undefined){
      this.getOrderItemData.unsubscribe();
    }
  }
  // ----------- destroy unsubscription end ---------
}
