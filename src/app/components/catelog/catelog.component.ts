import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { merge, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { DataModel } from '../../model/data-model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-catelog',
  templateUrl: './catelog.component.html',
  styleUrls: ['./catelog.component.scss'],
})
export class CatelogComponent implements AfterViewInit {
  bookData: Observable<DataModel[]>;
  displayedColumns: string[] = [
    'image',
    'title',
    'type',
    'publishedOn',
    'updatedOn',
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) filterInput: MatInput;

  constructor(private dataService: DataService) {}

  ngAfterViewInit() {
    this.bookData = merge(
      this.sort.sortChange,
      this.filterInput.stateChanges
    ).pipe(
      startWith({}),
      switchMap((_) => this.dataService.getData()),
      map(({ data }) => data),
      map((data) => data.sort(this.sortByReleaseDate)),
      map(this.filterByTitle)
    );
  }

  getDate(date: string): string {
    return moment(date, 'YYYY-DD-MMThh:mm:ss:SSSz').format('DD-MM-YYYY');
  }

  getDateInMoment(date: string): moment.Moment {
    return moment(date, 'YYYY-DD-MMThh:mm:ss:SSSz');
  }

  sortByReleaseDate = (a: DataModel, b: DataModel): number => {
    const sortDirection = this.sort.direction;
    const dateA = this.getDateInMoment(a.attributes.created_at);
    const dateB = this.getDateInMoment(b.attributes.created_at);
    return sortDirection === 'asc' ? dateA.diff(dateB) : dateB.diff(dateA);
  };

  filterByTitle = (books: DataModel[]): DataModel[] => {
    return books.filter((book) =>
      book.attributes.content
        .toLowerCase()
        .includes(this.filterInput.value.toLowerCase())
    );
  };
}
