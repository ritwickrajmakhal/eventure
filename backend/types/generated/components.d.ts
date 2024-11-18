import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsPlan extends Schema.Component {
  collectionName: 'components_components_plans';
  info: {
    displayName: 'Plan';
    description: '';
    icon: 'book';
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

export interface ComponentsMember extends Schema.Component {
  collectionName: 'components_components_members';
  info: {
    displayName: 'member';
    icon: 'user';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    avatar: Attribute.Media<'images'> & Attribute.Required;
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
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
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
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
  };
}

export interface ComponentsAmenities extends Schema.Component {
  collectionName: 'components_components_amenities';
  info: {
    displayName: 'Amenity';
    description: '';
    icon: 'check';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.plan': ComponentsPlan;
      'components.member': ComponentsMember;
      'components.link': ComponentsLink;
      'components.card': ComponentsCard;
      'components.amenities': ComponentsAmenities;
    }
  }
}
