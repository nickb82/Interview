import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userEmail : string = "";
  userPassword : string = "";
  userStatus : string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.queryParams.subscribe(data => {
      this.userEmail = data['email'];
      this.userPassword = data['password'];
      this.userStatus = data['status']
    })
  }

}
