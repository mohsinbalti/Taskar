import { QueryCache } from "@tanstack/react-query";

// export const apiURL = "https://taskerqueststagingapi.blockyfy.com";
// export const apiURL = "https://api.eztasker.com";
export const apiURL = "https://dev-live.eztasker.com";

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (data) => {
    console.log(data);
  },
});

async function client(
  endpoint: any,
  { data, customToken, headers: customHeaders, ...customConfig }: any = {}
) {
  const token = localStorage?.getItem("token");

  const config = {
    method: data ? "POST" : "GET",
    body: data instanceof FormData ? data : JSON.stringify(data),
    headers: {
      Authorization:
        endpoint === "auth/resetPassword"
          ? data?.token
          : customToken
          ? customToken
          : token
          ? `${token}`
          : "",
      ...(!data || data instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...customHeaders,
    },
    ...customConfig,
  };

  return await window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        queryCache.clear();
        const errorData = await response.json();
        const error = new Error(errorData.message || "Unauthorized");
        return Promise.reject(error);
      }
      if (endpoint?.includes("exportTransactions")) {
        const data = await response.blob();
        return data;
      }
      if (response.ok) {
        const jsonData = await response.json();
        return jsonData;
      } else {
        const jsonData = await response.json();
        return Promise.reject(jsonData);
      }
    });
}

export { client };
