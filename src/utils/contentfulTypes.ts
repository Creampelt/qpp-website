export type All<T> = {
  edges: {
    node: T
  }[],
};

export type ContentfulSectionTitle = {
  title: string
};

export type ContentfulNavbarTitle = ContentfulSectionTitle & {
  url: string,
  colors: [string, string]
};

export type ContentfulFormField = {
  contentfulid: string,
  title: string,
  type: "text" | "email" | "dropdown",
  options: string[]
};

export type ContentfulText = {
  content: {
    childMarkdownRemark: {
      html: string
    }
  }
};

export type ContentfulBenefit = {
  img: {
    title: string,
    url: string
  },
  title: string,
  body: {
    childMarkdownRemark: {
      html: string
    }
  }
};

export type ContentfulSponsorCategory = {
  title: string,
  sponsors: {
    logo: GatsbyImage,
    website: string,
    name: string
  }[]
};

export type ContentfulImage = {
  image: GatsbyImage & { title: string }
};

export type ContentfulSocialMediaLink = {
  contentfulid: string,
  title: string,
  handle: string,
  url: string
}

export type ContentfulFooterLink = {
  image: {
    url: string
  },
  contentfulid: string,
  url: string
};