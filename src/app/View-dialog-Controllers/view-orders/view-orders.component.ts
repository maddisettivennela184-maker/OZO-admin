import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent {
 constructor(
    @Inject(MAT_DIALOG_DATA)
    public order: any
  ) {  console.log('DIALOG DATA =>', this.order); }

  getFormattedDate(date: string): string {

  if (!date) return '';

  return new Date(date)
    .toLocaleDateString('en-IN');

}
}
