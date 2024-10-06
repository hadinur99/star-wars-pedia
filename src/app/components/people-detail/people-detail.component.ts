import { Component } from '@angular/core';
import { PeopleStore } from '../../stores/people.store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from '../../models/person';
import { Location } from '@angular/common';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrl: './people-detail.component.scss',
})
export class PeopleDetailComponent {
  person$: Observable<Person>;
  loading$: Observable<boolean> = this.peopleStore.loading$;
  error$: Observable<string | null> = this.peopleStore.error$;

  constructor(
    private peopleStore: PeopleStore,
    private route: ActivatedRoute,
    private location: Location
  ) {
    const peopleId = this.route.snapshot.paramMap.get('id');
    console.log(peopleId);
    this.person$ = this.peopleStore.fetchPerson(peopleId);
  }

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
