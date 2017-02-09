import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ItemsService } from '../items-list/items.service';
import {ActivatedRoute, Router} from '@angular/router';

import { BaseUrl } from '../app.constants';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  uploadImageForm:FormGroup;
  id:string;
  filesToUpload: Array<File>; 
  constructor(private fb: FormBuilder, private itemSrvc: ItemsService,route:ActivatedRoute,public router: Router) { 
    this.filesToUpload = [];
    route.queryParams.subscribe(params => {this.id = params['id'];});
    console.log("thi is id: ",this.id);
  	//this.uploadImageForm = fb.group({
  	//	img: ['', Validators.required],
  	//});
  }
  upload() {
      this.makeFileRequest(BaseUrl+"/items/upload", [], this.filesToUpload).then((result) => {
           this.router.navigate(['/items'])
      }, (error) => {
          console.error(error);
      });
  }
 
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
        console.log(this.filesToUpload);
    }
 
    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
                formData.append("userId",this.id);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }
  ngOnInit() {
  }



 
}
