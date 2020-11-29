import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public images: Array<any>;

  constructor() { }

  ngOnInit(): void {

    this.images = ['image-1', 'image-2', 'image-3', 'image-4', 'image-5', 'image-6']

  }

}
