import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private service:ImageService) { }

  ngOnInit(): void {
    //function to initialize ImageDetailList in the service class
    this.service.getImageDetailList();
  }

}
