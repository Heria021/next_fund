"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
    return (
        <div className="flex justify-center items-center min-h-screen  p-6">
            <Card className="w-full max-w-sm rounded-2xl border bg-card">
                <CardHeader className="flex flex-col items-center my-10">
                    <div className="h-20 w-22 rounded-md overflow-hidden shadow-md">
                        <Image src="/image.png" alt="Nest Fund Logo" width={100} height={100} className="w-full h-full object-cover dark:hidden" />
                        <Image src="/image_light.png" alt="Nest Fund Logo" width={100} height={100} className="w-full h-full object-cover dark:block" />
                    </div>
                </CardHeader>

                <CardContent className="text-start space-y-4 my-6">
                    <div className="space-y-0">
                        <p className="text-xl font-semibold text-card-foreground">Grow with Nest Fund</p>
                        <p className="text-muted-foreground text-sm">Connect with top investors and mentors to bring your vision to life.</p>
                    </div>

                    <Button
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="flex items-center justify-center w-full py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-all shadow-sm gap-2"
                        aria-label="Sign in with Google"
                    >
                        <Image src="/google.svg" alt="Google Logo" width={20} height={20} className="w-5 h-5" />
                        <span className="text-sm font-medium">Sign in with Google</span>
                    </Button>

                    <div className="text-xs text-gray-500">
                        <p>Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact us</a></p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}