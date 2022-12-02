import { Navbar, Button } from "flowbite-react"
import { signIn, signOut } from "next-auth/react";

export default function UnAuthNavBar() {
  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0"
    >
      <Navbar.Brand href="http://localhost:3000/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          LLMHub
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 space-x-1">
        <Button
          size="sm"
          color="light"
          onClick={e => {
            e.preventDefault();
            signIn('auth0', { callbackUrl: process.env.NEXT_PUBLIC_POST_SIGNIN_URL })
          }}
        >
          Login
        </Button>
        <Button
          size="sm"
          onClick={e => {
            e.preventDefault();
            signOut({ callbackUrl: process.env.NEXT_PUBLIC_POST_SIGNOUT_URL })
          }}
        >
          Sign out
        </Button>
      </div>
    </Navbar>
  )
}