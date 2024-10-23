import React from "react";
import { Text } from "@chakra-ui/react";
import { metropolis } from "./fonts";

const CustomText = ({
  text,
  size,
  h,
  weight,
  color,
  align,
  cursor,
  fontStyle,
  secondary,
  mb,
  mt,
  letterSpacing,
  superScript,
  overflow,
  wrap,
  whiteSpace,
  textOverflow,
  noOfLines,
  opacity,
  t2,
  t2Color,
  t2Weight,
  t2Size,
  t2H,
  t3,
  borderBottom,
  onClick,
  family,
  transform,
}: any) => {
  return (
    // IMPORTANT NOTE
    // here in project we have to use Metropolis font
    // but for some reason its pending
    <>
      <Text
        className={family || metropolis?.className}
        textTransform={transform}
        fontSize={size ? size : "16px"}
        lineHeight={h ? h : "24px"}
        fontWeight={weight ? weight : 400}
        color={color ? color : secondary ? "#666" : " #141414"}
        textAlign={align || "left"}
        fontStyle={fontStyle}
        letterSpacing={letterSpacing}
        //onClick={onClick}
        cursor={cursor}
        mb={mb}
        mt={mt}
        overflow={overflow}
        flexWrap={wrap}
        whiteSpace={whiteSpace}
        textOverflow={textOverflow}
        noOfLines={noOfLines}
        opacity={opacity}
        borderBottom={borderBottom}
        onClick={onClick}
      >
        {text}
        {t2 && (
          <Text
            className={metropolis?.className}
            as={"span"}
            mx="3px"
            color={t2Color}
            fontWeight={t2Weight}
            fontSize={t2Size}
            lineHeight={t2H}
          >
            {t2}
          </Text>
        )}
        {t3 && (
          <Text className={metropolis?.className} as={"span"}>
            {t3}
          </Text>
        )}
      </Text>

      {superScript && (
        <Text
          //fontFamily={"Plus Jakarta Sans"}
          color={color ? color : "#212121"}
          fontSize={"9px"}
          fontWeight={800}
          as="sup"
          letterSpacing={"1px"}
          ml={"-15px"}
        >
          TM
        </Text>
      )}
    </>
  );
};

export default CustomText;
