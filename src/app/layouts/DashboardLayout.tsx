"use client";
import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Box } from "@chakra-ui/react";
import Header from "@/components/navBar";
import Footer from "@/components/footer/footer";
import TokenLoading from "@/components/loadings/tokenLoading";
import { useGetLoggedInUser } from "@/utils/auth.api";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref");

  // Use react-query to fetch the user's login status
  const { data: token, isLoading } = useQuery({
    queryKey: ["token"],
    queryFn: () => localStorage.getItem("token"),
  });
  const { data: userData } = useGetLoggedInUser();
  // If the login status is still loading, you can show a loading spinner or skeleton UI
  if (isLoading) {
    return <TokenLoading />;
  }

  // If the user is not logged in, redirect them to the login page
  if (!token) {
    if (referralCode) {
      router.push(`/onboard/signup/?ref=${referralCode}`);
      return null;
    } else {
      router.push("/onboard/login");
      return null;
    }
  } else if (userData?.interests?.length === 0) {
    router.push("/onboard/interests");
    return null;
  }

  // If the user is logged in, render the protected layout
  return (
    <>
      <Header />
      <Box mt={{ base: "80px", md: "auto" }}>{children}</Box>
      <Footer />
    </>
  );
};

export default DashboardLayout;
