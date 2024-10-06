import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Person, PeopleResponse } from '../models/person';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { PeopleService } from '../services/people.service';

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
  constructor(private peopleService: PeopleService) {
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

  fetchPeople(page: number): void {
    this.setState((state) => ({
      ...state,
      loading: true,
      error: null,
      nextPage: page,
    }));

    this.peopleService
      .getListPeople(page)
      .pipe(
        tap({
          next: (response: PeopleResponse) => {
            this.setState((state) => ({
              ...state,
              people: [...state.people, ...response.results],
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

  fetchPersonDetails(peopleId: string | null): Observable<Person> {
    this.setState((state) => ({
      ...state,
      loading: true,
      error: null,
      person: null,
      films: [],
      homeworld: null,
    }));

    return this.peopleService.getDetailsPerson(peopleId).pipe(
      switchMap((person: Person) => {
        const filmsRequest = person.films.map((url: string) =>
          this.peopleService.getListFilms(url)
        );
        const homeworldRequest = this.peopleService.getHomeWorld(
          person.homeworld
        );

        return forkJoin([forkJoin(filmsRequest), homeworldRequest]).pipe(
          map(([filmsArray, homeworld]) => ({
            ...person,
            films: filmsArray.flat().map((film) => film.title),
            homeworld: homeworld.name,
          }))
        );
      }),
      tap({
        next: (response: Person) => {
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
