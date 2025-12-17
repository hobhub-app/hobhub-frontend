import type { User } from "@/types/types";

export interface AuthPayload {
  token: string;
  user: User;
}

export interface RegisterUserResponse {
  registerUser: AuthPayload;
}
export interface LoginUserResponse {
  loginUser: AuthPayload;
}
