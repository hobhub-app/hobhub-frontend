import {
  Avatar,
  Badge,
  Card,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import InlineIcon from "@/components/atoms/InlineIcon";
import { hobbyIcons } from "@/constants/hobbyIcons";
import Fyrudd from "@/assets/icons/fyrudd.svg";
import type { UserPreview } from "@/graphql/types/user";

type UserCardProps = {
  user: UserPreview;
  onClick?: () => void;
};

const UserCard = ({ user, onClick }: UserCardProps) => {
  const {
    firstname,
    lastname,
    age,
    location,
    profileImageUrl,
    profileDescription,
    hobbies,
  } = user;

  const userName =
    firstname && lastname ? `${firstname} ${lastname}` : "Unknown user";

  return (
    <Card.Root
      width="full"
      flex="1"
      bg="neutral.900"
      variant="subtle"
      border="2px solid"
      borderColor="transparent"
      transition="border-color 0.2s ease"
      cursor="pointer"
      onClick={onClick}
      _hover={{ borderColor: "purple.100" }}
      _active={{ borderColor: "purple.100" }}
    >
      <Card.Body p="4" pb="6">
        <HStack mb="4" gap="4">
          <Avatar.Root size="xl">
            <Avatar.Fallback name={userName} />
            <Avatar.Image src={profileImageUrl ?? undefined} />
          </Avatar.Root>

          <VStack gap="1" alignItems="start">
            <HStack gap="2">
              <Heading color="yellow.100" textStyle="lg">
                {userName}
              </Heading>
              <Image src={Fyrudd} width="4" />
              <Heading color="yellow.100" textStyle="lg">
                {age}
              </Heading>
            </HStack>

            {hobbies.length === 0 ? (
              <Text fontSize="xs" color="neutral.400">
                No hobbies added yet
              </Text>
            ) : (
              <HStack>
                {hobbies.slice(0, 2).map(({ id, hobby }) => (
                  <Badge
                    key={id}
                    variant="solid"
                    bg="purple.100"
                    color="purple.400"
                    size="sm"
                    px={2}
                  >
                    <Text
                      color="purple.400"
                      fontSize="xs"
                      fontFamily="heading"
                      fontWeight="600"
                    >
                      {hobby.name}
                    </Text>
                    <InlineIcon name={hobbyIcons[hobby.name] ?? "category"} />
                  </Badge>
                ))}

                {hobbies.length > 2 && (
                  <Badge
                    variant="subtle"
                    bg="purple.100"
                    color="purple.400"
                    size="sm"
                    px={2}
                  >
                    <Text fontSize="xs" fontWeight="700" color="purple.400">
                      +{hobbies.length - 2}
                    </Text>
                  </Badge>
                )}
              </HStack>
            )}
          </VStack>

          <VStack ml="auto" alignItems="center" alignSelf="start" gap="1">
            <InlineIcon
              name="distance"
              color="green.200"
              fontSize="1.5rem"
              fontWeight="300"
            />
            <Heading color="green.200" textStyle="2xs" fontWeight="500">
              {location}
            </Heading>
          </VStack>
        </HStack>

        <Card.Description color="neutral.100" fontSize="md">
          {profileDescription}
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default UserCard;
