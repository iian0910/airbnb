import { User } from "@prisma/client/index"

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string,
  updatedAt: string,
  emailVerified: string | null
}