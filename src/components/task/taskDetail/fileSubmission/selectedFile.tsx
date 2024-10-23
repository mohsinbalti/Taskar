import CustomText from "@/components/fonts/text";
import { Box, Button, Flex, Image, Progress } from "@chakra-ui/react";
import {
  IconCircleCheckFilled,
  IconFileTypeZip,
  IconLoader,
} from "@tabler/icons-react";
import React from "react";

//importing icon
const deleteIco = "/icons/trash.svg";
const closeIco = "/icons/close-circle.svg";
const calculateFileSize = (fileSizeInBytes: number, thresholdKB: number) => {
  const fileSizeInKB = fileSizeInBytes / 1024;
  const fileSizeInMB = fileSizeInKB / 1024;

  if (fileSizeInKB < thresholdKB) {
    return { size: fileSizeInKB, unit: "KB" };
  } else {
    return { size: fileSizeInMB, unit: "MB" };
  }
};

const SelectedFile = ({
  name,
  size,
  isUploaded,
  setFile = () => {},
  removeFile,
}: any) => {
  const { size: fileSize, unit } = calculateFileSize(size, 1024);

  return (
    <Flex
      borderRadius={"12px"}
      bg={"#F6F6F6"}
      p={{ base: "12px 12px", md: "24px 16px" }}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"24px"}
      width={"100%"}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <Flex
          gap={{ base: "12px", md: "21px" }}
          alignItems={"center"}
          width={"100%"}
        >
          {/* <Image/> */}
          <IconFileTypeZip size={"50px"} color="#212121" />
          <Flex direction={"column"} gap={"8px"} width={"100%"}>
            <CustomText
              text={name ? name : "CodeFile.zip"}
              size={{ base: "14px", md: "16px" }}
              weight={500}
              h={"normal"}
              color={"#212121"}
            />

            <Flex gap={"8px"} width={"100%"} alignItems={"center"}>
              <Box>
                <CustomText
                  text={
                    size ? `${fileSize.toFixed(2)} ${unit}` : "6 MB of 12 MB ."
                  }
                  size={{ base: "11px", md: "14px" }}
                  weight={400}
                  h={"normal"}
                  color={"#666"}
                />
              </Box>

              <Flex display={{ base: "none", md: "flex" }} gap={"6px"}>
                {isUploaded ? (
                  <IconCircleCheckFilled color="#3EBF8F" size={"14px"} />
                ) : (
                  <IconLoader color="#212121" size={"14px"} />
                )}
                <CustomText
                  text={isUploaded ? "Completed" : "Uploading..."}
                  size={{ base: "11px", md: "14px" }}
                  weight={400}
                  h={"normal"}
                  color={"#212121"}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Image
          cursor={"pointer"}
          onClick={() => {
            // setFile(null);
            removeFile();
          }}
          alt={"statusIco"}
          src={isUploaded ? deleteIco : closeIco}
          width={"18px"}
          height={"18px"}
        />
      </Flex>
      {/* progress bar */}
      {!isUploaded && (
        <Progress
          value={30}
          h={"4px"}
          width={"80%"}
          colorScheme="blackAlpha"
          bg="#FFF"
          borderRadius={"8px"}
        />
      )}
    </Flex>
  );
};

export default SelectedFile;
