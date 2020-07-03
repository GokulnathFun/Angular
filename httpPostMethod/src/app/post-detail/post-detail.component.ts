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
    
    //formGroup creates instances, which can't be converted to JSON. For that..
    //creating JSON structure with variable(data, access formControl values from it)..
    this.data = {
      "firstName": this.register.get('firstName').value,
      "lastName": this.register.get('lastName').value,
      "age": this.register.get('age').value
    }
    
    //Now convert the 'data' to json string with adding of textcontent..
    //textcontent gives the strings of every data present in 'data'...
    this.data.textcontent = JSON.stringify(this.data);
    console.log(this.data.textcontent);
    
    //Now post the textcontent in 'data'. It can be accessed as Json in backed.
    this.httpClient.post("http://localhost/Angular/php/post_detail.php", this.data.textcontent)
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

  // this.http.post("/courses/-KgVwECOnlc-LHb_B0cQ.json",
  // {
  //     "courseListIcon": "...",
  //     "description": "TEST",
  //     "iconUrl": "..",
  //     "longDescription": "...",
  //     "url": "new-url"
  // })
  // .subscribe(
  //     (val) => {
  //         console.log("POST call successful value returned in body", 
  //                     val);
  //     },
  //     response => {
  //         console.log("POST call in error", response);
  //     },
  //     () => {
  //         console.log("The POST observable is now completed.");
  //     });
}
