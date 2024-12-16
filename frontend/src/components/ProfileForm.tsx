"use client";

import { UserInterface } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { handleUpdate } from "@/services/AuthService";
import { Label } from "./ui/label";

const profileFormSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    password: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ user }: { user: UserInterface | null }) {
    const [error, setError] = useState<string | null>(null);
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: { name: user?.name, password: "" },
        mode: "onChange",
    });

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            setError(null);
            if (data.password && data.password.length < 6) {
                setError("Password should be at least 6 characters");
                return;
            }
            if (data.name && data.name !== user?.name && data.name.length < 1) {
                setError("Name should be at least one character");
                return;
            }

            const updateData: Partial<ProfileFormValues> = {};
            if (data.name && data.name !== user?.name) {
                updateData.name = data.name;
            }
            if (data.password && data.password.length >= 6) {
                updateData.password = data.password;
            }
            const response = await handleUpdate(updateData);
            if (response.success) {
                setError(response.data.msg)
            } else {
                setError(response.data.msg || "An unexpected error occurred. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while updating the profile. Please try again.");
            console.error(err);
        }
    };

    return (
        <Tabs defaultValue="account">
            <TabsList className="w-full">
                <TabsTrigger value="account" className="w-1/2">Account</TabsTrigger>
                <TabsTrigger value="updateAccount" className="w-1/2">Update Account</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <div className="grid w-full items-center gap-4 my-4">
                    <Label>User Id</Label>
                    <Input value={user?.id} className="cursor-default" readOnly />
                    <Label>Name</Label>
                    <Input value={user?.name} className="cursor-default" readOnly />
                    <Label>Email</Label>
                    <Input value={user?.email} className="cursor-default" readOnly />
                    <Label>Balance</Label>
                    <Input value={564} className="cursor-default" readOnly />
                </div>
            </TabsContent>
            <TabsContent value="updateAccount">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Accordion type="multiple">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Update Name</AccordionTrigger>
                                <AccordionContent>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Update Password</AccordionTrigger>
                                <AccordionContent>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="password" type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        {error && <div className="text-red-500">{error}</div>}
                        <Button type="submit">Update Profile</Button>
                    </form>
                </Form>
            </TabsContent>
        </Tabs>
    );
}
