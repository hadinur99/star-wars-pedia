export interface PersonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export interface Person {
  id: number;
  name: string;
  birth_year: string;
  gender: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
}
