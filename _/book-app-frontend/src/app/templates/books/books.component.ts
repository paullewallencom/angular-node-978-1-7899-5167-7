import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
user_type;
booksList:any = [];

  constructor(
    private _apiService:ApiService,
    private toastr: ToastrService,
    private router:Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    this.user_type = localStorage.getItem('user_type');
    if(!token){
      this.router.navigate(['/login'])
    }
    this._apiService.getBooks().subscribe(
      data => {
        this.booksList = data['books'];
      },
      error => {
        this.toastr.error(error.error.message, "Error");
        this.router.navigate(['/login']);
      }
    )
  }

  deleteBook(id:any){
    if(this.user_type == 'admin'){
      this._apiService.delete_book(id).subscribe (
        data => {
          console.log(data);
          this.router.navigated = false;
          this.router.navigate(['/books']);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.toastr.error("You are not an Admin.", "Error");
    }
  }

  logout(id:any){
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    this.router.navigate(['/login']);
  }

}
