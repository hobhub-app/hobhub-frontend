import PageSpinner from "@/components/atoms/PageSpinner";
import { ME_PROFILE } from "@/graphql/queries/users";
import type { MeProfileData } from "@/graphql/types/user";
import { useQuery } from "@apollo/client/react";
import { Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";

const RequireProfile = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery<MeProfileData>(ME_PROFILE);

  if (loading) {
    return <PageSpinner />;
  }

  if (error || !data) {
    return <Text>{t("alert.error_general")}</Text>;
  }

  const isProfileComplete =
    !!data.me.firstname &&
    !!data.me.lastname &&
    !!data.me.age &&
    !!data.me.location;
  // TODO: reset this
  // NOTE: hobbies check temporarily disabled, will be enforced after onboarding flow is implemented
  // data.me.hobbies.length > 0;

  if (!isProfileComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default RequireProfile;
