import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable, merge } from 'rxjs';
import { DataModel } from '../../model/data-model';
import { map, startWith, switchMap, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';

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
