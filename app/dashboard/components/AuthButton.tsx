"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
    const { data: session } = useSession();

    return (
        <div className="flex items-center space-x-4">
            {session &&
                <>
                    <Button
                        onClick={() => signOut()}
                        variant={'outline'}
                        size={'icon'}
                    >
                        <LogOutIcon />
                    </Button>
                </>
            }
        </div>
    );
}