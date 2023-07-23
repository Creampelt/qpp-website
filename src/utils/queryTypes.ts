import type {
  All,
  ContentfulNavbarTitle,
  ContentfulImage,
  ContentfulSectionTitle,
  ContentfulText,
  ContentfulBenefit,
  ContentfulFormField,
  ContentfulSocialMediaLink,
  ContentfulSponsorCategory,
  ContentfulFooterLink
} from "./contentfulTypes";

export type MainQueryType = {
  favicon: {
    image: {
      file: {
        url: string
      }
    }
  },
  title: {
    content: {
      content: string
    }
  },
  links: All<ContentfulNavbarTitle>
};

export type HeaderQueryType = {
  logo: ContentfulImage,
  logoSubtitle: { content: { content: string } }
};

export type AboutQueryType = {
  aboutTitle: ContentfulSectionTitle,
  aboutDescription: ContentfulText,
  benefits: All<ContentfulBenefit>
}

export type GetInvolvedQueryType = {
  getInvolvedTitle: ContentfulSectionTitle,
  formFields: All<ContentfulFormField>,
  upcomingEventsTitle: ContentfulSectionTitle,
  socialMediaTitle: ContentfulSectionTitle,
  socialMediaLinks: All<ContentfulSocialMediaLink>
};

export type SponsorsQueryType = {
  sponsorsTitle: ContentfulSectionTitle,
  sponsorText: ContentfulText,
  sponsors: All<ContentfulSponsorCategory>
}

export type NavbarQueryType = {
  logo: ContentfulImage
};

export type FooterQueryType = {
  footerLinks: All<ContentfulFooterLink>
}