import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupSettingsComponent } from './popup-settings/popup-settings.component';



@NgModule({
  declarations: [PopupSettingsComponent],
  imports: [
    CommonModule
  ],
  exports: [PopupSettingsComponent]
})
export class SharedComponentsModule { }
