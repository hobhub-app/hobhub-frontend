import { GET_UPLOAD_SIGNATURE } from "@/graphql/mutations/uploads";
import type { GetUploadSignatureResult } from "@/graphql/types/upload";
import { uploadToCloudinarySigned } from "@/utils/uploadToCloudinarySigned";
import { useMutation } from "@apollo/client/react";
import {
  VStack,
  Heading,
  Text,
  Button,
  Textarea,
  Avatar,
  Box,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { LuCamera } from "react-icons/lu";

type ProfileSetupStepProps = {
  profileImageUrl: string | null;
  description: string;
  onProfileImageChange: (url: string | null) => void;
  onDescriptionChange: (description: string) => void;
};

const ProfileSetupStep = ({
  profileImageUrl,
  description,
  onProfileImageChange,
  onDescriptionChange,
}: ProfileSetupStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [getSignature] =
    useMutation<GetUploadSignatureResult>(GET_UPLOAD_SIGNATURE);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data } = await getSignature();
    console.log("UPLOAD SIGNATURE", data);

    if (!data) {
      throw new Error("No upload signature returned");
    }

    const url = await uploadToCloudinarySigned(file, data.getUploadSignature);
    onProfileImageChange(url);
  };

  const handleRemoveImage = () => {
    onProfileImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <VStack align="stretch" gap={6}>
      <VStack align="start">
        {/* TODO: Add translation */}
        <Heading fontSize="lg">Finalize your profile</Heading>

        {/* TODO: Add translation */}
        <Text color="neutral.100" fontSize="sm">
          Make your profile stand out! Adding a profile picture and description
          helps you get more connections. Your photo appears in search results
          and your description shows on your profile page.
        </Text>
      </VStack>

      <VStack gap={4}>
        <VStack gap={3}>
          <Box asChild width={40} height={40}>
            <Avatar.Root size="full">
              <Avatar.Fallback>Profile image</Avatar.Fallback>
              <Avatar.Image src={profileImageUrl || undefined} />
            </Avatar.Root>

            {profileImageUrl && (
              <Button
                position="absolute"
                top={-2}
                right={-2}
                size="xs"
                variant="surface"
                colorPalette="red"
                onClick={handleRemoveImage}
                borderRadius="full"
              >
                ×
              </Button>
            )}
          </Box>

          <HStack gap={2}>
            <Button
              variant="plain"
              size="sm"
              colorPalette="purple"
              onClick={triggerFileInput}
            >
              <LuCamera />
              {profileImageUrl ? "Change Photo" : "Add Photo"}
            </Button>
          </HStack>
        </VStack>

        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          display="none"
        />
      </VStack>

      <VStack gap={3} align="stretch">
        {/* TODO: Add translation */}
        <Heading textStyle="md">Profile Description</Heading>

        <Textarea
          placeholder="Tell others about yourself, your interests, or what you're looking for in a hobby buddy..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={4}
          resize="vertical"
          bg="neutral.100"
          color="neutral.900"
          borderColor="purple.200"
          _focus={{
            borderColor: "purple.300",
          }}
        />

        <Text fontSize="xs">{description.length}/500 characters</Text>
      </VStack>
    </VStack>
  );
};

export default ProfileSetupStep;
