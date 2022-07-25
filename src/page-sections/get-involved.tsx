import * as React from "react";
import Heading from "../components/heading";
import Form from "../components/form";
import moment from "moment";
import axios, { AxiosResponse, AxiosError } from "axios";
import { graphql, useStaticQuery } from "gatsby";

const DATE_FORMAT = "YYYY-MM-DD hh:mm A";
const FUNCTION_ENDPOINT = "/.netlify/functions/submit-get-involved-form";

type Query = {
  getInvolvedTitle: ContentfulSectionTitle,
  formFields: All<ContentfulFormField>,
  upcomingEventsTitle: ContentfulSectionTitle,
  events: All<ContentfulEvent>
};

type ServerSuccessData = { message: string };
type ServerErrorData = { error: string };

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
      formFields: allContentfulFormField(filter: { formId: { eq: "getInvolved" } }, sort: { fields: index }) {
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

  const [formIsLoading, setFormIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string|null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string|null>(null);

  const events = data.events.edges.map(({ node }) => ({
    ...node,
    start: moment(node.start, DATE_FORMAT),
    end: moment(node.end, DATE_FORMAT)
  })).filter(({ start }) => moment().isSameOrBefore(start, "day"));

  const submitGetInvolvedForm = async (formData: FormState) => {
    setFormIsLoading(true);
    try {
      const { data }: AxiosResponse<ServerSuccessData> = await axios.post(
        FUNCTION_ENDPOINT,
        formData
      );
      setSuccessMessage(data.message);
      setErrorMessage(null);
    } catch (e) {
      const error = e as AxiosError<ServerErrorData>;
      if (!error.response) {
        setErrorMessage("Something went wrong. Please try again later.");
      } else {
        setErrorMessage(error.response.data.error);
      }
      setSuccessMessage(null);
    } finally {
      setFormIsLoading(false);
    }
  };

  return (
    <div ref={ref} className={"section get-involved"}>
      <Heading>{data.getInvolvedTitle.title}</Heading>
      <Form
        data={data.formFields.edges.map(({ node }) => ({
          ...node,
          id: node.contentfulid
        }))}
        isLoading={formIsLoading}
        onSubmit={submitGetInvolvedForm}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        successMessage={successMessage}
      />
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