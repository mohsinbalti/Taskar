"use client";

import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useGetLoggedInUser } from "@/utils/auth.api";
import TokenLoading from "@/components/loadings/tokenLoading";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();

  // Use react-query to fetch the user's login status
  const { data: token, isLoading } = useQuery({
    queryKey: ["token"],
    queryFn: () => localStorage.getItem("token"),
  });
  const { data: userData, isLoading: dataLoading } = useGetLoggedInUser();

  useEffect(() => {
    // If the login status is still loading, do nothing
    if (isLoading || dataLoading) return;

    // If the user is logged in but has not completed the onboarding process, redirect them to the interests page
    if (userData?.interests?.length === 0 && token) {
      router.push("/onboard/interests");
    }

    if (userData?.interests?.length !== 0 && token) {
      router.push("/");
    }
  }, [isLoading, dataLoading, userData, token, router]);

  // If the login status is still loading, you can show a loading spinner or skeleton UI
  if (isLoading || dataLoading) {
    return <TokenLoading />;
  }
  // if (token) {
  //   router.push("/dashboard");
  //   return null;
  // }

  // If the user is logged in, render the protected layout
  return <div>{children}</div>;
};

export default AuthLayout;
