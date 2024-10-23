import CustomText from "@/components/fonts/text";
import { Flex } from "@chakra-ui/react";
import React from "react";
import File from "./file";
import FileWithIndex from "./fileWithIndex";
import { useGetUserSubmissionsByTaskId } from "@/utils/task.api";

const fileData = [
  { name: "Challenge Submission.zip", size: "245 KB", time: "2 days ago" },
  { name: "File-Name.extension", size: "size", time: "time" },
  { name: "Challenge Submission2.zip", size: "265 KB", time: "1 days ago" },
  // { name: "File-Name.zip", size: "100 KB", time: "5 days ago" },
];
const FileSubmission = ({ taskId }: any) => {
  const { data: submissionsData } = useGetUserSubmissionsByTaskId(taskId);

  function formatRelativeTime(createdAt: any) {
    const currentTime = new Date();
    const createdTime = new Date(createdAt);
    const timeDifference = currentTime.getTime() - createdTime.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      return "Just now";
    }
  }

  return (
    <Flex
      direction={"column"}
      alignItems={"start"}
      gap={"16px"}
      display={submissionsData?.length === 0 ? "none" : "flex"}
    >
      <CustomText
        text={"Submissions You Made"}
        color={"#212121"}
        size={{ base: "18px", md: "32px" }}
        weight={{ base: 600, md: 600 }}
        height={{ base: "27px", md: "38.4px" }}
      />

      {submissionsData?.length === 0 ? (
        <CustomText
          text={"No submissions yet"}
          color={"#212121"}
          size={{ base: "14px", md: "16px" }}
          weight={{ base: 400, md: 500 }}
          height={{ base: "19.6px", md: "25.6px" }}
        />
      ) : (
        <Flex width={"100%"} maxWidth={"752px"} direction={"column"}>
          {submissionsData?.map((data: any, index: number) => (
            <FileWithIndex
              key={index}
              index={index + 1}
              name={data?.taskFile?.[0]?.fileName}
              // size={data?.taskFile?.[0]?.}
              time={formatRelativeTime(data.taskFinishDate || data?.createdAt)}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default FileSubmission;
