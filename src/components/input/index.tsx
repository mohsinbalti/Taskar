"use client";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
export const PrimaryInput = ({
  ph,
  h,
  Icon,
  value,
  onChange,
  name,
  type,
  disabled,
}: any) => {
  const [isFocused, setisFocused] = useState(false);
  return (
    <InputGroup>
      {Icon && (
        <InputLeftElement h="100%" width={"32px"}>
          <Icon color={isFocused ? "#212121" : "#666"} size="16px" />
        </InputLeftElement>
      )}
      <Input
        placeholder={ph}
        disabled={disabled}
        _placeholder={{ color: "#666", fontWeight: 400, opacity: 0.6 }}
        h={h || "52px"}
        borderRadius={"8px"}
        pl={Icon ? "32px" : "16px"}
        focusBorderColor="#212121"
        bg={disabled ? "#F6F6F6" : "white"}
        _hover={{ borderColor: "#212121" }}
        boxShadow={"none"}
        fontWeight={600}
        onFocus={() => setisFocused(true)}
        onBlur={() => setisFocused(false)}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
      />
    </InputGroup>
  );
};

export const PrimaryTextarea = ({ ph, value, onChange }: any) => {
  return (
    <Textarea
      value={value}
      onChange={onChange}
      placeholder={ph}
      _placeholder={{ color: "#666", opacity: 0.6 }}
      borderRadius={"8px"}
      focusBorderColor="#212121"
      _hover={{ borderColor: "#212121" }}
      boxShadow={"none"}
    />
  );
};
