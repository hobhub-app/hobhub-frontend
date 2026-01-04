import { useMemo } from "react";
import type { UserPreview } from "@/graphql/types/user";

type SortMode = "similar" | "nearest";

type Params = {
  users: UserPreview[];
  selectedHobbyId: number | null;
  selectedGender: string | null;
  sortMode: SortMode;
  myLocation: string | null;
};

export const useFilteredUsers = ({
  users,
  selectedHobbyId,
  selectedGender,
  sortMode,
  myLocation,
}: Params) => {
  return useMemo(() => {
    let result = [...users];

    if (selectedHobbyId) {
      result = result.filter((user) =>
        user.hobbies.some((userHobby) => userHobby.hobby.id === selectedHobbyId)
      );
    }

    if (selectedGender) {
      result = result.filter((user) => user.gender === selectedGender);
    }

    if (sortMode === "nearest" && myLocation) {
      result.sort((a, b) => {
        const aSame = a.location === myLocation;
        const bSame = b.location === myLocation;

        if (aSame !== bSame) return aSame ? -1 : 1;
        return 0;
      });
    }

    return result;
  }, [users, selectedHobbyId, selectedGender, sortMode, myLocation]);
};
