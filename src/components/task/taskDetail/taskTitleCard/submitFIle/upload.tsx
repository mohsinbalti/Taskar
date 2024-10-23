"use client";
import CustomText from "@/components/fonts/text";
import {
  Box,
  Flex,
  Image,
  Input,
  Spinner,
  Textarea,
  Tooltip,
  position,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { IconHelp, IconX } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import SelectedFile from "../../fileSubmission/selectedFile";
import { useSubmitFileForTask } from "@/utils/task.api";
import { useParams, useRouter } from "next/navigation";
import { useUploadMedia } from "@/utils/media.api";

// importing icon
const cloud = "/icons/cloud.svg";
const image = "/icons/img.svg";

const UploadFileModal = ({ taskId, toggle, color, type, title, icon }: any) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const toast = useToast();
  const [isLessThan380] = useMediaQuery(`(max-width: 380px)`); //for font size
  const bg = `${color ? color : "#56CDAD"}1A`;

  const submitFileForTaskMutation = useSubmitFileForTask();
  const uploadMediaMutation = useUploadMedia();

  const fileUploadRef2 = useRef<HTMLInputElement>(null);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [loadingFor, setLoadingFor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [attachments, setAttachments] = useState<any[]>([]);

  const [attachment2, setAttachment2] = useState<any>(null);

  const handleImageUpload = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const handleImageUpload2 = () => {
    if (fileUploadRef2.current) {
      fileUploadRef2.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingFor("previewImage");
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        if (typeof reader.result === "string") {
          const formData1: any = new FormData();
          formData1.append("file", file);
          const url = await uploadMediaMutation.mutateAsync(formData1);
          setAttachment2(url);
          setSelectedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const handleImageChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingFor("taskFile");
    setFiles([]);
    setAttachments([]);
    let file: any = e.target.files?.[0];
    if (file) {
      setLoading(true); // Start loading

      const reader = new FileReader();
      reader.onload = async () => {
        if (typeof reader.result === "string") {
          try {
            const formData1: any = new FormData();
            formData1.append("file", file);
            const url = await uploadMediaMutation.mutateAsync(formData1);
            // setAttachment(url);
            setFiles((prevFiles: any) => [...prevFiles, file]);
            setAttachments((prev: any) => [...prev, url]);
            if (e.target) {
              e.target.files = null;
            }
            setLoading(false);
            toast({
              title: "File uploaded successfully!",
              status: "success",
              position: "top-right",
            });
          } catch (error: any) {
            toast({
              title: error?.message,
              status: "error",
              position: "top-right",
            });
            if (e.target) {
              e.target.files = null;
            }
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (files?.length === 0 || !files) {
      toast({
        title: "File must not be empty",
        status: "error",
        position: "top-right",
      });
      return;
    }
    // const base64Strings = await Promise.all(files?.map(readFileAsBase64));
    const formData = {
      taskId: params?.id || taskId,
      taskFile: attachments.map((attachment, index) => ({
        fileUrl: attachment,
        fileName: files[index]?.name,
      })),
      image: attachment2,
      comments: comment,
    };

    try {
      await submitFileForTaskMutation.mutateAsync(formData);
      toast({
        title: "Task submitted successfully!",
        status: "success",
        position: "top-right",
      });
      router.push(`/task-detail/${params.id || taskId}?status=result`);
      toggle();
    } catch (error: any) {
      toast({
        title: error?.message,
        status: "error",
        position: "top-right",
      });
      console.error("Error submitting file:", error);
    }
  };

  return (
    <Flex
      p={isLessThan380 ? "32px 12px" : { base: "32px 16px", md: "32px" }}
      direction={"column"}
      alignItems={"start"}
      gap={{ base: "24px", md: "32px" }}
      borderRadius={"16px"}
      // border={"1px solid #ECECEC"}
      bg={"#FFF"}
      maxWidth={"644px"}
      width={"100%"}
      position={"relative"}
    >
      {/* close icon */}
      <Box
        position={"absolute"}
        boxSize={"24px"}
        top={{ base: "12px", md: "24px" }}
        right={{ base: "12px", md: "24px" }}
        cursor={"pointer"}
        onClick={() => {
          toggle();
          uploadMediaMutation?.reset();
          setAttachments([]);
          setFiles([]);
          setSelectedImage(null);
          setComment("");
        }}
      >
        <IconX size={"24px"} color="#212121" />
      </Box>

      {/* row1 icon, title & type  */}
      <Flex
        gap={"24px"}
        alignItems={"center"}
        pb={{ base: "12px", md: "32px" }}
        borderBottom={"1px solid #ECECEC"}
        width={"100%"}
      >
        <Image
          alt="logo"
          src={icon ? icon : "https://via.placeholder.com/150"}
          height={{ base: "44px", md: "80px" }}
          width={{ base: "44px", md: "80px" }}
        />
        <Flex direction={"column"} gap={"8px"} alignItems={"flex-start"}>
          {/* type */}
          <Box p={"6px 10px"} borderRadius={"80px"} bg={bg}>
            <CustomText
              text={type ? type : " "}
              color={color ? color : "#56CDAD"}
              size={"12px"}
              weight={500}
              height={"19.2px"}
            />
          </Box>
          {/* title */}
          <CustomText
            text={title ? title : " "}
            color={"#212121"}
            size={isLessThan380 ? "16px" : { base: "18px", md: "24px" }}
            weight={600}
            height={"28.8px"}
          />
        </Flex>
      </Flex>

      {/*row 2  */}
      <Flex direction={"column"} width={"100%"} gap={"16px"}>
        <Input
          id="image-upload"
          type="file"
          accept=".zip,.rar,.7z"
          // style={{ display: "none" }}
          onChange={handleImageChange2}
          ref={fileUploadRef2}
          hidden
          style={{ display: "none" }}
        />
        <CustomText
          text={"Submit your File"}
          size={isLessThan380 ? "16px" : { base: "18px", md: "24px" }}
          weight={600}
          color={"#212121"}
          h={"28.8px"}
        />
        <CustomText
          text={"Upload your task files and add additional information if any."}
          size={"16px"}
          weight={400}
          color={"#666"}
          h={"25.6px"}
        />
      </Flex>

      {/*row 3 task file  */}
      <Flex direction={"column"} width={"100%"} gap={"14px"}>
        <CustomText
          text={"Task File"}
          size={"16px"}
          weight={600}
          color={"#212121"}
          h={"20px"}
        />
        <Flex
          width={"100%"}
          p={
            isLessThan380 ? "24px 10px" : { base: "24px 14px", md: "24px 16px" }
          }
          gap={"32px"}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"16px"}
          border={"2px dashed #ECECEC"}
          bg={"#FFF"}
        >
          {/* if file selected */}
          {files?.length > 0 &&
            files?.map((file: any, idx: number) => (
              <Flex width={"100%"} direction={"column"} gap={"16px"} key={idx}>
                <SelectedFile
                  setFile={setFile}
                  removeFile={() =>
                    setFiles((prevFiles) =>
                      prevFiles.filter((_, i) => i !== idx)
                    )
                  }
                  name={file?.name}
                  size={file?.size}
                  isUploaded={!loading}
                />
              </Flex>
            ))}
          {/* {file && (
            <Flex width={"100%"} direction={"column"} gap={"16px"}>
              <SelectedFile
                setFile={setFile}
                name={file?.name}
                size={file?.size}
                isUploaded={!loading}
              />
            </Flex>
          )} */}
          {/*  clod icon and text  if file is not selected*/}
          {/* {!file && ( */}
          <Flex
            direction={"column"}
            maxWidth={"309px"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"24px"}
            //  border={"1px solid red"}
          >
            {uploadMediaMutation?.isPending && loadingFor === "taskFile" ? (
              <Spinner />
            ) : (
              <Image src={cloud} alt="logo" sizes="32px" />
            )}
            <Flex
              gap={"8px"}
              direction={"column"}
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CustomText
                text={"Choose a file"}
                size={"16px"}
                weight={600}
                color={"#212121"}
                h={"normal"}
              />

              <CustomText
                text={".zip, .rar and .7z files are supported"}
                size={"16px"}
                weight={400}
                color={" #666"}
                h={"normal"}
              />
              <CustomText
                text={"max size upto 50MB"}
                size={"16px"}
                weight={400}
                color={" #666"}
                h={"normal"}
              />
            </Flex>
          </Flex>
          {/* )} */}

          {/* button Browse file */}
          <Flex
            p={"16px 24px"}
            width={"100%"}
            border={"1px solid #212121 "}
            borderRadius={"52px"}
            bg={"#FFF"}
            justifyContent={"center"}
            alignItems={"center"}
            cursor={"pointer"}
            onClick={handleImageUpload2}
          >
            <CustomText
              text={"Browse File"}
              size={"18px"}
              weight={600}
              color={"#212121"}
              h={"normal"}
            />
          </Flex>
        </Flex>
      </Flex>

      {/*row 4 image preview  */}
      <Flex direction={"column"} width={"100%"} gap={"14px"}>
        {/* this is actually input which is use for chosing file and hidden */}
        <Input
          id="image-upload"
          type="file"
          accept=".png,.jpg,.jpeg,.svg,.gif"
          // style={{ display: "none" }}
          onChange={handleImageChange}
          ref={fileUploadRef}
          hidden
          style={{ display: "none" }}
        />

        <Flex
          //  / alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Flex gap={"12px"} alignItems={"center"}>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#212121",
                height: "20px",
              }}
            >
              Image Preview
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  height: "20px",
                }}
              >
                {" "}
                (Optional)
              </span>{" "}
            </p>
            <Tooltip label="Upload an image preview of your work to showcase it in your portfolio. This is optional but helps highlight your skills. Please use PNG or JPG formats only.">
              <IconHelp size={"24px"} />
            </Tooltip>
          </Flex>
          {selectedImage && (
            <Box onClick={handleImageUpload} cursor={"pointer"}>
              <CustomText
                text={"Change Image"}
                color={"#212121"}
                size={{ base: "13px", md: "16px" }}
                weight={500}
              />
            </Box>
          )}
        </Flex>

        <Flex
          width={"100%"}
          p={"24px 16px"}
          gap={"32px"}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"16px"}
          border={"2px dashed #ECECEC"}
          bg={"#FFF"}
          maxHeight={"274px"}
          height={"100%"}
        >
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Preview"
              maxWidth={"546px"}
              maxHeight={"226px"}
              borderRadius={"12px"}
              objectFit={"contain"}
            />
          )}

          {/*  image icon and text */}
          {!selectedImage && (
            <>
              <Flex
                direction={"column"}
                maxWidth={"364px"}
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"24px"}
              >
                {uploadMediaMutation?.isPending &&
                loadingFor === "previewImage" ? (
                  <Spinner />
                ) : (
                  <Image src={image} alt="logo" sizes="32px" />
                )}
                <Flex
                  gap={"8px"}
                  direction={"column"}
                  width={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Flex
                    gap={"2px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#212121",
                      }}
                    >
                      Click to upload
                    </p>
                  </Flex>

                  <CustomText
                    text={"SVG, PNG, JPG or GIF "}
                    size={"16px"}
                    weight={400}
                    color={" #666"}
                    h={"normal"}
                  />
                </Flex>
              </Flex>
              {/* button Browse file */}

              <Flex
                p={"16px 24px"}
                width={"100%"}
                border={"1px solid #212121 "}
                borderRadius={"52px"}
                bg={"#FFF"}
                justifyContent={"center"}
                alignItems={"center"}
                cursor={"pointer"}
                onClick={handleImageUpload}
              >
                <CustomText
                  text={"Browse File"}
                  size={"18px"}
                  weight={600}
                  color={"#212121"}
                  h={"normal"}
                />
              </Flex>
            </>
          )}
        </Flex>
      </Flex>

      {/*row 5 Add Comments */}
      <Flex direction={"column"} width={"100%"} gap={"14px"}>
        <Flex gap={"12px"} alignItems={"center"}>
          <Flex gap={"5px"}>
            <CustomText
              text={"Add Comments"}
              size={"16px"}
              weight={600}
              color={"#212121"}
              h={"20px"}
            />
            <CustomText
              text={"(Optional)"}
              size={"12px"}
              weight={600}
              color={"#666"}
              h={"20px"}
            />
          </Flex>
          <Tooltip label="Add comments to provide additional context or details about your submission. This is optional but can help showcase your thought process and expertise.">
            <IconHelp size={"24px"} />
          </Tooltip>
        </Flex>

        {/* text area*/}

        <Textarea
          autoFocus={false}
          minH={"132px"}
          textColor={"#666"}
          _placeholder={{ color: "#ccc9c6" }}
          value={comment}
          onChange={(e: any) => setComment(e.target.value)}
          placeholder="Add comments here..."
        />
      </Flex>

      <Box maxWidth={"580px"} width={"100%"}>
        {/* <Link href="/task-detail/1?status=result"> */}
        <Flex
          p={{ base: "8px 40px", md: "14px 56px" }}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"30px"}
          bg={" #212121"}
          width={"100%"}
          cursor={submitFileForTaskMutation?.isPending ? "inherit" : "pointer"}
          onClick={() => handleSubmit()}
        >
          {submitFileForTaskMutation?.isPending ? (
            <Spinner color={"#FFFFFF"} size={"md"} />
          ) : (
            <CustomText
              text={"Submit File"}
              size={{ base: "16px", md: "18px" }}
              weight={600}
              color={" #FFFFFF"}
              h={"28.8px"}
            />
          )}
        </Flex>
        {/* </Link> */}
      </Box>
    </Flex>
  );
};

export default UploadFileModal;
