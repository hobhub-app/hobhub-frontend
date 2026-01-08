import InfoHeader from "@/components/organisms/InfoHeader/InfoHeader";
import { INFO_HEADER_HEIGHT } from "@/constants/layout";
import { Button, ButtonGroup, Heading, Steps, VStack } from "@chakra-ui/react";
import { useState } from "react";
import BasicInfoStep from "./BasicInfoStep";
import HobbiesStep from "./HobbiesStep";
import ProfileSetupStep from "./ProfileSetupStep";
import { COMPLETE_ONBOARDING } from "@/graphql/mutations/users";
import type { CompleteOnboardingResult } from "@/graphql/types/user";
import { useMutation } from "@apollo/client/react";
import StatusAlert from "@/components/atoms/StatusAlert";
import { ME_PROFILE } from "@/graphql/queries/users";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OnboardingPage = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(0);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState<
    { value: string; label: string; skillLevel: string }[]
  >([]);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [completeOnboarding, { loading, error }] =
    useMutation<CompleteOnboardingResult>(COMPLETE_ONBOARDING);

  const isStepOneValid = !!dateOfBirth && !!location;
  const isStepTwoValid = selectedHobbies.length > 0;

  const isNextDisabled =
    (currentStep === 0 && !isStepOneValid) ||
    (currentStep === 1 && !isStepTwoValid);

  const canGoBack = currentStep > 0;
  const canGoNext = currentStep < 2 && !isNextDisabled;
  const isLastStep = currentStep === 2;

  const handleNext = () => {
    if (canGoNext) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canGoBack) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    if (!dateOfBirth) return;

    const result = await completeOnboarding({
      variables: {
        input: {
          dateOfBirth,
          location,
          gender,
          profileDescription: description,
          profileImageUrl,
          hobbies: selectedHobbies.map((h) => ({
            hobbyId: Number(h.value),
            skillLevel: h.skillLevel,
          })),
        },
      },
      refetchQueries: [{ query: ME_PROFILE }],
    });

    if (result.data) {
      setShowSuccessAlert(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  if (showSuccessAlert) {
    return (
      <StatusAlert
        status="success"
        title={t("onboarding.alerts.success")}
        description={t("onboarding.alerts.success_description")}
      />
    );
  }

  if (error) {
    return (
      <StatusAlert
        status="error"
        title={t("onboarding.alerts.error")}
        description={t("onboarding.alerts.error_description")}
      />
    );
  }

  return (
    <VStack gap={6} mt={INFO_HEADER_HEIGHT} pt={1.5}>
      <InfoHeader title={<Heading>{t("onboarding.heading")}</Heading>} />

      <VStack w="full" px={2} pt={2}>
        <Steps.Root step={currentStep} count={3} variant="subtle">
          <Steps.List>
            <Steps.Item index={0}>
              <Steps.Indicator bg="purple.200" />
              <Steps.Trigger>
                {t("onboarding.indicators.general")}
              </Steps.Trigger>
            </Steps.Item>

            <Steps.Item index={1}>
              <Steps.Indicator bg="purple.200" />
              <Steps.Trigger disabled={!isStepOneValid}>
                {t("onboarding.indicators.hobbies")}
              </Steps.Trigger>
            </Steps.Item>

            <Steps.Item index={2}>
              <Steps.Indicator bg="purple.200" />
              <Steps.Trigger disabled={!isStepTwoValid}>
                {t("onboarding.indicators.personal")}
              </Steps.Trigger>
            </Steps.Item>
          </Steps.List>

          <Steps.Content index={0}>
            <BasicInfoStep
              dateOfBirth={dateOfBirth}
              gender={gender}
              location={location}
              onDateOfBirthChange={setDateOfBirth}
              onGenderChange={setGender}
              onLocationChange={setLocation}
            />
          </Steps.Content>

          <Steps.Content index={1}>
            <HobbiesStep
              selectedHobbies={selectedHobbies}
              onChange={setSelectedHobbies}
            />
          </Steps.Content>

          <Steps.Content index={2}>
            <ProfileSetupStep
              profileImageUrl={profileImageUrl}
              description={description}
              onProfileImageChange={setProfileImageUrl}
              onDescriptionChange={setDescription}
            />
          </Steps.Content>

          <ButtonGroup>
            <Button onClick={handlePrev} disabled={!canGoBack}>
              {t("actions.back")}
            </Button>

            {isLastStep ? (
              <Button
                onClick={handleFinish}
                colorPalette="green"
                variant="solid"
                loading={loading}
              >
                {t("actions.save_profile")}
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!canGoNext}>
                {t("actions.next")}
              </Button>
            )}
          </ButtonGroup>
        </Steps.Root>
      </VStack>
    </VStack>
  );
};

export default OnboardingPage;
