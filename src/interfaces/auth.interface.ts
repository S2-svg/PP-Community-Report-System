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

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}
