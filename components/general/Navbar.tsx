import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { ThemeToggle } from "./ThemeToggle";
import { Button, buttonVariants } from "../ui/button";
import { auth, signOut } from "@/app/utils/auth";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="flex justify-between items-center py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Pixel careers Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Pixel<span className="text-primary">Careers</span>
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button>logout</Button>
          </form>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
