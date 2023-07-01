import { Request, Response } from "express";
import { sendSMS } from "../../utils/sms.helper";

const sendMessage = async (req: Request, res: Response) => {
  const { recipient, message } = req.body;
  try {
    const sms = await sendSMS(recipient, message);
    res.status(200).json({ sms });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { sendMessage };
