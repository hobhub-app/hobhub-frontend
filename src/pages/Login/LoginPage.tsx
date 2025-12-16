import { PasswordInput } from "@/components/ui/password-input";
import { LOGIN_MUTATION } from "@/graphql/mutations/auth";
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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

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

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const onSubmit = async (input: FormValues) => {
    console.log("onSubmit");
    try {
      const { data } = await login({
        variables: { input: { email: input.email, password: input.password } },
      });
      console.log("Login result", data);

      localStorage.setItem("token", data.loginUser.token);
      navigate("/");
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
          src="src/assets/images/hubhob-logo.svg"
          alt="HobHub logo"
          boxSize="115px"
          objectFit="contain"
        />
        {/* TODO: Add login text with translation */}
        <Text fontSize="lg" textAlign="center">
          Placeholder text. Login text goes here.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <Field.Root required invalid={!!errors.email}>
              <Field.Label>{t("email_label")}</Field.Label>
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
              <Field.Label>{t("password_label")}</Field.Label>
              <PasswordInput
                placeholder="••••••••••••"
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
            {t("login")}
          </Button>
          {error && <span style={{ color: "red" }}>{error.message}</span>}
        </form>

        <Link to={"/welcome"}>
          {/* TODO: Add as translation */}
          Not your preferred way to join? Go back to options.
        </Link>
      </VStack>
    </Box>
  );
};

export default LoginPage;
