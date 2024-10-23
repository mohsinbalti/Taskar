"use client";
import AuthLayout from "@/app/layouts/AuthLayout";
import { BlackButton, TransparentButton } from "@/components/buttons/button";
import CustomText from "@/components/fonts/text";
import {
  useCheckUserByEmail,
  useEmailLogin,
  useForgotPassword,
  useGoogleLogin,
  useLoginWithPassword,
} from "@/utils/auth.api";
import {
  Box,
  Card,
  Center,
  Divider,
  Flex,
  Text,
  Image,
  Input,
  Stack,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
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
import { IconEye, IconEyeOff, IconX } from "@tabler/icons-react";

const Login = () => {
  const emailLogin = useEmailLogin();
  const userEmailCheck = useCheckUserByEmail();
  const loginWithPassword = useLoginWithPassword();
  const forgotPassword = useForgotPassword();

  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref");
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    isOpen: isForgotOpen,
    onOpen: onForgotOpen,
    onClose: onForgotClose,
  } = useDisclosure();

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
          action: "SIGNIN",
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
      .mutateAsync({ email, captcha_token: token, actionName: "SIGNIN" })
      .then((res) => {
        setIsCaptchaLoading(false);
        if (res?.status) {
          toast({
            title: "Email Sent",
            description: `OTP code sent to your ${email} `,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          router.push(`/onboard/verification?email=${email}`);
        }
      })
      .catch((e) => {
        toast({
          title: e?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsCaptchaLoading(false);
        console.log(e);
      });
  };

  const handleForgotEmail = () => {
    forgotPassword
      .mutateAsync({ email: forgotEmail })
      .then((res) => {
        toast({
          title: "Email Sent",
          description: `Password reset link sent to your ${forgotEmail} `,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onForgotClose();
        setForgotEmail("");
      })
      .catch((e) => {
        toast({
          title: e?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const checkUserValidations = () => {
    setIsCaptchaLoading(true);
    if (!userEmailCheck?.isSuccess) {
      userEmailCheck
        .mutateAsync({ email })
        .then((result) => {
          if (!result?.isPasswordAdded) {
            getGoogleCaptcha(false);
          }
        })
        .catch((err) => {
          toast({
            title: err?.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
      setIsCaptchaLoading(false);
      return;
    }
    if (userEmailCheck?.data?.isPasswordAdded) {
      // @ts-ignore
      grecaptcha.enterprise.ready(async () => {
        // @ts-ignore
        const token = await grecaptcha.enterprise.execute(CAPTCHA_KEY, {
          action: "SIGNIN",
        });
        loginWithPassword
          ?.mutateAsync({
            email,
            password,
            captcha_token: token,
            action: "SIGNIN",
          })
          .then((result) => {
            toast({
              title: "Login Successful",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          })
          .catch((err) => {
            toast({
              title: err?.message,
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          });
      });
    }
    setIsCaptchaLoading(false);
  };

  const handleGoogleSignIn = (token: string) => {
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
          actionName: "SIGNIN",
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
          bgPosition={"bottom"}
          bgColor={"#FFFFFF"}
          bgSize={"cover"}
          bgRepeat={"no-repeat"}
          className={"login-signup-page"}
          display="flex"
          flexDirection="column"
          justifyContent={{ base: "flex-start", md: "flex-start" }}
          gap={{ base: "16px", md: "24px" }}
        >
          <Box width="100%" display={{ base: "none", md: "flex" }}>
            <Image src="/logo/EZ Tasker Logo-02.svg" alt="logo" />
          </Box>
          <Box
            width="100%"
            display={{ base: "flex", md: "none" }}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Image
              src="/logo/logo2.svg"
              alt="logo"
              alignItems="left"
              justifyContent="flex-start"
              textAlign="left"
            />
          </Box>
          <Box
            width={{ base: "100%", md: "400px" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems={{ base: "center", md: "center" }}
            textAlign={{ base: "start", md: "center" }}
            gap="24px"
            h="100%"
          >
            <Text fontSize="24px" fontWeight="600" width="100%" color="#212121">
              Welcome Back&#33;
            </Text>
            <Text fontSize="14px" fontWeight="400" color="#666666">
              We&apos;re glad to see you again&#33; Log in to continue where you
              left off and keep making progress&#46;
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
                checkUserValidations();
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
                mb="20px"
                focusBorderColor="#d9d9d9"
                _hover={{ borderColor: "#d9d9d9" }}
                type="email"
                boxShadow="none"
                value={email}
                isRequired
                onChange={(e) => setEmail(e.target.value)}
              />
              <Flex
                gap="6px"
                flexDir="column"
                display={
                  userEmailCheck?.data?.isPasswordAdded ? "flex" : "none"
                }
              >
                <Text
                  fontSize="14px"
                  fontWeight="400"
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
                    mb="5px"
                    paddingEnd="50px"
                    borderRadius="5px"
                    border="1.5px solid #CFCFCF"
                    background="#FFFFFF"
                    focusBorderColor="#d9d9d9"
                    _hover={{ borderColor: "#d9d9d9" }}
                    type={isPasswordVisible ? "text" : "password"}
                    isRequired={userEmailCheck?.data?.isPasswordAdded}
                    boxShadow="none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Box
                    pos="absolute"
                    top="0"
                    right="0"
                    mr="10px"
                    mt="15px"
                    zIndex="10"
                    onClick={() => {
                      setIsPasswordVisible(!isPasswordVisible);
                    }}
                  >
                    {isPasswordVisible ? (
                      <IconEye color="#666" size="16px" cursor="pointer" />
                    ) : (
                      <IconEyeOff color="#666" size="16px" cursor="pointer" />
                    )}
                  </Box>
                </Box>
              </Flex>
              <Text
                fontSize="14px"
                fontWeight="400"
                mb="20px"
                textAlign="right"
                color="#666666"
                cursor="pointer"
                onClick={onForgotOpen}
              >
                Forgot Password?
              </Text>
              <BlackButton
                bg="#181818"
                btnText="Login"
                fontSize="16px"
                weight="400"
                disabled={
                  emailLogin.isPending ||
                  isCaptchaLoading ||
                  userEmailCheck?.isPending ||
                  loginWithPassword?.isPending
                }
                isLoading={
                  emailLogin.isPending ||
                  loginWithPassword?.isPending ||
                  userEmailCheck?.isPending
                }
              />
            </form>
            <Text className="login-info-text">
              Not registered yet? <a href="/onboard/signup">Sign up</a>
            </Text>
          </Box>
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
        <Modal isOpen={isForgotOpen} onClose={() => {}} isCentered>
          <ModalOverlay />
          <ModalContent p="0px" maxW="644px" mx="16px">
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                handleForgotEmail();
              }}
            >
              <ModalBody p="24px" display="flex" flexDir="column" gap="24px">
                <Flex flexDir="column" gap="8px">
                  <Flex align="center" justify="space-between">
                    <CustomText
                      text="Forgot Password"
                      size="20px"
                      weight="600"
                    />
                    <IconX
                      size="22px"
                      onClick={onForgotClose}
                      cursor="pointer"
                    />
                  </Flex>
                  <CustomText
                    text="Please enter your email below to receive password recovery email"
                    size="16px"
                    weight="400"
                    color="#666"
                  />
                </Flex>
                <Divider bg="#ECECEC" />
                <Flex flexDir="column" gap="4px">
                  <Text
                    fontSize="14px"
                    fontWeight="400"
                    textAlign="left"
                    color="#666666"
                  >
                    Enter Email
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
                    mb="5px"
                    borderRadius="5px"
                    border="1.5px solid #CFCFCF"
                    background="#FFFFFF"
                    focusBorderColor="#d9d9d9"
                    _hover={{ borderColor: "#d9d9d9" }}
                    type="email"
                    boxShadow="none"
                    value={forgotEmail}
                    isRequired
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </Flex>
                <BlackButton
                  btnText="Send Email"
                  color="#fff"
                  type="submit"
                  isLoading={forgotPassword.isPending}
                />
              </ModalBody>
            </form>
          </ModalContent>
        </Modal>
      </Flex>
    </AuthLayout>
  );
};

export default Login;
