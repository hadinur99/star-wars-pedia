import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { PeopleService } from '../people.service';
import { Person, PeopleResponse } from '../../models/person';
import { Film } from '../../models/films';
import { HomeWorld } from '../../models/homeworld';

@Injectable({
  providedIn: 'root',
})
export class PeopleImplService implements PeopleService {
  private SWAPI_API = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) {}

  public getListPeople(pageNumber: number): Observable<PeopleResponse> {
    return this.http.get<PeopleResponse>(
      `${this.SWAPI_API}?page=${pageNumber}`
    );
  }
  public getDetailsPerson(peopleId: string | null): Observable<Person> {
    return this.http.get<Person>(this.SWAPI_API + peopleId);
  }

  public getListFilms(url: string): Observable<Film[]> {
    return this.http.get<Film[]>(url);
  }
  public getHomeWorld(url: string): Observable<HomeWorld> {
    return this.http.get<HomeWorld>(url);
  }
}
