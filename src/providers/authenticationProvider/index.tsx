import { parseJwt } from "@/helpers";
import { cookieStorageManager } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import React, { useState, createContext, useContext, useEffect } from "react";

type AuthenticationContextType = {
  session: { userType: string } | undefined;
  setSession: React.Dispatch<
    React.SetStateAction<{ userType: string } | undefined>
  >;
};

const COOKIE_NAME = process.env.NEXT_PUBLIC_AUTHENTICATION_COOKIE_NAME!;

export const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);

export default function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<{ userType: string } | undefined>({
    userType: "administrator",
  });

  useEffect(() => {
    const token = getCookie(COOKIE_NAME)?.valueOf().toString();
    if (!token) return;
    const { role }: { role: string } = parseJwt(token);
    setSession({ userType: role.toLocaleLowerCase() });
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within a AuthenticationProvider"
    );
  }

  return context;
};
