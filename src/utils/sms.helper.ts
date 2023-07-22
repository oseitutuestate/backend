import got from "got";
import request from "request";
import { Configs } from "../config/config";

const sendSMS = async (recipient: string[], message: string) => {
  let options = {
    method: "POST",
    url: `${Configs.SMS_PROVIDER}?key=${Configs.SMS_API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipient: recipient,
      sender: "OTEstate",
      message: message,
    }),
  };

  return await request(options, function (error, response) {
    if (response.body.status === "success") {
      const res = {
        message: "sms sent to user(s)",
        status: 200,
      };

      return res;
    } else {
      const res = {
        message: response.body.message,
        status: 400,
      };

      return res;
    }
  });
};

export { sendSMS };
