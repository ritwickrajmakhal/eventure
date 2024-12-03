import type { Attribute, Schema } from '@strapi/strapi';

export interface ComponentsAmenities extends Schema.Component {
  collectionName: 'components_components_amenities';
  info: {
    description: '';
    displayName: 'Amenity';
    icon: 'check';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsCard extends Schema.Component {
  collectionName: 'components_components_cards';
  info: {
    description: '';
    displayName: 'Card';
    icon: 'cube';
  };
  attributes: {
    description: Attribute.Text;
    heading: Attribute.String & Attribute.Required;
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
    link: Attribute.Component<'components.link'>;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    description: '';
    displayName: 'Link';
    icon: 'attachment';
  };
  attributes: {
    category: Attribute.Enumeration<
      ['Company', 'Help center', 'Legal', 'Download', 'Social media']
    >;
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
    isExternal: Attribute.Boolean;
    text: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsMember extends Schema.Component {
  collectionName: 'components_components_members';
  info: {
    displayName: 'member';
    icon: 'user';
  };
  attributes: {
    avatar: Attribute.Media<'images'> & Attribute.Required;
    description: Attribute.Text;
    name: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsPlan extends Schema.Component {
  collectionName: 'components_components_plans';
  info: {
    description: '';
    displayName: 'Plan';
    icon: 'book';
  };
  attributes: {
    services: Attribute.Relation<
      'components.plan',
      'oneToMany',
      'api::service.service'
    >;
    type: Attribute.Enumeration<['Basic', 'Standard', 'Premium']> &
      Attribute.Required;
  };
}

export interface ComponentsQuestion extends Schema.Component {
  collectionName: 'components_components_questions';
  info: {
    displayName: 'Question';
    icon: 'question';
  };
  attributes: {
    answer: Attribute.Blocks & Attribute.Required;
    question: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsTestimonial extends Schema.Component {
  collectionName: 'components_components_testimonials';
  info: {
    description: '';
    displayName: 'Testimonial';
  };
  attributes: {
    author: Attribute.String & Attribute.Required;
    avatar: Attribute.Media<'images'>;
    position: Attribute.String & Attribute.Required;
    quote: Attribute.Text & Attribute.Required;
    rating: Attribute.Enumeration<
      ['One star', 'Two stars', 'Three stars', 'Four stars', 'Five stars']
    > &
      Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.amenities': ComponentsAmenities;
      'components.card': ComponentsCard;
      'components.link': ComponentsLink;
      'components.member': ComponentsMember;
      'components.plan': ComponentsPlan;
      'components.question': ComponentsQuestion;
      'components.testimonial': ComponentsTestimonial;
    }
  }
}
