"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast, useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { verifySchema } from "@/schemas/verifySchema";
import axios from "axios";

function page() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      username: "",
      otp: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post("/api/verify-code", {
        username: params.username,
        code: data.otp,
      });
      if (response.data.success) {
        toast({
          title: "Account verified",
          description: response.data.message,
          variant: "default",
        });
        router.push("/sign-in");
      } else {
        toast({
          title: "code verification failed",
          description: response.data.message,
        });
      }
    } catch (error) {
      console.log("error verifying code", error);
      toast({
        title: "error verifying code",
        description: "error verifying code",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-col flex gap-6 items-center justify-center min-h-screen bg-background">
      <div className="">
        <h1 className="text-4xl font-bold text-center text-primary">
          Verify Account
        </h1>
        <p className="text-center text-gray-500">
          Please enter the one-time password sent to your phone.
        </p>
      </div>
      <div className="w-full flex justify-center items-center max-w-md p-4 bg-card">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6 flex flex-col items-center justify-center"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-12">One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default page;
