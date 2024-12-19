"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardFooter, CardContent, CardDescription } from "@/components/ui/card";

import { handleSignIn } from "@/services/AuthService";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await handleSignIn(values);
      if (response.status === 200) {
        navigate("/");
      } else {
        setError(response.data.msg || "An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      setError("Failed to sign in. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full flex items-center justify-center flex-col gap-8 p-4 md:p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">Sign In</CardTitle>
          <CardDescription>Enter email & password.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="abc@xyz.com" {...field} className="w-full h-12 cursor-pointer focus:cursor-text" />
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
                      <Input placeholder="password" {...field} type="password" className="w-full h-12 cursor-pointer focus:cursor-text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 text-center">{error}</p>}
              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Logging In...
                  </>
                ) : "Log In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>Don't have an account? <Link to="/sign-up" className="underline underline-offset-1">Create Now</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;