"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { signupSchema } from "@/schemas/signUpSchema";
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
import { set } from "mongoose";
import { Loader, Loader2 } from "lucide-react";

function page() {
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isUsernameChecking, setIsUsernameChecking] = useState(false);
  const debounced = useDebounceCallback(setUsername, 500);
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
      
      if (username) {
        try {
          setIsUsernameChecking(true);
          const response = await axios.get(
            `/api/unique-username?username=${username}`
          );
          if(response.data.success){
            setIsUsernameAvailable(true);
            form.clearErrors("username");
            
          }
          else{
            setIsUsernameAvailable(false);
            form.setError("username", {
              type: "manual",
              message: response.data.message,
            });
          }
          console.log("response", response);
        } catch (error) {
          console.log("error checking username availability", error);
        }
        finally{
          setIsUsernameChecking(false);
        
        }
      }
    };
    checkUsernameAvailability();
  }, [username]);

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
      }
      else if (response.data.success === false && response.data.message === "Email is already in use") {
        toast({
          title: "Signup failed",
          description: response.data.message,
        });
        setIsSubmitting(false);
      }
      else if (response.data.success === false && response.data.message === "Username is already in use") {
        toast({
          title: "Signup failed",
          description: response.data.message,
        });
        setIsSubmitting(false);
      }
       else {
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
                          debounced(e.target.value);
                          
                        }}
                        style={{ borderColor: !form.formState.errors.username ? 'green' : 'red' }}
                      />
                      
                    </FormControl>
                    {isUsernameChecking && (
                      <FormDescription className="text-blue-500">
                        <Loader2 className="" size={20} />
                        </FormDescription>
                        )}
                    {isUsernameAvailable ? (
                        <FormDescription className="text-green-500" >
                          Username is available
                          </FormDescription>
                          ) : (
                            <FormMessage />
                          )}
                    
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
                  href="/sign-in"
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
