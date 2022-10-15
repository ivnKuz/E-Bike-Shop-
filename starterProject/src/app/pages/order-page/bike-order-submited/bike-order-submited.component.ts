import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-bike-order-submited',
  templateUrl: './bike-order-submited.component.html',
  styleUrls: ['./bike-order-submited.component.css']
})
export class BikeOrderSubmitedComponent implements OnInit {
  //outputing the boolean to hide this page and start over a new order
  @Output() formReseted = new EventEmitter<boolean>();

formResetClicked: boolean = false;

newOrder() {
   this.formReseted.emit(this.formResetClicked); 
}

  ngOnInit(): void {
  }
}
