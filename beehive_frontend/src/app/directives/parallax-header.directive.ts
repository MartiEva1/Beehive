import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appParallaxHeader]'
})
export class ParallaxHeaderDirective implements OnInit {

  header: any;
  headerHeight: any;
  moveImage: number;
  scaleImage: number;

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    private domCtrl: DomController,
  ) { }

  ngOnInit() {
    let content = this.element.nativeElement;
    this.header = content.getElementsByClassName('parallax-image')[0];

    this.domCtrl.read(() => {
      this.headerHeight = this.header.clientHeight? this.header.clientHeight : 250;
    })
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event) {
    const scrollTop = $event.detail.scrollTop;
    // console.log(scrollTop);
    
    this.domCtrl.write(() => {
      if(scrollTop > 0)
      {
        this.moveImage = scrollTop/3;
        this.scaleImage = 1;
      }
      else
      {
        this.moveImage = scrollTop/1.2;
        this.scaleImage = -scrollTop/this.headerHeight + 1;
      }

      this.renderer.setStyle(this.header, 'webkitTransform', 
      'translate3d(0,'+this.moveImage+'px, 0) scale('+this.scaleImage+','+this.scaleImage+')');
    });
  }

}