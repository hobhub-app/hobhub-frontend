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
import { BROWSE_USERS, ME_PROFILE } from "@/graphql/queries/users";
import type { MeProfileData, UsersData } from "@/graphql/types/user";
import { useNavigate } from "react-router-dom";
import StatusAlert from "@/components/atoms/StatusAlert";
import PageSpinner from "@/components/atoms/PageSpinner";
import UserCard from "@/components/molecules/UserCard";
import SortFilterPanel from "@/components/organisms/SortFilterPanel";
import { HOBBIES } from "@/graphql/queries/hobbies";
import type { HobbiesData } from "@/graphql/types/hobby";
import { useFilteredUsers } from "@/hooks/useFilteredUsers";

const HomePage = () => {
  const navigate = useNavigate();

  const [panelMode, setPanelMode] = useState<"sort" | "filter">("sort");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [sortMode, setSortMode] = useState<"similar" | "nearest">("similar");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedHobbyId, setSelectedHobbyId] = useState<number | null>(null);
  const [hobbyQuery, setHobbyQuery] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data, loading, error } = useQuery<UsersData>(BROWSE_USERS);
  const { data: hobbiesData } = useQuery<HobbiesData>(HOBBIES);
  const { data: meData } = useQuery<MeProfileData>(ME_PROFILE);

  const users = data?.browseUsers ?? [];
  const hobbies = hobbiesData?.hobbies ?? [];
  const myLocation = meData?.me.location ?? null;

  const togglePanel = (mode: "sort" | "filter") => {
    setPanelMode(mode);
    setIsPanelOpen((open) => !open);
  };

  const filteredHobbies = hobbies.filter((hobby) =>
    hobby.name.toLowerCase().includes(hobbyQuery.toLowerCase())
  );

  const filteredUsers = useFilteredUsers({
    users,
    selectedHobbyId,
    selectedGender,
    sortMode,
    myLocation,
    searchQuery,
  });

  const endElement = searchQuery ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setSearchQuery("");
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
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.currentTarget.value);
          }}
        />
      </InputGroup>
      <HStack w="full">
        {/* TODO: Add translations */}
        <Button colorPalette="green" onClick={() => togglePanel("sort")}>
          Sort
        </Button>
        <Button colorPalette="green" onClick={() => togglePanel("filter")}>
          Filter
        </Button>
      </HStack>

      <SortFilterPanel
        isOpen={isPanelOpen}
        mode={panelMode}
        selectedGender={selectedGender}
        onSelectGender={(gender) => {
          setSelectedGender(gender);
          setIsPanelOpen(false);
        }}
        hobbyQuery={hobbyQuery}
        hobbies={filteredHobbies}
        onHobbyQueryChange={setHobbyQuery}
        onSelectHobby={(id) => {
          setSelectedHobbyId(id);
          setIsPanelOpen(false);
        }}
        onSelectSort={(mode) => {
          setSortMode(mode);
          setIsPanelOpen(false);
        }}
        onClearFilters={() => {
          setSelectedGender(null);
          setSelectedHobbyId(null);
          setHobbyQuery("");
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

      {filteredUsers.map((user) => (
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
