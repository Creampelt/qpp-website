type NavLink = {
  title: string,
  to: string,
  colors: string[]
};

type Benefit = {
  img: {
    title: string,
    url: string
  },
  title: string,
  body: string
};

type MainField = {
  id: string,
  title: string
};

type DropdownField = MainField & {
  type: "dropdown",
  options: string[]
};

type TextField = MainField & {
  type: "text" | "email"
}

type FormField = DropdownField | TextField;

type UpcomingEvent = {
  name: string,
  location: string
  start: moment.Moment,
  end: moment.Moment
};

type GatsbyImage = {
  gatsbyImageData: import("gatsby-plugin-image").IGatsbyImageData
}

type Sponsor = {
  name: string,
  logo: GatsbyImage,
  website: string
};

type SponsorCategory = {
  title: string,
  sponsors: Sponsor[]
};

type ContentfulSectionTitle = {
  title: string
};

type ContentfulFormField = {
  contentfulid: string,
  title: string,
  type: "text" | "email" | "dropdown",
  options: string[]
};

type ContentfulEvent = {
  name: string,
  location: string,
  start: string,
  end: string
};

type ContentfulBenefit = {
  img: {
    title: string,
    url: string
  },
  title: string,
  body: { body: string }
};

type ContentfulSponsorCategory = {
  title: string,
  sponsors: {
    logo: GatsbyImage,
    website: string,
    name: string
  }[]
};

type ContentfulImage = {
  image: Gatsbyimage & { title: string }
};

interface All<T> {
  edges: { node: T }[]
}