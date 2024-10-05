import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Person } from '../models/person';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Film } from '../models/films';
import { HomeWorld } from '../models/homeworld';

export interface PeopleState {
  people: Person[];
  loading: boolean;
  error: string | null;
  nextPage: number | null;
  person: Person | null;
}

@Injectable({
  providedIn: 'root',
})
export class PeopleStore extends ComponentStore<PeopleState> {
  private SWAPI_API = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) {
    super({
      people: [],
      loading: false,
      error: null,
      nextPage: 1,
      person: null,
    });
  }

  // Selector
  readonly people$ = this.select((state) => state.people);
  readonly loading$ = this.select((state) => state.loading);
  readonly error$ = this.select((state) => state.error);
  readonly nextPage$ = this.select((state) => state.nextPage);

  // Selector details page
  readonly person$ = this.select((state) => state.person);

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery,
  }));

  fetchPeople(page: number): void {
    this.setState((state) => ({
      ...state,
      loading: true,
      error: null,
      nextPage: page,
    }));

    this.http
      .get<{ results: Person[]; next: string | null }>(
        `${this.SWAPI_API}?page=${page}`
      )
      .pipe(
        tap({
          next: (response) => {
            this.setState((state) => ({
              ...state,
              people: [...state.people, ...response.results], // Append new results to existing people
              loading: false,
              nextPage: response.next ? page + 1 : null,
              error: null,
            }));
          },
          error: (error) => {
            this.setState((state) => ({
              ...state,
              loading: false,
              error: error.message,
            }));
          },
        })
      )
      .subscribe();
  }

  fetchPerson(peopleId: string | null): Observable<Person> {
    this.setState((state) => ({
      ...state,
      loading: true,
      error: null,
      person: null,
      films: [],
      homeworld: null,
    }));

    return this.http.get<Person>(`${this.SWAPI_API}/${peopleId}`).pipe(
      switchMap((person) => {
        const filmsRequest = person.films.map((url: any) =>
          this.http.get<Film>(url)
        );
        const homeworldRequest = this.http.get<HomeWorld>(person.homeworld);
        return forkJoin([forkJoin(filmsRequest), homeworldRequest]).pipe(
          map(([films, homeworld]) => ({
            ...person,
            films: films.map((film) => film.title),
            homeworld: homeworld.name,
          }))
        );
      }),
      tap({
        next: (response) => {
          this.setState((state) => ({
            ...state,
            person: response,
            loading: false,
            error: null,
          }));
        },
        error: (error) => {
          this.setState((state) => ({
            ...state,
            loading: false,
            error: error.message,
          }));
        },
      })
    );
  }
}
