import { Flex } from "@chakra-ui/react";
import React from "react";
import HashLoader from "react-spinners/HashLoader";

function TokenLoading() {
  return (
    <Flex minH="100vh" flexDir="column" align="center" justify="center">
      <HashLoader color="#6F49FE" size="75px" />
    </Flex>
  );
}

export default TokenLoading;
