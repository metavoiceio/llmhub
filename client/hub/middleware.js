export { default } from "next-auth/middleware"

// protects all pages & API routes except /, /auth/signIn, /auth/register, /auth/signOut
export const config = { matcher: ['/((?!auth).*)(.+)'] }
