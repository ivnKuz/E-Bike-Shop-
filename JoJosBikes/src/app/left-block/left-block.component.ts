import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-left-block',
  templateUrl: './left-block.component.html',
  styleUrls: ['./left-block.component.css']
})
export class LeftBlockComponent implements OnInit {
  isAdmin: boolean = false;
  isAuthorised: boolean;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    //todo, somehow make it dynamic, so links appeared and disappeared on the left side
     this.auth.isRole(this.auth.roles, 'Admin').subscribe(test =>{
      this.isAdmin = test;
    });
    this.isAuthorised = !!this.auth.roles;
  
  }
 
 

  

}
