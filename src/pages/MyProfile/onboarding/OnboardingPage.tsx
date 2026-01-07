import InfoHeader from "@/components/organisms/InfoHeader/InfoHeader";
import { INFO_HEADER_HEIGHT } from "@/constants/layout";
import { Button, ButtonGroup, Heading, Steps, VStack } from "@chakra-ui/react";
import { useState } from "react";
import BasicInfoStep from "./BasicInfoStep";
import HobbiesStep from "./HobbiesStep";
import ProfileSetupStep from "./ProfileSetupStep";

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [age, setAge] = useState<number | null>(null);
  const [location, setLocation] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState<
    { value: string; label: string; skillLevel: string }[]
  >([]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  console.log("selected hobbies", selectedHobbies);

  const isStepOneValid = !!age && !!location;
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
    // TODO: Save to backend
    console.log("Finishing onboarding with data:", {
      age,
      location,
      hobbies: selectedHobbies,
      profileImage,
      description,
    });

    // Navigate to home page
  };

  return (
    <VStack gap={6} mt={INFO_HEADER_HEIGHT} pt={1.5}>
      <InfoHeader title={<Heading>Complete your profile</Heading>} />

      <VStack w="full" px={2} pt={2}>
        <Steps.Root step={currentStep} count={3} variant="subtle">
          <Steps.List>
            <Steps.Item index={0}>
              <Steps.Indicator bg="purple.200" />
              {/* TODO: Add translation */}
              <Steps.Trigger>Info</Steps.Trigger>
            </Steps.Item>

            <Steps.Item index={1}>
              <Steps.Indicator bg="purple.200" />
              {/* TODO: Add translation */}
              <Steps.Trigger disabled={!isStepOneValid}>Hobbies</Steps.Trigger>
            </Steps.Item>

            <Steps.Item index={2}>
              <Steps.Indicator bg="purple.200" />
              {/* TODO: Add translation */}
              <Steps.Trigger disabled={!isStepTwoValid}>Details</Steps.Trigger>
            </Steps.Item>
          </Steps.List>

          <Steps.Content index={0}>
            <BasicInfoStep
              age={age}
              location={location}
              onAgeChange={setAge}
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
              profileImage={profileImage}
              description={description}
              onProfileImageChange={setProfileImage}
              onDescriptionChange={setDescription}
            />
          </Steps.Content>

          <ButtonGroup>
            {/* TODO: Add translation */}
            <Button onClick={handlePrev} disabled={!canGoBack}>
              Back
            </Button>

            {isLastStep ? (
              <Button
                onClick={handleFinish}
                colorPalette="green"
                variant="solid"
              >
                {/* TODO: Add translation */}
                Save Profile
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!canGoNext}>
                {/* TODO: Add translation */}
                Next
              </Button>
            )}
          </ButtonGroup>
        </Steps.Root>
      </VStack>
    </VStack>
  );
};

export default OnboardingPage;
