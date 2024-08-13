export interface EmailValidator {
  isValid<T>(email: T): boolean
}
