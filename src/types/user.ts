export interface PublicUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phoneNumber?: string;
}