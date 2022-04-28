import * as React from "react";
import Heading from "../components/heading";
import AppearOnScroll from "../components/appear-on-scroll";
import gradCap from "../images/graduation-cap-solid.svg";
import briefcase from "../images/briefcase-solid.svg";
import handshake from "../images/handshake-angle-solid.svg";
import people from "../images/people-group-solid.svg";

const BENEFITS: Benefit[] = [
  {
    img: gradCap,
    title: "Academic",
    body: "To encourage academic development among our members, we organize regular study nights, technical workshops, and faculty panels throughout the year. The aim of these academic events is to support members in their classes, while also providing insight into all the exciting paths of academia in CS!"
  },
  {
    img: briefcase,
    title: "Corporate",
    body: "We partner with companies who are invested in creating an inclusive and safe environment for LGBTQIA+ employees, and collaborate with them to host events centered around professional development. These events include resume workshops, Q&A sessions, and more. We're always looking for ways to empower and inform our members of new, engaging, and relevant opportunities!"
  },
  {
    img: handshake,
    title: "Mentorship",
    body: "The purpose of the mentorship program at Q++ is to help foster meaningful relationships between members of the organization. This year we will be collaborating with oSTEM. This mentorship platform is an inclusive space for all backgrounds, (dis)abilities, sexual orientation, gender identity, and more."
  },
  {
    img: people,
    title: "Social",
    body: "Q++ organizes social events to create a welcoming and inclusive environment for everyone. These social events mainly consist of game nights and relaxing times for all students to unwind, have a good time with one another, and bloom new friendships! We hope that you will come to our next social because we can’t wait to meet you!"
  },
];

const BenefitCard: React.FunctionComponent<Benefit> = ({ img, title, body }) => (
  <div className={"benefit-card"}>
    <img src={img} alt={title} />
    <h3>{title}</h3>
    <p>{body}</p>
  </div>
);

const About = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className={"section about"}>
    <div className={"intro"}>
      <Heading>About</Heading>
      <p className={"about-intro"}>
        Q++ is a student organization that empowers and provides support for
        students who identify as LGBTQIA+ in computer science and technology
        through academic, professional, mentorship, and social events. Anyone
        interested in technology can join!
      </p>
    </div>
    <AppearOnScroll className={"benefits"}>
      {BENEFITS.map((benefit) => <BenefitCard {...benefit} key={benefit.title} />)}
    </AppearOnScroll>
  </div>
));

export default About;