import { UserRole } from "../entities/User";

export interface RegisterInput {
  fullName: string;
  username?: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateProfileInput {
  fullName?: string;
  username?: string;
  phoneNumber?: string;
  profileImage?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  bio?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateRoleInput {
  role: UserRole;
}
