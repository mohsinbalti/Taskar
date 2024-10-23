import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./api-client";

export const useGetTasks = (
  limit: number,
  offset: number,
  search: string,
  category: string
) =>
  useQuery({
    queryKey: ["useGetTasks", limit, offset, search, category],
    queryFn: async () => {
      const response = await client(
        `tasks/getTasks?limit=${limit}&offset=${offset}&category=${category}&search=${search}`
      );
      return response;
    },
  });

export const useGetTaskById = (taskId: string) =>
  useQuery({
    queryKey: ["getTaskById", taskId],
    queryFn: async () => {
      const response = await client(`tasks/getTask/${taskId}`);
      return response;
    },
  });

export const useGetSimilarTasks = (taskId: string) =>
  useQuery({
    queryKey: ["useGetSimilarTasks", taskId],
    queryFn: async () => {
      const response = await client(`tasks/getSimilarTasks?taskId=${taskId}`);
      return response;
    },
    enabled: !!taskId,
  });

export const useGetUserSubmissions = () =>
  useQuery({
    queryKey: ["getUserSubmissions"],
    queryFn: async () => {
      const response = await client(`tasks/getUserSubmissions`);
      return response;
    },
  });

export const useGetUpcomingDeadlines = () =>
  useQuery({
    queryKey: ["useGetUpcomingDeadlines"],
    queryFn: async () => {
      const response = await client(`tasks/getUpcomingDeadlines`);
      return response;
    },
  });

export const useGetCategoriesWithTask = () =>
  useQuery({
    queryKey: ["getCategoriesWithTask"],
    queryFn: async () => {
      const response = await client(`tasks/getCategoriesWithTasks`);
      return response;
    },
  });

export const useGetUserSubmissionsByTaskId = (taskId: string) =>
  useQuery({
    queryKey: ["getUserSubmissionByTaskId", taskId],
    queryFn: async () => {
      const response = await client(
        `tasks/getUserSubmissionByTaskId?taskId=${taskId}`
      );
      return response;
    },
  });

export const useGetTaskWinner = (taskId: string) =>
  useQuery({
    queryKey: ["getTaskWinner", taskId],
    queryFn: async () => {
      const response = await client(`tasks/getTaskWinner?taskId=${taskId}`);
      return response;
    },
  });

export const useSubmitFileForTask = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (payload) => {
      //console.log("data in end-point", payload);
      const response = await client("tasks/submitFileForTask", {
        method: "POST",
        data: payload,
      });
      if (response.error) {
        throw new Error(response.error);
      }
      if (response) {
        queryClient.invalidateQueries({ queryKey: ["getActiveTask"] });
        queryClient.invalidateQueries({ queryKey: ["getTaskById"] });
        queryClient.invalidateQueries({
          queryKey: ["getUserSubmissionByTaskId"],
        });
        queryClient.invalidateQueries({ queryKey: ["getLoggedInUser"] });
        return response;
      } else {
        throw new Error("Unexpected response from the server");
      }
    },
  });
};

export const useCreatePaymentIntent = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (payload) => {
      //console.log("data in end-point", payload);
      const response = await client("tasks/createPaymentIntent", {
        method: "POST",
        data: payload,
      });
      return response;
    },
  });
};

export const useStartTask = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async ({ taskId, paymentId }) => {
      //console.log("data in end-point", payload);
      const response = await client(
        `tasks/startTask?taskId=${taskId}&paymentId=${paymentId}`,
        {
          method: "POST",
          // data: {tas},
        }
      );
      if (response.error) {
        throw new Error(response.error);
      }
      if (response) {
        queryClient.invalidateQueries({ queryKey: ["getTaskById"] });
        queryClient.invalidateQueries({ queryKey: ["getLoggedInUser"] });
        return response;
      } else {
        throw new Error("Unexpected response from the server");
      }
    },
  });
};

export const useGetActiveTaskOfUser = (status?: string) =>
  useQuery({
    queryKey: ["getActiveTask", status],
    queryFn: async () => {
      let queryUrl = "tasks/getActiveTaskOfUser";
      if (status) {
        queryUrl += `?status=${status}`;
      }
      const response = await client(queryUrl);
      return response;
    },
  });

export const useWithdraw = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (data) => {
      const response = await client(`tasks/withdraw`, {
        method: "POST",
        data: data,
      });
      return response;
    },
  });
};

export const useConfirmOtpForWithdraw = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (data) => {
      //console.log("data in end-point", payload);
      const response = await client(`tasks/confirmOtpForWithdraw`, {
        method: "POST",
        data,
      });
      return response;
    },
  });
};

export const useGetPointHistory = (limit: number, offset: number) =>
  useQuery({
    queryKey: ["getPointHistory", limit, offset],
    queryFn: async () => {
      const response = await client(
        `tasks/getPointHistory?limit=${limit}&offset=${offset}`
      );
      return response;
    },
  });

export const useGetTransactionHistory = (
  limit: number,
  offset: number,
  time: number
) =>
  useQuery({
    queryKey: ["getTransactionHistory", limit, offset, time],
    queryFn: async () => {
      const response = await client(
        `auth/getTransactions?limit=${limit}&offset=${offset}&time=${time}`
      );
      return response;
    },
  });

export const useExportTransactionHistory = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (time) => {
      //console.log("data in end-point", payload);
      const response = await client(`auth/exportTransactions?time=${time}`, {
        method: "GET",
      });
      return response;
    },
  });
};

export const useClaimTask = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (taskId) => {
      const response = await client(`tasks/claimTask/${taskId}`, {
        method: "POST",
      });
      if (response.error) {
        throw new Error(response.error);
      }
      if (response) {
        queryClient.invalidateQueries({ queryKey: ["getActiveTask"] });
        queryClient.invalidateQueries({ queryKey: ["getTaskById"] });
        queryClient.invalidateQueries({
          queryKey: ["getUserSubmissionByTaskId"],
        });
        queryClient.invalidateQueries({ queryKey: ["getLoggedInUser"] });
        return response;
      } else {
        throw new Error("Unexpected response from the server");
      }
    },
  });
};

export const useGetTaskParticipations = () => {
  return useQuery({
    queryKey: ["getTaskParticipations"],
    queryFn: async () => {
      const response = await client(`tasks/getTaskParticipations`);
      return response;
    },
  });
};

export const useGetTasksWon = () => {
  return useQuery({
    queryKey: ["getTasksWon"],
    queryFn: async () => {
      const response = await client(`tasks/getTaskWon`);
      return response;
    },
  });
};
