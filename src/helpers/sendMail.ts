import { resend } from "@/lib/resend";
import { Resend } from "resend";
import { ApiResponse } from "@/types/ApiResponse";
import verifyemailTemplate from "../../emails/verifyMailTemplate";

const sendMail = async (email: string, otp: string, username:string):Promise<ApiResponse> => {

    try {
        await resend.emails.send({
            from:'onboarding@resend.dev',
            to: email,
            subject: "Verify your opinionz account",
            react: verifyemailTemplate({ username, otp }),
            text: "Verify your email", // Add the 'text' property
        });
        return { success: true, message: `Email sent to ${email}`};
    } catch (error) {
        console.error("Error sending email", error);
        return { success: false, message: "Failed to send email" };
    }
};

export default sendMail;