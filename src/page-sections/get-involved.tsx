import * as React from "react";
import Heading from "../components/heading";
import Form from "../components/form";
import moment from "moment";
import { graphql, useStaticQuery } from "gatsby";

const DATE_FORMAT = "YYYY-MM-DD hh:mm A";

type Query = {
  getInvolvedTitle: ContentfulSectionTitle,
  formFields: All<ContentfulFormField>,
  upcomingEventsTitle: ContentfulSectionTitle,
  events: All<ContentfulEvent>
};

const EventElement: React.FunctionComponent<UpcomingEvent> = ({ name, location, start, end }) => (
  <div className={"event"} key={`${name}_${location}_${start.format(DATE_FORMAT)}_${end.format(DATE_FORMAT)}`}>
    <div className={"bullet"} />
    <div>
      <h6>{name}</h6>
      <p>{location}</p>
      <p>
        {start.isSame(end, "day")
          ? `${start.format("M/D")} from ${start.format("h:mma")} to ${end.format("h:mma")}`
          : `${start.format("M/D [at] h:mma")} to ${end.format("M/D [at] h:mma")}`
        }
      </p>
    </div>
  </div>
);

const GetInvolved = React.forwardRef<HTMLDivElement>((_, ref) => {
  const data: Query = useStaticQuery(graphql`
    {
      getInvolvedTitle: contentfulSectionTitle(contentfulid: { eq: "getInvolved" }) {
        title
      }
      formFields: allContentfulFormField(sort: { fields: index }) {
        edges {
          node {
            contentfulid
            title
            type
            options
          }
        }
      }
      upcomingEventsTitle: contentfulSectionTitle(contentfulid: { eq: "upcomingEvents" }) {
        title
      }
      events: allContentfulEvent(sort: { fields: start }) {
        edges {
          node {
            name
            location
            start(formatString: "YYYY-MM-DD hh:mm A")
            end(formatString: "YYYY-MM-DD hh:mm A")
          }
        }
      }
    }
  `);

  const events = data.events.edges.map(({ node }) => ({
    ...node,
    start: moment(node.start, DATE_FORMAT),
    end: moment(node.end, DATE_FORMAT)
  })).filter(({ start }) => moment().isSameOrBefore(start, "day"));

  return (
    <div ref={ref} className={"section get-involved"}>
      <Heading>{data.getInvolvedTitle.title}</Heading>
      <Form data={data.formFields.edges.map(({ node }) => ({
        ...node,
        id: node.contentfulid
      }))} />
      <div className={"upcoming-events"}>
        <h2>{data.upcomingEventsTitle.title}</h2>
        <div className={"events-list"}>
          {events.length === 0
            ? <p className={"no-events"}>There are currently no scheduled events.</p>
            : events.map((event, i) => <EventElement key={i} {...event} />)}
        </div>
      </div>
    </div>
  )
});

export default GetInvolved;