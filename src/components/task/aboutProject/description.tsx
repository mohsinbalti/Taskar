"use client";
import { useState } from "react";
import { Collapse, Flex, SkeletonText, useMediaQuery } from "@chakra-ui/react";
import FileCard from "@/components/general cards/fileCard";
import CustomText from "@/components/fonts/text";
import FileCardLoading from "@/components/general cards/fileCardLoading";

//icons import
const icoDoc = "/logo/taskLogo/doc.svg";

const Description = ({ task, isLoading }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLessThan678] = useMediaQuery(`(max-width: 678px)`); //for collapse
  const [isLessThan390] = useMediaQuery(`(max-width: 390px)`); //for less than 390 size changes

  return (
    <Flex
      direction={"column"}
      gap={"16px"}
      maxWidth={"752px"}
      width={"100%"}
      pt={isLessThan678 ? "24px" : "0px"}
      borderTop={isLessThan678 ? "1px solid #ECECEC" : undefined}
    >
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <CustomText
          text={`Description`}
          size={{ base: "18px", md: "32px" }}
          h={{ base: "27px", md: "38.4px" }}
          weight={600}
          color={"#212121"}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {" "}
        {isLoading ? (
          <SkeletonText noOfLines={6} w="100%" />
        ) : (
          <CustomText
            text={task?.description || `Not Available`}
            size={{ base: "14px", md: "16px" }}
            h={{ base: "22.4px", md: "25.6px" }}
            weight={400}
            color={"#666"}
          />
        )}
        <Flex gap={isLessThan390 ? "8px" : "16px"} mt={"16px"}>
          {isLoading ? (
            new Array(2)
              ?.fill(1)
              ?.map((_, idx) => <FileCardLoading key={idx} />)
          ) : (
            <>
              {task?.flowDiagramFile && (
                <FileCard
                  ext={task?.flowDiagramFile}
                  name={"User Flow Diagram"}
                  task={task}
                />
              )}
              {task?.requirementsFile && (
                <FileCard
                  name={"Requirement File"}
                  ext={task?.requirementsFile}
                  icon={icoDoc}
                  task={task}
                />
              )}
            </>
          )}
        </Flex>
      </Collapse>
    </Flex>
  );
};

export default Description;
