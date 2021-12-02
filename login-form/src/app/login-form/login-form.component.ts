import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent 
{
  selectedStatus : string = "";
  EMAIL = (document.querySelector("#email") as HTMLFormElement);
  PASSWORD = (document.querySelector("#password") as HTMLFormElement);

  //possible string for the page to navigate to when submit is clicked
  submittedPage = "../../userInfo.html";

  Status = ["Executive Platinum", "Platinum Pro", "Platinum"];
  
  constructor(private router: Router){}

 log(userInput : any) {console.log(userInput);}

 // clear user information once they have confirmed that they wish to clear their input
 clearConfirmation()
 {
   let confirmClear = confirm("Are you sure you want to clear all inputs?");

   if(confirmClear)
   {
     const EMAIL = (document.querySelector("#email") as HTMLFormElement);
     const PASSWORD = (document.querySelector("#password") as HTMLFormElement);
     console.log("Cleared: \n" + "\t Email: " + EMAIL['value'] + " | Password: " + PASSWORD['value'] + " | Status: " + this.selectedStatus);
     (document.getElementById('loginForm') as HTMLFormElement).reset();
   }
  }

  //naviagte to a new page that displays valid user input from the login form
 onSubmit()
 {
   this.router.navigate(['/userInfo',{queryParameter: {email : this.EMAIL, password: this.PASSWORD, status: this.selectedStatus} }])
 }

 //update value (option) selcted in drop down box <select>
 update(e: any)
 {
   this.selectedStatus = e.target.value;
   // cut out the value that gives us a number follwed by : and a space(1: )
   this.selectedStatus = this.selectedStatus.slice(3);
   console.log(this.selectedStatus);
 }

}
