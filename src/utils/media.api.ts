import { useMutation } from "@tanstack/react-query";
import { client } from "./api-client";

export const useUploadMedia = () => {
  const uploadMedia = useMutation({
    mutationFn: async (file: any) => {
      const response = await client(`media-upload/mediaFiles/images`, {
        method: "POST",
        data: file,
      });
      return response.url;
    },
  });

  return uploadMedia;
};
