export interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Trait {
  id: string;
  name: string;
}

export interface House {
    id: string, 
    name: string,
    houseColors: string,
    founder: string,
    animal: string,
    element: string,
    ghost: string,
    commonRoom: string,
    heads: Person[],
    traits: Trait[]
}
