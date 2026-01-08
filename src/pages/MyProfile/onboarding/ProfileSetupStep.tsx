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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [getSignature] =
    useMutation<GetUploadSignatureResult>(GET_UPLOAD_SIGNATURE);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data } = await getSignature();

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
        <Heading fontSize="lg">{t("onboarding.sub_heading.personal")}</Heading>

        <Text color="neutral.100" fontSize="sm">
          {t("onboarding.sub_content.personal")}
        </Text>
      </VStack>

      <VStack gap={4}>
        <VStack gap={3}>
          <Box asChild width={40} height={40}>
            <Avatar.Root size="full">
              <Avatar.Fallback>
                {t("onboarding.profile_image.fallback")}
              </Avatar.Fallback>
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
              {profileImageUrl
                ? t("onboarding.profile_image.change")
                : t("onboarding.profile_image.add_photo")}
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
        <Heading textStyle="md">
          {t("onboarding.sub_heading.personal_description")}
        </Heading>

        <Textarea
          placeholder={t("onboarding.sub_content.personal_placeholder")}
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

        <Text fontSize="xs">
          {description.length}
          {t("onboarding.sub_content.max_length")}
        </Text>
      </VStack>
    </VStack>
  );
};

export default ProfileSetupStep;
