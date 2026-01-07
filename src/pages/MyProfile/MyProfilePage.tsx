import StatusAlert from "@/components/atoms/StatusAlert";
import HobbyTag from "@/components/molecules/HobbyTag";
import InfoHeader from "@/components/organisms/InfoHeader/InfoHeader";
import ProfileHeader from "@/components/organisms/ProfileHeader/ProfileHeader";
import { INFO_HEADER_HEIGHT } from "@/constants/layout";
import { ME_PROFILE } from "@/graphql/queries/users";
import type { MeProfileData } from "@/graphql/types/user";
import { useQuery } from "@apollo/client/react";
import { VStack, Heading, HStack, Card } from "@chakra-ui/react";
import formatMessageDate from "../Messages/utils/formatMessageDate";
import PageSpinner from "@/components/atoms/PageSpinner";

const MyProfilePage = () => {
  const { data, loading, error } = useQuery<MeProfileData>(ME_PROFILE);
  console.log("me data:", data);

  if (loading) return <PageSpinner />;
  if (error || !data?.me) {
    return (
      <StatusAlert
        status="error"
        title="Profile not found"
        description="Your profile could not be loaded."
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
  } = data.me;

  const userName = `${firstname} ${lastname}`;

  const memberSince = formatMessageDate(createdAt);

  return (
    <VStack gap={6} mt={INFO_HEADER_HEIGHT} pt={1.5}>
      <InfoHeader
        //TODO: Add translation
        title={<Heading>My Profile</Heading>}
        //TODO: Add settings icon
      />
      <ProfileHeader
        name={userName}
        age={age}
        location={location}
        memberSince={memberSince}
        imageUrl={profileImageUrl}
      />

      <VStack width="full" alignItems="start" gap={2} px={2}>
        {/* TODO: Add translation */}
        <Heading textStyle="md">Hobbies</Heading>
        <HStack width="full">
          {hobbies.map(({ hobby, id, skillLevel }) => {
            return (
              <HobbyTag key={id} name={hobby.name} skillLevel={skillLevel} />
            );
          })}
        </HStack>
      </VStack>

      <VStack width="full" alignItems="start" gap={2}>
        {/* TODO: Add translation */}
        <Heading textStyle="md" px={2}>
          About
        </Heading>
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

export default MyProfilePage;
