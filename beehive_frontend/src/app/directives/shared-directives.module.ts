import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeHeaderDirective } from './fade-header.directive';
import { ParallaxHeaderDirective } from './parallax-header.directive';

@NgModule({
  declarations: [ FadeHeaderDirective, ParallaxHeaderDirective ],
  exports: [ 
    FadeHeaderDirective,
    ParallaxHeaderDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedDirectivesModule { }
