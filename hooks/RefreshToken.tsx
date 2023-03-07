"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useRefreshToken() {
  const { data: session } = useSession();
  const [isValid, setIsValid] = useState(true);

  // if the refresh token fails, redirect user to login
  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        setIsValid(false);
      }
    }
  }, [session]);

  return isValid;
}
