import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

export interface Filter {
  numberParticipants: Number | String,
  distance: Number | String,
  fromDate: String,
  toDate: String,
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filters: Filter = {
    numberParticipants: '',
    distance: '',
    fromDate: '',
    toDate: '',
  };
  private filtersCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private serv: ApiService) {}

  getFilters(): Filter {
    return this.filters;
  }
  getFiltersCount() {
    return this.filtersCount;
  }

  applyFilters(filters: any) {
    this.filters = filters;
    this.updateCounter();
    
    return Object.values(this.filters);
  }
  updateCounter() {
    this.filtersCount.next(0);

    this.filters.numberParticipants? this.filtersCount.next(this.filtersCount.value + 1) : '';
    this.filters.distance? this.filtersCount.next(this.filtersCount.value + 1) : '';
    this.filters.fromDate || this.filters.toDate? this.filtersCount.next(this.filtersCount.value + 1) : '';
  }
  removeAllFilters() {
    this.filters = {
      numberParticipants: '',
      distance: '',
      fromDate: '',
      toDate: '',
    }
    this.filtersCount.next(0);
  }
}
