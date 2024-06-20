import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/ApiResponse";
import verifyemailTemplate from "../../emails/verifyMailTemplate";

const sendMail = async (
  email: string,
  otp: string,
  username: string
): Promise<ApiResponse> => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kavnish1245@gmail.com",
      pass: "btak njvp mqfl pyps",
    },
  });
  var mailOptions = {
    from: "kavnish1245@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    text: `Hello ${username}, Your OTP is ${otp}`,
  };
  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email", error);
          reject(error);
        } else {
          console.log("Email sent: " + info.response);
          resolve(info);
        }
      });
    });
    return { success: true, message: `Email sent to ${email}` };
  } catch (error) {
    console.error("Error sending email", error);
    return { success: false, message: "Failed to send email" };
  }
};

export default sendMail;
