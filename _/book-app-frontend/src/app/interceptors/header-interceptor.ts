import {Injectable} from "@angular/core";
//importing multiple libraries for interceptor
import {HttpEvent, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
//@injectable
export class HeaderInterceptor implements HttpInterceptor {
    //this function intercepts the request
    intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        //get token from local storage
        let token = localStorage.getItem('token');
        //cloning the request and adding Authorization header to it
        req = req.clone({headers:req.headers.set('Authorization', 'JWT '+token)})
        //passing the request
        return next.handle(req);
    }
}