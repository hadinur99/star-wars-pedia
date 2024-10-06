import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Person } from '../models/person';
import { PeopleImplService } from './impl/people-impl.service';
import { Film } from '../models/films';
import { HomeWorld } from '../models/homeworld';

@Injectable({
  providedIn: 'root',
  useClass: PeopleImplService,
})
export abstract class PeopleService {
  constructor() {}

  public abstract getListPeople(pageNumber: number): Observable<Person[]>;

  public abstract getDetailsPerson(peopleId: string | null): Observable<Person>;

  public abstract getListFilms(url: string): Observable<Film[]>;

  public abstract getHomeWorld(url: string): Observable<HomeWorld>;
}
