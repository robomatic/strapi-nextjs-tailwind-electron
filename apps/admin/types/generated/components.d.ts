import type { Schema, Struct } from '@strapi/strapi'

export interface PageComponentsHeroCarousel extends Struct.ComponentSchema {
  collectionName: 'components_page_components_hero_carousels'
  info: {
    displayName: 'Hero Carousel'
    icon: 'picture'
  }
  attributes: {
    heroCarouselMedia: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >
  }
}

export interface PageComponentsMetadata extends Struct.ComponentSchema {
  collectionName: 'components_page_components_metadata'
  info: {
    displayName: 'Metadata'
    icon: 'hashtag'
  }
  attributes: {
    metaDescription: Schema.Attribute.Text
    metaKeywords: Schema.Attribute.Text
    pageTitle: Schema.Attribute.String
  }
}

export interface PageComponentsTeamProfile extends Struct.ComponentSchema {
  collectionName: 'components_page_components_team_profiles'
  info: {
    displayName: 'TeamProfile'
    icon: 'user'
  }
  attributes: {
    Description: Schema.Attribute.Text
    FirstName: Schema.Attribute.String
    LastName: Schema.Attribute.String
    Profileimage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >
    Title: Schema.Attribute.String
  }
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'page-components.hero-carousel': PageComponentsHeroCarousel
      'page-components.metadata': PageComponentsMetadata
      'page-components.team-profile': PageComponentsTeamProfile
    }
  }
}
