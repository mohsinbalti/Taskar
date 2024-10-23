"use client";
import { usePathname } from "next/navigation";
import React from "react";
import MyProfileNavbar from "./myProfileNavbar";
import NavBar from "./nav";
import { useGetLoggedInUser } from "@/utils/auth.api";
import { useQuery } from "@tanstack/react-query";

const Header: React.FC = () => {
  const { data: token, isLoading: tokenLoading } = useQuery({
    queryKey: ["token"],
    queryFn: () => localStorage.getItem("token"),
  });
  const { data: user, isLoading } = useGetLoggedInUser();
  const pathName = usePathname();
  if (!pathName?.includes("/onboard"))
    return (
      <>
        <NavBar
          token={token}
          user={user}
          isLoading={isLoading || tokenLoading}
        />
      </>
    );
};

export default Header;
