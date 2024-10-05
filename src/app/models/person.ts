import { Film } from './films';
import { HomeWorld } from './homeworld';

export interface PersonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export interface Person {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}
