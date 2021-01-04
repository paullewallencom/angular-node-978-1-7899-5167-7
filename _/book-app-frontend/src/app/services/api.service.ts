import { Injectable } from '@angular/core';
//importing libraries for making HTTP calls
import { HttpClient , HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }
    //for login
    login(model:any){
      return this.httpClient.post('http://127.0.0.1:3000/user/login', model);
    }

    signup(model:any){
      return this.httpClient.post('http://127.0.0.1:3000/user/signup', model);
    }

    addNewBook(model:any){
      return this.httpClient.post('http://127.0.0.1:3000/books/add-book', model);
    }

    getBooks(){
      return this.httpClient.get('http://127.0.0.1:3000/books/all-books');
    }

    delete_book(id:any){
      return this.httpClient.delete('http://127.0.0.1:3000/books/delete-book/'+id);
    }

    bookDetail(id:any){
      console.log("FE: api.service.ts call book-details id=",id)
      return this.httpClient.get('http://127.0.0.1:3000/books/book-details/'+id);
    }

    editBook(id:any, model:any){
      return this.httpClient.patch('http://127.0.0.1:3000/books/update-book/'+id, model);
    }
}
