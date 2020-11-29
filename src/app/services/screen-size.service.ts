import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  // --- Screen size --- //
  // Subject can multicast to many Observers
  public sharingSizeScreen = new Subject<any>();
  public media$: Observable<MediaChange[]>;

  // Observable string streams
  public sizeScreenCalled$ = this.sharingSizeScreen.asObservable();

  // Get current screen size into variable
  public currentSize: string
  public screenSize = {
    deviceXs: 'xs', // min-width: 0px , max-width: 600px
    deviceSm: 'sm', // min-width: 600px , max-width: 960px
    deviceMd: 'md', // min-width: 960px , max-width: 1280px
    deviceLg: 'lg', // min-width: 1280px , max-width: 1920px
    deviceXl: 'xl', // min-width: 1920px , max-width: 5000px
  }

  constructor(public myMediaObserver: MediaObserver) { 
    this.getScreenSize()
  }

  // Screen size which update any change
  public getScreenSize(){
      
    // Catch observer of MediaObserver
    this.media$ = this.myMediaObserver.asObservable();
    
    // Update "sizeScreenCalled$" on any changes of screen size
    this.media$.subscribe(mq => {
        
      for (const size in this.screenSize) {
        if (this.screenSize[size] === mq[0].mqAlias) {

          this.sharingSizeScreen.next(this.screenSize[size]);
        }
      }
  
      // Get current size into variable
      this.currentSize = mq[0].mqAlias
  
    })
  }

  // Current screen size - component connecting
  public getCurrentSize() {
    return this.currentSize;
  }

}
