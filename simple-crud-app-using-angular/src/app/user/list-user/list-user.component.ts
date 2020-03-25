import { User } from './../../model/user.model';
import { ApiService } from './../../api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users:User[];

  constructor(private router: Router, private apiService: ApiService) { }

  deleteUser(user:User):void{
    this.apiService.deleteUser(user.id).subscribe(data=>{
      this.users = this.users.filter(el=>el!==user);
    })
  }

  editUser(user:User):void{
    window.localStorage.removeItem('editUserId');
    window.localStorage.setItem("editUserId",user.id.toString());
    this.router.navigate(['edit-user']);
  }

  addUser():void{
    this.router.navigate(['add-user']);
  }

  ngOnInit(): void {

    if(!window.localStorage.getItem('token')){
      this.router.navigate(['login']);
      return;
    }

    this.apiService.getUsers().subscribe(data=>{
      this.users = data.result;
    })
  }

}
