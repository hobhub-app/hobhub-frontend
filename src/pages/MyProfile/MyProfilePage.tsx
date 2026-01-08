import StatusAlert from "@/components/atoms/StatusAlert";
import HobbyTag from "@/components/molecules/HobbyTag";
import InfoHeader from "@/components/organisms/InfoHeader/InfoHeader";
import ProfileHeader from "@/components/organisms/ProfileHeader/ProfileHeader";
import { INFO_HEADER_HEIGHT } from "@/constants/layout";
import { ME_PROFILE } from "@/graphql/queries/users";
import type { MeProfileData } from "@/graphql/types/user";
import { useQuery } from "@apollo/client/react";
import {
  VStack,
  Heading,
  HStack,
  Card,
  CloseButton,
  Dialog,
  Portal,
  Box,
  Text,
} from "@chakra-ui/react";
import formatMessageDate from "../Messages/utils/formatMessageDate";
import PageSpinner from "@/components/atoms/PageSpinner";
import InlineIcon from "@/components/atoms/InlineIcon";
import { useState } from "react";
import LanguageSwitch from "@/components/molecules/LanguageSwitch";
import { useTranslation } from "react-i18next";

const MyProfilePage = () => {
  const [open, setOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const { data, loading, error } = useQuery<MeProfileData>(ME_PROFILE);

  if (loading) return <PageSpinner />;
  if (error || !data?.me) {
    return (
      <StatusAlert
        status="error"
        title={t("my_profile.error")}
        description={t("my_profile.error_description")}
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
      <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <InfoHeader
          title={<Heading>{t("my_profile.heading")}</Heading>}
          right={
            <Dialog.Trigger asChild>
              <Box as="button" cursor="pointer">
                <InlineIcon
                  name="manage_accounts"
                  color="green.200"
                  fontSize="2xl"
                />
              </Box>
            </Dialog.Trigger>
          }
        />
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content bg="neutral.800">
              <Dialog.Header asChild pb={1}>
                <Dialog.Title
                  fontFamily="heading"
                  fontWeight="800"
                  textStyle="lg"
                >
                  {t("my_profile.settings.title")}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack alignItems="start" gap={8}>
                  <VStack alignItems="start">
                    <Text fontSize="md">
                      {t("profile.settings.language_label", {
                        language: t(`profile.languages.${i18n.language}`),
                      })}
                    </Text>
                    <LanguageSwitch />
                  </VStack>
                </VStack>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild color="purple.200">
                <CloseButton size="md" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <ProfileHeader
        name={userName}
        age={age}
        location={location}
        memberSince={memberSince}
        imageUrl={profileImageUrl}
      />

      <VStack width="full" alignItems="start" gap={2} px={2}>
        <Heading textStyle="md">{t("my_profile.sub_heading.hobbies")}</Heading>
        <HStack width="full">
          {hobbies.map(({ hobby, id, skillLevel }) => {
            return (
              <HobbyTag key={id} name={hobby.name} skillLevel={skillLevel} />
            );
          })}
        </HStack>
      </VStack>

      <VStack width="full" alignItems="start" gap={2}>
        <Heading textStyle="md" px={2}>
          {t("my_profile.sub_heading.about")}
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
