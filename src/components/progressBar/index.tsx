import { Box, Flex, SimpleGrid, Stack } from "@chakra-ui/react";
import CustomText from "../fonts/text";

export const MultiColorProgressBar = ({ segments, userData }: any) => {
  return (
    <Box>
      <Flex borderRadius={"5px"}>
        {segments.map((segment: any, index: any) => (
          <Box
            key={index}
            flex={segment.value}
            backgroundColor={segment.color}
            h="16px"
            borderLeftRadius={index === 0 ? "16px" : "0"}
            borderRightRadius={index === segments.length - 1 ? "16px" : "0"}
          />
        ))}
      </Flex>
      <Flex
        mt="24px"
        gap={"20px"}
        justify={{ base: "start", md: "space-between" }}
        wrap="wrap"
      >
        {segments?.map((item: any, idx: any) => (
          <Stack key={idx} gap="8px">
            <Box boxSize={"16px"} borderRadius={"4px"} bg={item?.color} />
            <Flex gap="3px">
              <CustomText text={`${item?.name}:`} color="#666" />
              <CustomText text={item?.value} weight="500" />
            </Flex>
          </Stack>
        ))}
      </Flex>
    </Box>
  );
};
