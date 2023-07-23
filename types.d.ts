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
  location: string,
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

type QueriedEvent = {
  name: string,
  location: string,
  startTime: { "_seconds": number, "_nanoseconds": number },
  endTime: { "_seconds": number, "_nanoseconds": number }
}