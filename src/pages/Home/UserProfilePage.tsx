import PageSpinner from "@/components/atoms/PageSpinner";
import StatusAlert from "@/components/atoms/StatusAlert";
import { USER_BY_ID } from "@/graphql/queries/users";
import type { UserData } from "@/graphql/types/user";
import { useQuery } from "@apollo/client/react";
import { Heading, VStack, Card, HStack } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import formatMessageDate from "../Messages/utils/formatMessageDate";
import SkillLevelGuide from "@/components/molecules/SkillLevelGuide";
import HobbyTag from "@/components/molecules/HobbyTag";
import ProfileHeader from "@/components/organisms/ProfileHeader/ProfileHeader";

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
      <ProfileHeader
        name={userName}
        age={age}
        location={location}
        memberSince={memberSince}
        imageUrl={profileImageUrl}
      />

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
          borderRadius={4}
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
