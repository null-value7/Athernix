export type AuthFormType = 'sign-in' | 'sign-up' | 'recover-password'

export interface AuthFormProps {
  setTypeSelected: (type: AuthFormType) => void
}
