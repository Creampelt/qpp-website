import * as React from "react";

type BenefitCardProps = Benefit;

const BenefitCard: React.FunctionComponent<BenefitCardProps> = ({
  img,
  title,
  body
}) => (
  <div className={"benefit-card"}>
    <img src={img.url} alt={img.title} />
    <h2>{title}</h2>
    <span dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default BenefitCard;