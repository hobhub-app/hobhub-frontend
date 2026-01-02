import { PasswordInput } from "@/components/ui/password-input";
import { LOGIN_MUTATION } from "@/graphql/mutations/auth";
import type { LoginUserResponse } from "@/graphql/types/auth";
import { useMutation } from "@apollo/client/react";
import {
  Box,
  VStack,
  Image,
  Text,
  Button,
  Field,
  Input,
} from "@chakra-ui/react";
import FormLabel from "@/components/atoms/FormLabel";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Link from "@/components/atoms/Link";
import hobhubLogo from "@/assets/images/hobhub-logo.svg";
import InlineIcon from "@/components/atoms/InlineIcon";

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  //TODO: Refactor to hook
  const [login, { loading, error }] =
    useMutation<LoginUserResponse>(LOGIN_MUTATION);

  const onSubmit = async (input: FormValues) => {
    try {
      const { data } = await login({
        variables: { input: { email: input.email, password: input.password } },
      });

      if (data && data?.loginUser) {
        localStorage.setItem("token", data.loginUser.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack w="100%" maxW="sm" mx="auto" mt={12}>
        <Image
          src={hobhubLogo}
          alt="HobHub logo"
          boxSize="180px"
          objectFit="contain"
        />
        {/* TODO: Add login text with translation */}
        <Text fontSize="lg" textAlign="center">
          Placeholder text. Login text goes here.
        </Text>

        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDir="column"
          gap="6"
          width="full"
        >
          <VStack gap="4">
            <Field.Root required invalid={!!errors.email}>
              <FormLabel>
                {t("email_label")}{" "}
                <InlineIcon name="alternate_email" color="yellow.100" />
              </FormLabel>
              <Input
                type="email"
                placeholder={t("email_placeholder")}
                {...register("email", {
                  required: t("email_error_required"),
                })}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={!!errors.password}>
              <FormLabel>
                {t("password_label")}{" "}
                <InlineIcon name="password" color="purple.200" />
              </FormLabel>
              <PasswordInput
                placeholder={t("password_placeholder")}
                {...register("password", {
                  required: t("password_error_required"),
                  minLength: {
                    value: 8,
                    message: t("password_error_min_length"),
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message: t("password_error_complexity"),
                  },
                })}
                color="purple.200"
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>
          </VStack>
          <Button type="submit" loading={loading}>
            {t("login")}
          </Button>
          {/* TODO: Style error message properly, add it as an alert / notification? */}
          {error && <Text color="error.100">{error.message}</Text>}
        </Box>

        <Link to={"/welcome"}>
          {/* TODO: Add as translation */}
          Not your preferred way to join? Go back to options.
        </Link>
      </VStack>
    </Box>
  );
};

export default LoginPage;
