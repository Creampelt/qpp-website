type NavLink = {
  title: string,
  to: string,
  colors: string[]
};

type Benefit = {
  img: string,
  title: string,
  body: string
};

type FieldType = "text" | "email" | "dropdown";

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

type Sponsor = {
  name: string,
  logo: string,
  website: string
};

type SponsorCategory = {
  title: string,
  sponsors: Sponsor[]
};