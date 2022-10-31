import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private modalService: NgbModal,) { }

  ngOnInit(): void {
  }

  pdf_modal(content: any) {
    this.modalService.open(content, { size: 'md' });
  }

}
