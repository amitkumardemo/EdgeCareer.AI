'use client'

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { BUTTONS_MENUS } from "@/lib/constants";
import dynamic from "next/dynamic";

const DynamicSignInButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignInButton), { ssr: false });
const DynamicUserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });

export default function AuthButtons() {
  return (
    <>
      <SignedOut>
        <DynamicSignInButton>
          <Button variant="outline">{BUTTONS_MENUS.SIGN_IN}</Button>
        </DynamicSignInButton>
      </SignedOut>

      <SignedIn>
        <DynamicUserButton
          appearance={{
            elements: {
              avatarBox: "w-10 h-10",
              userButtonPopoverCard: "shadow-xl",
              userPreviewMainIdentifier: "font-semibold",
            },
          }}
          afterSignOutUrl="/"
        />
      </SignedIn>
    </>
  );
}
