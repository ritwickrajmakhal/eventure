import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsPlan extends Schema.Component {
  collectionName: 'components_components_plans';
  info: {
    displayName: 'Plan';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['Basic', 'Standard', 'Premium']> &
      Attribute.Required;
    services: Attribute.Relation<
      'components.plan',
      'oneToMany',
      'api::service.service'
    >;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
    icon: 'attachment';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    url: Attribute.String;
    isExternal: Attribute.Boolean;
    category: Attribute.Enumeration<
      ['Company', 'Help center', 'Legal', 'Download', 'Social media']
    >;
  };
}

export interface ComponentsCard extends Schema.Component {
  collectionName: 'components_components_cards';
  info: {
    displayName: 'Card';
    icon: 'cube';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    thumbnail: Attribute.Media<'images'>;
    icon: Attribute.String;
  };
}

export interface ComponentsAmenities extends Schema.Component {
  collectionName: 'components_components_amenities';
  info: {
    displayName: 'Amenity';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.plan': ComponentsPlan;
      'components.link': ComponentsLink;
      'components.card': ComponentsCard;
      'components.amenities': ComponentsAmenities;
    }
  }
}
