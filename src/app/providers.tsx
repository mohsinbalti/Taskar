"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { app } from "../../firebaseConfig";
import CustomTheme from "../components/Theme/theme";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_KEY } from "../../constants";

export const stripePromise = loadStripe(STRIPE_KEY);

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  // let clientSecret =
  //   "sk_test_51PdpbGFaluJelcGPov33u7yKcFhbYbf8GuaVQhwCStnkTPbC6OYbVhqeWhloSaOQC0l9IamK9N2NbcctRQOvXURA00dLQbfhh4";
  const options = {
    // clientSecret,
    layout: {
      type: "tabs",
      // defaultCollapsed: false,
    },
  };

  useEffect(() => {
    app; // Ensure Firebase is initialized
  }, []);

  return (
    <ChakraProvider theme={CustomTheme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ChakraProvider>
  );
}
