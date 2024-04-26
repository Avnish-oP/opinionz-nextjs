"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDebounceValue } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { signupSchema } from "@/schemas/signUpSchema";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function page() {
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dob, setDob] = useState(Date.now());
  const debouncedUsername = useDebounceValue(username, 500);
  const { toast } = useToast();
  const router = useRouter();
  //zod implementation
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (debouncedUsername[0]) {
        try {
          const response = await axios.get(
            `/api/unique-username?username=${debouncedUsername[0]}`
          );
          if(response.data.success){
            form.clearErrors("username");
            
          }
          else{
            form.setError("username", {
              type: "manual",
              message: response.data.message,
            });
          }
          console.log("response", response);
        } catch (error) {
          console.log("error checking username availability", error);
        }
      }
    };
    checkUsernameAvailability();
  }, [debouncedUsername[0]]);

  const onSubmit = async (data: any) => {
    // Convert dob string to Date object
    console.log("data", data);
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/signup", {
        username: data.username,
        email: data.email,
        password: data.password,
        dob: data.dob,
      });
      if (response.data.success) {
        toast({
          title: "Signup successful",
          description: response.data.message,
        });
        router.replace(`/verify/${username}`);
      } else {
        toast({
          title: "Signup failed",
          description: response.data.message,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log("error signing up", error);
      toast({
        title: "Signup failed",
        description: "Error signing up",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join OpinionZ
          </h1>
          <p className="text-gray-500 mb-4">Share your opinions anonymously</p>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setUsername(e.target.value);
                          
                        }}
                        style={{ borderColor: !form.formState.errors.username ? 'green' : 'red' }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  {isSubmitting ? "Signing up..." : "Sign up"}
                </button>
              </div>
              <div className="text-center">
                Already have an account?
                <Link
                  className="text-blue-500 hover:underline"
                  href="/auth/sign-in"
                >
                  {" "}
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default page;
