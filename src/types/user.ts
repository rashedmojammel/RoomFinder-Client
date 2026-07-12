export type Role = "admin" | "owner" | "tenant";

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phoneNumber?: string;
  role?: string;
  banned?: boolean;
  createdAt?: string;
}