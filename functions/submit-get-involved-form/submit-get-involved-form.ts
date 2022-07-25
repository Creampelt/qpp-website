import { Handler } from "@netlify/functions";
import sgMail from "@sendgrid/mail";
import dotEnv from "dotenv";

dotEnv.config();

export const handler: Handler = async (event) => {
  const params = JSON.parse(event.body || "{}");
  if (Object.keys(params).length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Please provide parameters." })
    };
  }

  const { SENDGRID_API_KEY, AUTHORIZED_SENDER, TEMPLATE_ID } = process.env;
  if (!AUTHORIZED_SENDER) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong. Please try again later." })
    };
  } else if (!SENDGRID_API_KEY || !TEMPLATE_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Could not send email. Please reach out to ${AUTHORIZED_SENDER}.` })
    };
  }

  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: AUTHORIZED_SENDER,
    from: AUTHORIZED_SENDER,
    templateId: TEMPLATE_ID,
    dynamicTemplateData: params
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Thanks for signing up! Your information has been submitted successfully." })
    };
  } catch (e) {
    const error = e as Error;
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
}
