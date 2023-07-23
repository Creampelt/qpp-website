type NavLink = {
  title: string,
  to: string,
  colors: [string, string]
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
  start: dayjs.Dayjs,
  end: dayjs.Dayjs
};

type GatsbyImage = {
  gatsbyImageData: import("gatsby-plugin-image").ImageDataLike
}

type Sponsor = {
  name: string,
  logo: GatsbyImage,
  website: string
};

type FormState = {
  [key: string]: string
};

//////////////////////
// Contentful Types //
//////////////////////

type ContentfulSectionTitle = {
  title: string
};

type ContentfulNavbarTitle = ContentfulSectionTitle & {
  url: string,
  colors: [string, string]
};

type ContentfulFormField = {
  contentfulid: string,
  title: string,
  type: "text" | "email" | "dropdown",
  options: string[]
};

type QueriedEvent = {
  name: string,
  location: string,
  startTime: { "_seconds": number, "_nanoseconds": number },
  endTime: { "_seconds": number, "_nanoseconds": number }
}

type ContentfulEvent = {
  name: string,
  location: string,
  start: string,
  end: string
};

type ContentfulText = {
  content: {
    childMarkdownRemark: {
      html: string
    }
  }
};

type ContentfulBenefit = {
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

type ContentfulSponsorCategory = {
  title: string,
  sponsors: {
    logo: GatsbyImage,
    website: string,
    name: string
  }[]
};

type ContentfulImage = {
  image: GatsbyImage & { title: string }
};

type ContentfulFooterLink = {
  image: {
    url: string
  },
  contentfulid: string,
  url: string
}

interface All<T> {
  edges: { node: T }[]
};