import PageSpinner from "@/components/atoms/PageSpinner";
import StatusAlert from "@/components/atoms/StatusAlert";
import { USER_BY_ID } from "@/graphql/queries/users";
import type { UserData } from "@/graphql/types/user";
import { useQuery } from "@apollo/client/react";
import {
  Heading,
  VStack,
  Avatar,
  Card,
  HStack,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import Wiggly from "@/assets/icons/wiggly-line.svg";

import { useParams } from "react-router-dom";
import InlineIcon from "@/components/atoms/InlineIcon";
import formatMessageDate from "../Messages/utils/formatMessageDate";
import SkillLevelGuide from "@/components/molecules/SkillLevelGuide";
import HobbyTag from "@/components/molecules/HobbyTag";

const UserProfilePage = () => {
  const { userId } = useParams();

  const { data, loading, error } = useQuery<UserData>(USER_BY_ID, {
    variables: { id: Number(userId) },
  });
  console.log("data:", data);

  if (loading) return <PageSpinner />;
  if (error || !data?.user) {
    return (
      <StatusAlert
        status="error"
        title="User not found"
        description="This profile could not be loaded."
      />
    );
  }

  const {
    firstname,
    lastname,
    profileImageUrl,
    age,
    location,
    profileDescription,
    hobbies,
    createdAt,
  } = data.user;

  const userName =
    firstname && lastname ? `${firstname} ${lastname}` : "Unknown user";

  const memberSince = formatMessageDate(createdAt);

  return (
    <VStack gap={6}>
      <VStack
        bg="neutral.900"
        width="full"
        gap={4}
        py={6}
        px={4}
        borderRadius={1}
      >
        <Box asChild width={40}>
          <Avatar.Root size="full">
            <Avatar.Fallback name={userName} />
            <Avatar.Image
              src={profileImageUrl ?? undefined}
              alt={`Profile image of ${userName}`}
            />
          </Avatar.Root>
        </Box>
        <VStack gap={2}>
          <Heading as="h1" size="2xl">
            {userName}
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
      </VStack>

      <VStack width="full" alignItems="start" gap={2}>
        {/* TODO: Add translation */}
        <Heading textStyle="md">Hobbies</Heading>
        <HStack width="full">
          {hobbies.map(({ hobby, id, skillLevel }) => {
            return (
              <HobbyTag key={id} name={hobby.name} skillLevel={skillLevel} />
            );
          })}
        </HStack>

        <SkillLevelGuide />
      </VStack>

      <VStack width="full" alignItems="start" gap={2}>
        {/* TODO: Add translation */}
        <Heading textStyle="md">About</Heading>
        <Card.Root
          width="full"
          flex="1"
          bg="neutral.900"
          variant="subtle"
          borderRadius={1}
        >
          <Card.Body p={4} pb={6}>
            <Card.Description color="neutral.100" fontSize="md">
              {profileDescription}
            </Card.Description>
          </Card.Body>
        </Card.Root>
      </VStack>
    </VStack>
  );
};

export default UserProfilePage;
