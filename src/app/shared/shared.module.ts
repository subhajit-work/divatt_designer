import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../widgets/header/header.component';
import {MatBadgeModule} from '@angular/material/badge';
import { ProductCardComponent } from '../widgets/product-card/product-card.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ProductCardComponent,
    MatBadgeModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatMenuModule
  ]
})
export class SharedModule { }
