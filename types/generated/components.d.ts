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
    price: Attribute.Integer & Attribute.Required;
    services: Attribute.Relation<
      'components.plan',
      'oneToMany',
      'api::service.service'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.plan': ComponentsPlan;
    }
  }
}
