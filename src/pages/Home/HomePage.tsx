import {
  InputGroup,
  Input,
  CloseButton,
  HStack,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useQuery } from "@apollo/client/react";
import { BROWSE_USERS } from "@/graphql/queries/users";
import type { UsersData } from "@/graphql/types/user";
import { useNavigate } from "react-router-dom";
import StatusAlert from "@/components/atoms/StatusAlert";
import PageSpinner from "@/components/atoms/PageSpinner";
import UserCard from "@/components/molecules/UserCard";
import SortFilterPanel from "@/components/organisms/SortFilterPanel";
import { HOBBIES } from "@/graphql/queries/hobbies";
import type { HobbiesData } from "@/graphql/types/hobby";

const HomePage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("Initial value");
  const [panelMode, setPanelMode] = useState<"sort" | "filter">("sort");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [hobbyQuery, setHobbyQuery] = useState("");
  const [selectedHobbyId, setSelectedHobbyId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data, loading, error } = useQuery<UsersData>(BROWSE_USERS);
  const { data: hobbiesData } = useQuery<HobbiesData>(HOBBIES);
  console.log("hobbiesData:", hobbiesData);

  const hobbies = hobbiesData?.hobbies ?? [];

  const filteredHobbies = hobbies.filter((hobby) =>
    hobby.name.toLowerCase().includes(hobbyQuery.toLowerCase())
  );

  const visibleUsers =
    data?.browseUsers.filter((user) => {
      if (!selectedHobbyId) return true;

      return user.hobbies.some(
        (userHobby) => userHobby.hobby.id === selectedHobbyId
      );
    }) ?? [];

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

  if (loading) {
    return <PageSpinner />;
  }

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
        <Button
          colorPalette="green"
          onClick={() => {
            setPanelMode("sort");
            setIsPanelOpen((open) => !open);
          }}
        >
          Sort
        </Button>
        <Button
          colorPalette="green"
          onClick={() => {
            setPanelMode("filter");
            setIsPanelOpen((open) => !open);
          }}
        >
          Filter
        </Button>
      </HStack>

      <SortFilterPanel
        isOpen={isPanelOpen}
        mode={panelMode}
        hobbyQuery={hobbyQuery}
        hobbies={filteredHobbies}
        onHobbyQueryChange={setHobbyQuery}
        onSelectHobby={(id) => {
          setSelectedHobbyId(id);
          setIsPanelOpen(false);
        }}
        onSelectSort={(mode) => {
          console.log("Selected sort:", mode);
          setIsPanelOpen(false);
        }}
      />

      {error && (
        <StatusAlert
          status="error"
          colorPalette="red"
          title="Something went wrong"
          description="We couldn’t load users right now. Please try again."
        />
      )}

      {!error && data?.browseUsers.length === 0 && (
        <StatusAlert
          status="info"
          colorPalette="yellow"
          //TODO: Add translation
          title="No users found"
        />
      )}

      {visibleUsers.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onClick={() => navigate(`/profile/${user.id}`)}
        />
      ))}
    </VStack>
  );
};

export default HomePage;
