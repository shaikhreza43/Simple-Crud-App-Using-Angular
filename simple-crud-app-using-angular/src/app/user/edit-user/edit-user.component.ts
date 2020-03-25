import { ApiService } from './../../api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../model/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user:User;
  editForm:FormGroup;


  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  onSubmit(){
    this.apiService.updateUser(this.editForm.value).pipe().subscribe(data=>{
      if(data.status===200){
        alert('User updated successfully.');
        this.router.navigate(['list-user']);
      }else {
        alert(data.message);
      }
    },error=>{
      alert(error);
    });
  }



  ngOnInit(): void {

    let userId = window.localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });
    this.apiService.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data.result);
      });

  }

}
