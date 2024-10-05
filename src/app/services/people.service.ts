import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Person } from '../models/person';
import { PeopleImplService } from './impl/people-impl.service';

@Injectable({
  providedIn: 'root',
  useClass: PeopleImplService,
})
export abstract class PeopleService {
  constructor() {}

  public abstract getListPeople(pageNumber: number): Observable<Person[]>;

  public abstract getDetailsPeople(peopleId: number): Observable<Person>;
}
