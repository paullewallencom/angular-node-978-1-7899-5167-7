import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//importing forms module to use ngForm
import { FormsModule } from '@angular/forms';
//importing app-routing.modul.ts
import { AppRoutingModule } from './app-routing.module';

//importing the Http Client Module and Http interceptors to use http client
//for making API calls and intercepting the calls
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Importing the Interceptor which will intercept each api call and attatch 
//token in header
import { HeaderInterceptor } from './interceptors/header-interceptor';
//Services
import { ApiService } from './services/api.service';

//For using ngx toastr
import { ToastrModule } from 'ngx-toastr';
//For Toastr animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//importing all the components
import { LoginComponent } from './templates/login/login.component';
import { SignupComponent } from './templates/signup/signup.component';
import { BooksComponent } from './templates/books/books.component';
import { AddBooksComponent } from './templates/add-books/add-books.component';
import { EditBooksComponent } from './templates/edit-books/edit-books.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    BooksComponent,
    AddBooksComponent,
    EditBooksComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
  },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
