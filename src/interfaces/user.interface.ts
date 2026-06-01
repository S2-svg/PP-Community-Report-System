import { UserRole } from "../entities/User";


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

export interface UpdateRoleInput {
  role: UserRole;
}
