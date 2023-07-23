import * as React from "react";
import { DATE_FORMAT } from "../utils/constants";

type SocialMediaLinkProps = {
  contentfulid: string,
  title: string,
  handle: string,
  url: string
};

const SocialMediaLink: React.FunctionComponent<SocialMediaLinkProps> = ({
  title,
  handle,
  url
}) => (
  <li className={"list-item"}>
    {title}:&nbsp;
    <a href={url} target={"__blank"}>{handle}</a>
  </li>
);

export default SocialMediaLink;