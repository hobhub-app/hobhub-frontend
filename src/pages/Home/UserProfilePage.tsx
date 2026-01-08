import PageSpinner from "@/components/atoms/PageSpinner";
import StatusAlert from "@/components/atoms/StatusAlert";
import { USER_BY_ID } from "@/graphql/queries/users";
import type { UserData } from "@/graphql/types/user";
import { useQuery } from "@apollo/client/react";
import {
  Heading,
  VStack,
  Card,
  HStack,
  Box,
  Button as ChakraButton,
} from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router-dom";
import formatMessageDate from "../Messages/utils/formatMessageDate";
import SkillLevelGuide from "@/components/molecules/SkillLevelGuide";
import HobbyTag from "@/components/molecules/HobbyTag";
import ProfileHeader from "@/components/organisms/ProfileHeader/ProfileHeader";
import BackButton from "@/components/atoms/BackButton";
import InfoHeader from "@/components/organisms/InfoHeader/InfoHeader";
import { INFO_HEADER_HEIGHT } from "@/constants/layout";
import { useTranslation } from "react-i18next";

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<UserData>(USER_BY_ID, {
    variables: { id: Number(userId) },
  });

  if (loading) return <PageSpinner />;
  if (error || !data?.user) {
    return (
      <StatusAlert
        status="error"
        title={t("profile.alerts.error")}
        description={t("profile.alerts.error_description")}
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
    <VStack gap={6} mt={INFO_HEADER_HEIGHT} pt={1.5}>
      <InfoHeader
        left={<BackButton />}
        title={<Heading textStyle="md">{userName}</Heading>}
      />
      <ProfileHeader
        name={userName}
        age={age}
        location={location}
        memberSince={memberSince}
        imageUrl={profileImageUrl}
      />

      <VStack width="full" alignItems="start" gap={2} px={2}>
        <Heading textStyle="md">{t("profile.sub_heading.hobbies")}</Heading>
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
        <Heading textStyle="md" px={2}>
          {t("profile.sub_heading.about")}
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
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        zIndex={1000}
        bg="neutral.800"
        px={2}
        pb={8}
      >
        <ChakraButton
          width="full"
          colorPalette="purple"
          onClick={() => navigate(`/messages/new?userId=${userId}`)}
        >
          {t("actions.start_chat")}
        </ChakraButton>
      </Box>
    </VStack>
  );
};

export default UserProfilePage;
