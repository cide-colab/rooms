
export interface RestEntity<L extends Links> {
  // tslint:disable-next-line:variable-name
  _links?: L;
}

export interface Links {
  self: Link;
}

export interface Link {
  href: string;
}

export interface ListLinks extends Links {
  profile: Link;
  search: Link;
}

export interface RestListEntity<T, L extends Links> {
  // tslint:disable-next-line:variable-name
  _embedded: T;
  // tslint:disable-next-line:variable-name
  _links: L;
}
