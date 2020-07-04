import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { timeStamp } from 'console';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  register = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl('')
  });
  
  data: any = "";


  constructor(private httpClient: HttpClient) { 
    
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.data = JSON.stringify(this.register.value);
    //console.log(this.data.textcontent);
    
    //Now post the 'data'. It can be accessed as Json in backed.
    this.httpClient.post("http://localhost/Angular/php/post_detail.php", this.data)
    .subscribe(
          (val) => {
              console.log("POST call successful value returned in body.", 
                          JSON.stringify(val));
          },
          response => {
              console.log("POST call in error", response);
          },
          () => {
              console.log("The POST observable is now completed.");
          });
  }

}
