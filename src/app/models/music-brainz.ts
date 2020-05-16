export interface Author {
  type: AuthorType;
  gender: Gender;
  lifespan: LifeSpan;
  area: { name: string; };
  aliases: [{ name: string }];
  rating: Rating;
}

interface Rating {
  value: number;
  votes_count: number;
}

interface LifeSpan {
  end: string;
  ended: boolean;
  begin: string;
}

export enum Gender {
  MALE = 'Male', FEMALE = 'Female'
}

export enum AuthorType {
  PERSON = 'Person', GROUP = 'Group', ORCHESTRA = 'Orchestra', CHOIR = 'Choir', CHARACTER = 'Character', OTHER = 'Other'
}
