"use client";

import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SendHorizontal, User2Icon, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 

const chatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "This field can't be empty",
  }),
});

const ChatInput = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); 

  const userEmail = session?.user?.email || null;
  const [responseMessage, setResponseMessage] = useState<any>(null);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    if (status !== "loading" && !userEmail) {
      router.push("/");
    }
  }, [userEmail, status, router]);

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (value: z.infer<typeof chatMessageSchema>) => {
    setPending(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/search`, {
        email: userEmail, 
        query: value.content,
      });

      console.log("API Response:", response.data);
      setResponseMessage(response.data?.response);
    } catch (error) {
      console.error("Error submitting message:", error);
      setResponseMessage({ status: false, response: "Error fetching response" });
    } finally {
      setPending(false);
      form.reset();
    }
  };

  return (
    <div className="min-h-[11rem] flex flex-col w-full">
      <Card className="w-full p-1 lg:p-3 rounded-lg shadow-sm">
        <div className="flex gap-2 items-end w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex items-center gap-2 w-full"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full flex items-center">
                    <FormControl>
                      <Input
                        {...field}
                        className="text-sm lg:text-base"
                        placeholder="What are you looking for?"
                        onKeyDown={async (e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            await form.handleSubmit(handleSubmit)();
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button size="icon" type="submit" disabled={pending}>
                <SendHorizontal />
              </Button>
            </form>
          </Form>
        </div>

        {/* Response Display */}
        {responseMessage && (
          <div className="max-h-32 overflow-auto mt-2">
            {responseMessage.status ? (
              responseMessage.response.map((name: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 border border-border rounded-lg">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full border border-border">
                    <User2Icon className="text-muted-foreground" />
                  </div>
                  <p className="text-lg text-muted-foreground">{name}</p>
                </div>
              ))
            ) : (
              <div className="p-3 border border-red-500 text-red-500 bg-red-100 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">{responseMessage.response}</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChatInput;