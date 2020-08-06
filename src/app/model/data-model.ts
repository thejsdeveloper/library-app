export interface Payload {
  data: DataModel[];
}

export interface DataModel {
  id: string;
  type: string;
  links: Links;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Links {
  self: string;
  related?: string;
}

export interface Relationships {
  authors: {
    links: Links;
  };
  publishers: {
    links: Links;
  };
}

export interface Attributes {
  urn: string;
  created_at: string;
  updated_at: string;
  content: string;
  properties: string;
  display_properties: {
    type: string;
    image: string;
  };
}
