import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { PeopleService } from '../people.service';
import { Person, PersonResponse } from '../../models/person';

@Injectable({
  providedIn: 'root',
})
export class PeopleImplService implements PeopleService {
  private SWAPI_API = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) {}

  public getListPeople(pageNumber: number): Observable<Person[]> {
    return this.http
      .get<PersonResponse>(this.SWAPI_API + '?page=' + pageNumber)
      .pipe(map((response: PersonResponse) => response.results));
  }
  public getDetailsPeople(peopleId: number): Observable<Person> {
    return this.http.get<Person>(this.SWAPI_API + peopleId);
  }
}
