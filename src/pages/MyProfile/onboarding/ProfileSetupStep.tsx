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
import { useRef, useState } from "react";
import { LuCamera } from "react-icons/lu";

type ProfileSetupStepProps = {
  profileImage: File | null;
  description: string;
  onProfileImageChange: (file: File | null) => void;
  onDescriptionChange: (description: string) => void;
};

const ProfileSetupStep = ({
  profileImage,
  description,
  onProfileImageChange,
  onDescriptionChange,
}: ProfileSetupStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onProfileImageChange(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onProfileImageChange(null);
    setImagePreview(null);
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
              <Avatar.Image src={imagePreview || undefined} />
            </Avatar.Root>

            {imagePreview && (
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
              {profileImage ? "Change Photo" : "Add Photo"}
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
