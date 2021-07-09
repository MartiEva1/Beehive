import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Filter, FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {
  filters: FormGroup;
  activatedFilters: Filter;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private filterServ: FilterService,
    private serv: ApiService,
  ) { }

  ngOnInit() {
    this.activatedFilters = this.filterServ.getFilters();

    this.filters = this.fb.group({
      numberParticipants: [this.activatedFilters.numberParticipants],
      distance: [this.activatedFilters.distance],
      fromDate: [this.activatedFilters.fromDate],
      toDate: [this.activatedFilters.toDate],
    })
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  applyFilters() {
    this.filterServ.applyFilters(this.filters.value);
    this.modalCtrl.dismiss(this.filters.value);
  }

  counter(length: number) {
    let array = [];

    let i = 1;
    while(i<=length)
    {
      array.push(i);
      i=i+1;
    }
    return array;
  }
  firstLetterToUpperCase(string: string): string {
    return string[0].toUpperCase + string.substring(1);
  }
}
