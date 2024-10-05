import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PeopleDetailComponent } from './components/people-detail/people-detail.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const Modules = [HttpClientModule, AppRoutingModule, FormsModule];
const Components = [PeopleListComponent, PeopleDetailComponent];

@NgModule({
  declarations: [AppComponent, ...Components],
  imports: [BrowserModule, ...Modules],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
