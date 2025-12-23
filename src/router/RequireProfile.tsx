import { ME_PROFILE } from "@/graphql/queries/users";
import type { MeProfileData } from "@/graphql/types/user";
import { useQuery } from "@apollo/client/react";
import { Text } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";

const RequireProfile = () => {
  const { data, loading, error } = useQuery<MeProfileData>(ME_PROFILE);
  console.log("user data", data, loading, error);
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error || !data) {
    return <Text>Something went wrong</Text>;
  }

  const isProfileComplete =
    !!data.me.firstname &&
    !!data.me.lastname &&
    !!data.me.age &&
    !!data.me.location;
  // NOTE: hobbies check temporarily disabled, will be enforced after onboarding flow is implemented
  // data.me.hobbies.length > 0;

  if (!isProfileComplete) {
    return <Navigate to="/my-profile" replace />;
  }

  return <Outlet />;
};

export default RequireProfile;
