import InlineIcon from "@/components/atoms/InlineIcon";
import {
  Text,
  InputGroup,
  Input,
  CloseButton,
  HStack,
  Button,
  VStack,
  Avatar,
  Card,
  Badge,
  Heading,
  Image,
} from "@chakra-ui/react";
import Fyrudd from "@/assets/icons/fyrudd.svg";
import { useState, useRef } from "react";
import { RiSearch2Line } from "react-icons/ri";

const HomePage = () => {
  const [value, setValue] = useState("Initial value");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const endElement = value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("");
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : (
    <RiSearch2Line size={24} />
  );

  return (
    <VStack py={6} px={2} w="full" gap={2}>
      <InputGroup endElement={endElement}>
        <Input
          ref={inputRef}
          //TODO: Add translation
          placeholder="Search"
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </InputGroup>
      <HStack w="full">
        {/* TODO: Add translations */}
        <Button colorPalette="green">Sort</Button>
        <Button colorPalette="green">Filter</Button>
      </HStack>

      <Card.Root flex="1" bg="neutral.900" variant="subtle">
        <Card.Body p="4" pb="6">
          <HStack mb="4" gap="4">
            <Avatar.Root size="xl">
              <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
              <Avatar.Fallback name="Nate Foss" />
            </Avatar.Root>
            <VStack gap="1" alignItems="start">
              <HStack gap="2">
                <Heading color="yellow.100" textStyle="lg">
                  Sarah Österhed
                </Heading>
                <Image as="img" src={Fyrudd} width="4" />
                <Heading color="yellow.100" textStyle="lg">
                  35 år
                </Heading>
              </HStack>

              <HStack>
                <Badge
                  variant="solid"
                  bg="purple.100"
                  color="purple.400"
                  size="md"
                  px={2}
                >
                  <Text
                    color="purple.400"
                    fontSize="xs"
                    fontFamily="heading"
                    fontWeight="600"
                  >
                    Tennis
                  </Text>
                  <InlineIcon name="sports_tennis" />
                </Badge>
                <Badge
                  variant="solid"
                  bg="purple.100"
                  color="purple.400"
                  size="md"
                  px={2}
                >
                  <Text
                    color="purple.400"
                    fontSize="xs"
                    fontFamily="heading"
                    fontWeight="600"
                  >
                    Football
                  </Text>
                  <InlineIcon name="sports_football" />
                </Badge>
              </HStack>
            </VStack>
            <VStack ml="auto" alignItems="center" alignSelf="start" gap="1">
              <InlineIcon name="distance" color="green.200" fontSize="2rem" />
              <Heading color="green.200" textStyle="2xs">
                Knivsta
              </Heading>
            </VStack>
          </HStack>
          <Card.Description color="neutral.100" fontSize="md">
            Hej mitt namn är Sarah och jag söker någon att spela tennis med
            eller någon att lära mig snickra med. Jag är absolut nybörjare på
            snickeri, men Tennis har jag spelat förr.
          </Card.Description>
        </Card.Body>
        {/* <Card.Footer></Card.Footer> */}
      </Card.Root>
    </VStack>
  );
};

export default HomePage;
