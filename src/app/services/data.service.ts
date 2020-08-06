import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Payload } from '../model/data-model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<Payload> {
    return this.http.get('../../assets/data/payload.json') as Observable<
      Payload
    >;
  }
}
