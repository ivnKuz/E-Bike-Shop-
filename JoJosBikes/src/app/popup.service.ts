import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }
  //showing the shops markers on the map
  makeCapitalPopup(data: any): string { 
    return `` +
    `<div>Shop name: ${ data.name }</div>` +
    `<div>State: ${ data.state }</div>` +
    `<div>Adress: ${ data.adress }</div>`
}
  }

