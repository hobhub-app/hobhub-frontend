import { PasswordInput } from "@/components/ui/password-input";
import { REGISTER_MUTATION } from "@/graphql/mutations/auth";
import type { RegisterUserResponse } from "@/graphql/types/auth";
import { useMutation } from "@apollo/client/react";
import {
  Box,
  Button,
  VStack,
  Image,
  Text,
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
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [createUser, { loading, error }] =
    useMutation<RegisterUserResponse>(REGISTER_MUTATION);

  const onSubmit = async (input: FormValues) => {
    try {
      const { data } = await createUser({
        variables: {
          input: {
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            password: input.password,
          },
        },
      });

      console.log("Register data", data);
      if (data && data?.registerUser) {
        localStorage.setItem("token", data.registerUser.token);
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
      <VStack w="full" maxW="sm" mx="auto" mt={12}>
        <Image
          src={hobhubLogo}
          alt="HobHub logo"
          boxSize="180px"
          objectFit="contain"
        />
        {/* TODO: Add register text with translation */}
        <Text fontSize="lg" textAlign="center">
          Placeholder text. Register text goes here.
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
            <Field.Root invalid={!!errors.firstname}>
              <FormLabel>
                {t("firstname_label")}{" "}
                <InlineIcon name="stylus_note" color="green.200" />
              </FormLabel>
              <Input
                type="text"
                aria-required="true"
                placeholder={t("firstname_placeholder")}
                {...register("firstname", {
                  required: t("firstname_error_required"),
                })}
              />
              <Field.ErrorText>{errors.firstname?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.lastname}>
              <FormLabel>
                {t("lastname_label")}{" "}
                <InlineIcon name="stylus_note" color="green.200" />
              </FormLabel>
              <Input
                type="text"
                aria-required="true"
                placeholder={t("lastname_placeholder")}
                {...register("lastname", {
                  required: t("lastname_error_required"),
                })}
              />
              <Field.ErrorText>{errors.lastname?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.email}>
              <FormLabel>
                {t("email_label")}
                <InlineIcon name="alternate_email" color="yellow.100" />
              </FormLabel>
              <Input
                type="email"
                aria-required="true"
                placeholder={t("email_placeholder")}
                {...register("email", {
                  required: t("email_error_required"),
                })}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.password}>
              <FormLabel>
                {t("password_label")}{" "}
                <InlineIcon name="password" color="purple.200" />
              </FormLabel>
              <PasswordInput
                aria-required="true"
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
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>
          </VStack>
          <Button type="submit" loading={loading}>
            {t("register")}
          </Button>
          {/* TODO: Style error message properly, add it as an alert/notification? */}
          {error && <span style={{ color: "red" }}>{error.message}</span>}
        </Box>

        <Link to={"/welcome"}>
          {/* TODO: Add as translation */}
          Not your preferred way to join? Go back to options.
        </Link>
      </VStack>
    </Box>
  );
};

export default RegisterPage;
