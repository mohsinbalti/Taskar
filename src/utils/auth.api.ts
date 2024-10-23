import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./api-client";

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (loginData) => {
      const response = await client("auth/loginWithGoogle", {
        method: "POST",
        data: loginData,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response?.token) {
        localStorage.setItem("token", response.token.access_token);
        queryClient.invalidateQueries({ queryKey: ["token"] }); // invalidating queries to redirect from auth to dashboard
        queryClient.invalidateQueries({ queryKey: ["getLoggedInUser"] });
        return response;
      } else {
        throw new Error("Unexpected response from the server");
      }
    },
  });
};

export const useFacebookLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (loginData) => {
      const response = await client("auth/loginWithFacebook", {
        method: "POST",
        data: loginData,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response?.token) {
        localStorage.setItem("token", response.token);
        queryClient.invalidateQueries({ queryKey: ["token"] });
        return response;
      } else {
        throw new Error("Unexpected response from the server");
      }
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (signUpData) => {
      const response = await client("auth/signup", {
        method: "POST",
        data: signUpData,
      });

      if (response.error) {
        throw new Error(response.error);
      }
      if (response?.token) {
        localStorage.setItem("token", response.token.access_token);
        queryClient.invalidateQueries({ queryKey: ["token"] });
        queryClient.invalidateQueries({ queryKey: ["getLoggedInUser"] });
        return response;
      } else {
        return response;
      }
    },
  });
};

export const useEmailLogin = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (loginData) => {
      const response = await client("auth/loginWithEmail", {
        method: "POST",
        data: loginData,
      });

      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (payload) => {
      const response = await client("auth/verifyEmail", {
        method: "POST",
        data: payload,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response?.token) {
        localStorage.setItem("token", response.token.access_token);
        queryClient.invalidateQueries({ queryKey: ["token"] });
        queryClient.invalidateQueries({ queryKey: ["getLoggedInUser"] });
        return response;
      } else {
        throw new Error("Unexpected response from the server");
      }
    },
  });
};

export const useCheckUserByEmail = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (email) => {
      const response = await client("auth/getUserByEmail", {
        method: "POST",
        data: email,
      });

      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};

export const useSetNewPassword = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (payload) => {
      const response = await client("auth/setPassword", {
        method: "POST",
        data: payload,
      });

      if (response.error) {
        throw new Error(response.error);
      }
      queryClient.invalidateQueries({ queryKey: ["getLoggedInUser"] });
      return response;
    },
  });
};

export const useLoginWithPassword = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (loginData) => {
      const response = await client("auth/login", {
        method: "POST",
        data: loginData,
      });

      if (response.error) {
        throw new Error(response.error);
      }
      if (response?.token) {
        localStorage.setItem("token", response.token.access_token);
        queryClient.invalidateQueries({ queryKey: ["token"] });
        queryClient.invalidateQueries({ queryKey: ["getLoggedInUser"] });
        return response;
      }
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (email) => {
      const response = await client("auth/forgotPassword", {
        method: "POST",
        data: email,
      });

      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (data) => {
      const response = await client("auth/resetPassword", {
        method: "POST",
        data: data,
      });
      return response;
    },
  });
};

export const useChangePassword = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (data) => {
      const response = await client("auth/changePassword", {
        method: "POST",
        data: data,
      });
      return response;
    },
  });
};

export const useVerifyEmailUsingToken = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (payload) => {
      const response = await client(`auth/verifyEmailUsingToken`, {
        customToken: payload?.token,
      });
      return response;
    },
  });
};

export const useSendActivationEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await client(`auth/resendVerificationEmail`, {
        method: "POST",
      });
      queryClient.invalidateQueries({ queryKey: ["getLoggedInUser"] });
      return response;
    },
  });
};

export const useGetLoggedInUser = () =>
  useQuery({
    queryKey: ["getLoggedInUser"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await client(`auth/getLoggedInUser`);
        return response;
      } else {
        return null;
      }
    },
  });

export const useGetSkills = () =>
  useQuery({
    queryKey: ["getSkills"],
    queryFn: async () => {
      const response = await client(`auth/getSkills`);
      return response;
    },
  });

export const useGetAllInterests = () =>
  useQuery({
    queryKey: ["getAllInterests"],
    queryFn: async () => {
      const response = await client(`auth/getCategory`);
      return response;
    },
  });

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const editProfileMutation = useMutation({
    mutationFn: async (data) => {
      const response = await client("auth/editProfile", {
        method: "POST",
        data: data,
      });
      return response.data; // Assuming the response contains the created token data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getLoggedInUser"] });
    },
  });
  return editProfileMutation;
};

export const useGetCategory = ({ limit, offset }: any = {}) =>
  useQuery({
    queryKey: ["getCategory", limit, offset],
    queryFn: async () => {
      let url = "auth/getCategory";
      if (limit !== undefined && offset !== undefined) {
        url += `?limit=${limit}&offset=${offset}`;
      }
      const response = await client(url);
      return response;
    },
  });

export const useGetAccountDetails = () =>
  useQuery({
    queryKey: ["getAccountDetails"],
    queryFn: async () => {
      const response = await client(`tasks/getBankAccountDetails`);
      return response;
    },
  });

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (accountId) => {
      const response = await client(
        `/tasks/deleteBankAccountDetails/${accountId}`,
        {
          method: "DELETE",
        }
      );
      queryClient.invalidateQueries({ queryKey: ["getAccountDetails"] });
      return response;
    },
  });
};

export const useAddAccount = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (data) => {
      const response = await client("tasks/addBankAccount", {
        method: "POST",
        data: data,
      });
      queryClient.invalidateQueries({ queryKey: ["getAccountDetails"] });
      return response;
    },
  });
};
