import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { map, Observable, of, Subject, take, takeUntil, tap } from 'rxjs';
import { PeopleService } from '../../services/people.service';
import { PeopleStore } from '../../stores/people.store';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss',
})
export class PeopleListComponent implements OnInit {
  people$: Observable<Person[]> = this.peopleStore.people$;
  loading$: Observable<boolean> = this.peopleStore.loading$;
  error$: Observable<string | null> = this.peopleStore.error$;

  searchQuery: string = '';

  isShown: boolean = true;

  constructor(private peopleStore: PeopleStore) {}

  ngOnInit(): void {
    this.peopleStore.people$.subscribe((people) => {
      if (people.length === 0) {
        this.peopleStore.fetchPeople(1);
      }
    });
  }

  loadNextPage() {
    this.peopleStore.nextPage$.pipe(take(1)).subscribe((nextPage) => {
      if (nextPage) {
        this.peopleStore.fetchPeople(nextPage);
      } else {
        this.isShown = false;
      }
    });
  }
}
