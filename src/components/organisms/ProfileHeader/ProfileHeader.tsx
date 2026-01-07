import InlineIcon from "@/components/atoms/InlineIcon";
import {
  VStack,
  Box,
  Avatar,
  Heading,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";
import Wiggly from "@/assets/icons/wiggly-line.svg";

type ProfileHeaderProps = {
  name: string;
  age?: number | null;
  location?: string | null;
  memberSince: string;
  imageUrl?: string | null;
  actions?: React.ReactNode;
};

const ProfileHeader = ({
  name,
  age,
  location,
  memberSince,
  imageUrl,
  actions,
}: ProfileHeaderProps) => {
  return (
    <VStack
      bg="neutral.900"
      width="full"
      gap={4}
      py={6}
      px={4}
      borderRadius={4}
    >
      <Box asChild width={40}>
        <Avatar.Root size="full">
          <Avatar.Fallback name={name} />
          <Avatar.Image
            src={imageUrl ?? undefined}
            alt={`Profile image of ${name}`}
          />
        </Avatar.Root>
      </Box>
      <VStack gap={2}>
        <Heading as="h1" size="2xl">
          {name}
        </Heading>
        <HStack>
          <Image src={Wiggly} alt="Decorative wiggly line" />
          {/* TODO: Add translation */}
          <Text fontSize="lg" lineHeight={1.25} fontWeight="600">
            {age} år
          </Text>
          <Image src={Wiggly} alt="Decorative wiggly line" />
        </HStack>
      </VStack>
      <HStack gap={6}>
        <HStack gap={0.5}>
          <InlineIcon name="distance" color="green.200" fontSize="1.5rem" />
          <Text fontSize="sm">{location}</Text>
        </HStack>
        <HStack gap={1}>
          <InlineIcon name="verified" color="yellow.100" fontSize="1.5rem" />
          {/* TODO: Add translation */}
          <Text fontSize="sm">Medlem sedan: {memberSince}</Text>
        </HStack>
      </HStack>
      {actions && <Box>{actions}</Box>}
    </VStack>
  );
};

export default ProfileHeader;
