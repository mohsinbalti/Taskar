"use client";
import AuthLayout from "@/app/layouts/AuthLayout";
import { BlackButton, TransparentButton } from "@/components/buttons/button";
import CustomText from "@/components/fonts/text";
import { useGoogleLogin, useSignUp } from "@/utils/auth.api";
import {
  Box,
  Card,
  Center,
  Divider,
  Flex,
  Image,
  Input,
  Text,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { CAPTCHA_KEY } from "../../../../constants";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const Signup = () => {
  const emailLogin = useSignUp();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref");
  console.log(referralCode);
  const router = useRouter();
  const toast = useToast();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    isPasswordVisible: false,
    isConfirmPassowrdVisible: false,
  });
  const [agreeTerms] = useState(true);
  const [agreePrivacy] = useState(true);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const provider2 = new FacebookAuthProvider();
  const loginWithGoogleMutation = useGoogleLogin();

  function getGoogleCaptcha(isGoogle: boolean) {
    setIsCaptchaLoading(true);
    try {
      // @ts-ignore
      grecaptcha.enterprise.ready(async () => {
        // @ts-ignore
        const token = await grecaptcha.enterprise.execute(CAPTCHA_KEY, {
          action: "SIGNUP",
        });
        if (isGoogle) {
          handleGoogleSignIn(token);
          setIsCaptchaLoading(false);
        } else {
          handleEmailLogin(token);
          setIsCaptchaLoading(false);
        }
      });
    } catch (e) {
      setIsCaptchaLoading(false);
    }
  }

  const handleEmailLogin = (token: string) => {
    emailLogin
      .mutateAsync({
        email: payload.email,
        password: payload.password,
        referralCode,
        captcha_token: token,
        actionName: "SIGNUP",
        termsAndConditions: agreeTerms,
        privacy: agreePrivacy,
      })
      .then((res) => {
        setIsCaptchaLoading(false);
        toast({
          description: "Your account registered successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        router.push(`/onboard/login`);
      })
      .catch((e) => {
        setIsCaptchaLoading(false);
        console.log(e);
        toast({
          title: e?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const handleGoogleSignIn = (token: string) => {
    if (!agreePrivacy || !agreeTerms) {
      toast({
        title: "Please agree to the terms & conditions and privacy policy",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user: any = result.user;

        const formData = {
          token: user.accessToken,
          refferralCode: referralCode ? referralCode : "",
          captcha_token: token,
          actionName: "SIGNUP",
          termsAndConditions: agreeTerms,
          privacy: agreePrivacy,
        };
        await loginWithGoogleMutation?.mutateAsync(formData);
        setIsCaptchaLoading(false);
        toast({
          title: "Email Verified",
          description: "You have successfully verified your email",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setIsCaptchaLoading(false);
        toast({
          title: error?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider2);
      const user = result.user;

      toast({
        title: "Sign-in successful",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // You can handle the signed-in user data here or redirect to another page
    } catch (error: any) {
      // Display error toast if sign-in fails
      toast({
        title: "Sign-in failed",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const isWebView = () => {
    if (typeof window === "undefined") return false;
    const navigator: any = window.navigator;
    const userAgent = navigator.userAgent;
    const normalizedUserAgent = userAgent.toLowerCase();
    const standalone = navigator.standalone;

    const isIos =
      /ip(ad|hone|od)/.test(normalizedUserAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isAndroid = /android/.test(normalizedUserAgent);
    const isSafari = /safari/.test(normalizedUserAgent);
    const isWebview =
      (isAndroid && /; wv\)/.test(normalizedUserAgent)) ||
      (isIos && !standalone && !isSafari);

    return isWebview;
  };

  return (
    <AuthLayout>
      <Flex minH="100vh">
        <Box
          flex={{ base: "1", md: "0 0 65%" }}
          p={{ base: "16px", md: "32px", xl: "70px" }}
          bgImage={"/images/signup-bg-left.png"}
          bgColor={"#FFFFFF"}
          bgPosition={"bottom"}
          bgSize={"cover"}
          bgRepeat={"no-repeat"}
          className={"login-signup-page"}
          display="flex"
          flexDirection="column"
          justifyContent={{ base: "space-evenly", md: "space-between" }}
          alignItems={{ base: "center", md: "center" }}
        >
          <Box width="100%" display={{ base: "none", md: "flex" }}>
            <Image
              src="/logo/EZ Tasker Logo-02.svg"
              alt="logo"
              onClick={() => {
                router.push("/");
              }}
            />
          </Box>
          <Box
            width="100%"
            display={{ base: "flex", md: "none" }}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Image
              src="/logo/logo2.svg"
              alt="logo"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            />
          </Box>
          <Box
            width={{ base: "100%", md: "400px" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems={{ base: "center", md: "center" }}
            textAlign={{ base: "start", md: "center" }}
            gap={{ base: "16px", md: "18px", lg: "20px" }}
          >
            <Text fontSize="24px" fontWeight="600" width="100%" color="#212121">
              Let&apos;s Get Started&#33;
            </Text>
            <Text fontSize="14px" fontWeight="400" color="#666666">
              Welcome&#33; We&apos;re excited to have you join our
              community&#46; Create your account to begin your journey with
              us&#46;
            </Text>
            {!isWebView() && (
              <>
                <Stack spacing="16px" width="100%" className="google-button">
                  <TransparentButton
                    isDisabled={
                      isCaptchaLoading || loginWithGoogleMutation?.isPending
                    }
                    icon={
                      <Image
                        alt="logo"
                        src="/icons/google.svg"
                        w={{ base: "24px", md: "33px" }}
                      />
                    }
                    btnText="Continue with Google"
                    onClick={handleGoogleSignIn}
                  />
                </Stack>
                <Center gap="23px" width="100%">
                  <Divider borderColor="#d9d9d9" opacity={1} />
                  <CustomText text="OR" color="#666666" size="14px" />
                  <Divider borderColor="#d9d9d9" opacity={1} />
                </Center>
              </>
            )}
            <form
              className="login-form"
              style={{ width: "100%" }}
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  !payload.email ||
                  !payload.password ||
                  !payload.confirmPassword
                ) {
                  toast({
                    title: "Please fill all the fields",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                  return;
                }
                if (payload.password !== payload.confirmPassword) {
                  toast({
                    title: "Password and Confirm Password should be same",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                  return;
                }

                const passwordRegex =
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                if (!passwordRegex.test(payload.password)) {
                  toast({
                    title:
                      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                  return;
                }

                getGoogleCaptcha(false);
              }}
            >
              <Text
                fontSize="14px"
                fontWeight="400"
                mb="6px"
                textAlign="left"
                color="#666666"
              >
                Enter your email
              </Text>
              <Input
                placeholder="info@xyz.com"
                _placeholder={{
                  color: "#C0C0C0",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
                h="45px"
                width="100%"
                borderRadius="5px"
                border="1.5px solid #CFCFCF"
                background="#FFFFFF"
                mb="16px"
                focusBorderColor="#d9d9d9"
                _hover={{ borderColor: "#d9d9d9" }}
                type="email"
                boxShadow="none"
                value={payload.email}
                isRequired
                onChange={(e) =>
                  setPayload({ ...payload, email: e.target.value })
                }
              />
              <Text
                fontSize="14px"
                fontWeight="400"
                mb="6px"
                textAlign="left"
                color="#666666"
              >
                Enter your password
              </Text>
              <Box pos="relative">
                <Input
                  placeholder="*********"
                  _placeholder={{
                    color: "#C0C0C0",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                  h="45px"
                  width="100%"
                  mb="16px"
                  borderRadius="5px"
                  paddingEnd="50px"
                  border="1.5px solid #CFCFCF"
                  background="#FFFFFF"
                  focusBorderColor="#d9d9d9"
                  _hover={{ borderColor: "#d9d9d9" }}
                  type={payload?.isPasswordVisible ? "text" : "password"}
                  boxShadow="none"
                  value={payload.password}
                  isRequired
                  onChange={(e) =>
                    setPayload({ ...payload, password: e.target.value })
                  }
                />
                <Box
                  pos="absolute"
                  top="0"
                  right="0"
                  mr="10px"
                  mt="15px"
                  zIndex="10"
                  onClick={() =>
                    setPayload({
                      ...payload,
                      isPasswordVisible: !payload.isPasswordVisible,
                    })
                  }
                >
                  {payload?.isPasswordVisible ? (
                    <IconEye color="#666" size="16px" cursor="pointer" />
                  ) : (
                    <IconEyeOff color="#666" size="16px" cursor="pointer" />
                  )}
                </Box>
              </Box>
              <Text
                fontSize="14px"
                fontWeight="400"
                mb="6px"
                textAlign="left"
                color="#666666"
              >
                Enter your password
              </Text>
              <Box pos="relative">
                <Input
                  placeholder="*********"
                  _placeholder={{
                    color: "#C0C0C0",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                  h="45px"
                  width="100%"
                  mb="16px"
                  borderRadius="5px"
                  pe="50px"
                  border="1.5px solid #CFCFCF"
                  background="#FFFFFF"
                  focusBorderColor="#d9d9d9"
                  _hover={{ borderColor: "#d9d9d9" }}
                  type={payload?.isConfirmPassowrdVisible ? "text" : "password"}
                  boxShadow="none"
                  value={payload.confirmPassword}
                  isRequired
                  onChange={(e) =>
                    setPayload({ ...payload, confirmPassword: e.target.value })
                  }
                />
                <Box
                  pos="absolute"
                  top="0"
                  right="0"
                  mr="10px"
                  mt="15px"
                  zIndex="10"
                  onClick={() =>
                    setPayload({
                      ...payload,
                      isConfirmPassowrdVisible:
                        !payload.isConfirmPassowrdVisible,
                    })
                  }
                >
                  {payload?.isConfirmPassowrdVisible ? (
                    <IconEye color="#666" size="16px" cursor="pointer" />
                  ) : (
                    <IconEyeOff color="#666" size="16px" cursor="pointer" />
                  )}
                </Box>
              </Box>

              <BlackButton
                bg="#181818"
                btnText="Continue"
                fontSize="16px"
                weight="400"
                disabled={emailLogin?.isPending || isCaptchaLoading}
                isLoading={emailLogin?.isPending}
              />
            </form>
            <Text className="agree-info-text" textAlign="center">
              By continuing, you agree to ezTasker&apos;s{" "}
              <a
                href="https://app.termly.io/policy-viewer/policy.html?policyUUID=2dcaf8b8-8e4c-481f-9649-9b629d4a97a0"
                target="_blank"
              >
                Terms of Service
              </a>{" "}
              and confirm that you have read ezTasker{" "}
              <a
                href="https://app.termly.io/policy-viewer/policy.html?policyUUID=b839d70b-ea1b-495f-9303-8824790bba9f"
                target="_blank"
              >
                Privacy Policy.
              </a>
            </Text>
            <Text className="login-info-text">
              Already have an account&#63; <a href="/onboard/login">Sign in</a>
            </Text>
          </Box>
          <Box></Box>
        </Box>
        <Box
          display={{ base: "none", md: "flex" }}
          flex="0 0 35%"
          bgImage="/images/loginSideImage.png"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgPosition="center"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Card
            bg="rgba(255, 255, 255, 0.5)"
            w={"325px"}
            mb="60px"
            gap="10px"
            p="15px"
            borderRadius={"16px"}
          >
            <Image alt="logo" src="/icons/loginSideLogo.svg" w="40px" />
            <Text
              fontSize="20px"
              color="#FFFFFF"
              fontWeight="500"
              lineHeight="30px"
            >
              Creativity is intelligence having fun&#46;
            </Text>
            <Text fontSize="16px" color="#FFFFFF" fontWeight="400">
              &#45;Albert Einstein
            </Text>
          </Card>
        </Box>
      </Flex>
    </AuthLayout>
  );
};

export default Signup;
