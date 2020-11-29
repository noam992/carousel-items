import { ScreenSizeService } from './../../../services/screen-size.service';
import { Component, ElementRef, Input, ViewChild, OnInit, ɵConsole } from '@angular/core';

@Component({
  selector: 'app-carousel-slider',
  templateUrl: './carousel-slider.component.html',
  styleUrls: ['./carousel-slider.component.css']
})
export class CarouselSliderComponent implements OnInit {

  @Input() public itemsArr: Array<any>;

  
  // Url to Image folder
  public imgURL = `./assets/images/carousel-img/`

  @ViewChild('carouselSlide') public carouselSlide:ElementRef;
  @ViewChild('carouselImg') public carouselImg:ElementRef;
  public counter = 1;
  public size: number;
  public distance: number;
  public lengthItemsArr: number;
  public itemNumOnScreen: number;
  public numOfRepeats: number;
  public distanceForRepeats: number;
  public isNotLimitCounter: boolean;

  // Screen size
  public screenSize: string;
  public imageWidth: number;
  public imageContainerWidth: number;
  public imageHeight: number; 


  constructor(private myScreenSizeService: ScreenSizeService) { }

  ngOnInit(): void {

    // Defined origin length's array
    this.lengthItemsArr = this.itemsArr.length;

    // Get current screen size
    this.screenSize = this.myScreenSizeService.currentSize

    // Subscribe to streaming update of screen size, update changes 
    this.myScreenSizeService.sizeScreenCalled$.subscribe(whichSizeIs => {
      if (this.screenSize !== whichSizeIs){
        
        // Get screen size into local variable
        this.screenSize = whichSizeIs;
        
        // Effect on image width and height
        this.heightAndWidthImage(whichSizeIs);
      }
    });

  }

  // Get size of images and initialize the carousel from the 2nd image
  public onLoadImages(){

    // Any call to current function when length of array isn't original length is reject
    if(this.isNotLimitCounter || this.lengthItemsArr !== this.itemsArr.length) return;

    // Define variable
    this.numOfRepeats = Math.floor(this.lengthItemsArr / this.itemNumOnScreen);
    this.distance = (this.lengthItemsArr - 1) - this.itemNumOnScreen;
    this.distanceForRepeats = (this.lengthItemsArr) % this.itemNumOnScreen;

    // Start with from 2nd image
    this.size = (this.carouselImg.nativeElement as HTMLImageElement).clientWidth;
    this.carouselSlide.nativeElement.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
    
  }


  // Click on next button
  public nextBtn(){
    if (this.counter >= (this.lengthItemsArr+1)) return;

    this.carouselSlide.nativeElement.style.transition = "transform 0.4s ease-in-out";
    this.counter++;
    this.carouselSlide.nativeElement.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
  }

  // Click on previous button
  public prevBtn(){
    if (this.counter <= 0) return;

    this.carouselSlide.nativeElement.style.transition = "transform 0.4s ease-in-out";
    this.counter--;
    this.carouselSlide.nativeElement.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
  }

  // Check Last item on transition action
  // Execute a loop when it gets to the end
  transitionEnd(e: Event){

    // How many times the num items on screen is divided by the length array
    this.numOfRepeats = this.counter >= this.numOfRepeats+1 ? 0 : 
                        this.counter === (this.numOfRepeats) ? 1 : this.numOfRepeats;
    
    // Action on next btn
    if (this.numOfRepeats <= 1 && this.counter > 1 ) this.handleTransitionNextBtn();

    // Action on previous btn
    if (this.counter === 0 || this.counter === 1 ) this.handleTransitionPreBtn();

  }

  // Handle repeat loop items for next button 
  public handleTransitionNextBtn(){

    this.isNotLimitCounter = this.counter === this.lengthItemsArr+1 ? false : true;

    // Refresh to the first items array
    if (!this.isNotLimitCounter) {
    
      // Return to first image without the transition effect
      this.carouselSlide.nativeElement.style.transition = "none";

      // Return to first item and get original array
      this.itemsArr = this.itemsArr.slice(0, this.lengthItemsArr);
      this.counter = 1;
      this.carouselSlide.nativeElement.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
      this.onLoadImages(); 
    }
    else {

      // Duplicate array times two
      if (this.itemsArr.length >= this.lengthItemsArr * 2 ) return;
      for (let i = 0; i < this.lengthItemsArr; i++) {
        this.itemsArr.push(this.itemsArr[i])
      }

    }   
  }

  // Handle repeat loop items for previous button 
  public handleTransitionPreBtn(){

    this.isNotLimitCounter = this.counter === 1 ? false : true;

    // Refresh to the first items array
    if (!this.isNotLimitCounter) {
      
      // Return to first image without the transition effect
      this.carouselSlide.nativeElement.style.transition = "none";

      // Return to first item and get original array
      this.itemsArr = this.itemsArr.slice(0, this.lengthItemsArr);
      this.counter = 1;
      this.carouselSlide.nativeElement.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
      this.onLoadImages(); 
    }
    else {

      // Duplicate array times two
      for (let i = 0; i < this.lengthItemsArr; i++) {
        this.itemsArr.push(this.itemsArr[i])
      }

      // Return to first image without the transition effect
      this.carouselSlide.nativeElement.style.transition = "none";
      this.counter = this.lengthItemsArr;
      this.carouselSlide.nativeElement.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';

    }
  }

  // Defined images size according to screen size
  public heightAndWidthImage(screenSize: string){

    const imageSize = this.size ? this.size : 305;
    
    // Initialize variable
    this.counter = 1;
    this.carouselSlide.nativeElement.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
    this.isNotLimitCounter = false;
    this.onLoadImages()

    switch (screenSize) {
      case 'xs':
        
        this.itemNumOnScreen = 1

        this.imageWidth = 300;
        this.imageHeight = 170;
        this.imageContainerWidth = imageSize * this.itemNumOnScreen;
        break;

      case 'sm':

        this.itemNumOnScreen = 2

        this.imageWidth = 300;
        this.imageHeight = 170;
        this.imageContainerWidth = imageSize * this.itemNumOnScreen;
        break;

      case 'md':

        this.itemNumOnScreen = 3

        this.imageWidth = 300;
        this.imageHeight = 170;
        this.imageContainerWidth = imageSize * this.itemNumOnScreen;
        break;

      case 'lg':

        this.itemNumOnScreen = 4

        this.imageWidth = 300;
        this.imageHeight = 170;
        this.imageContainerWidth = imageSize * this.itemNumOnScreen;
        break;

      case 'xl':

        this.itemNumOnScreen = 4

        this.imageWidth = 300;
        this.imageHeight = 170;
        this.imageContainerWidth = imageSize * this.itemNumOnScreen;
        break;

      default:
        break;
    }
    
  }
}