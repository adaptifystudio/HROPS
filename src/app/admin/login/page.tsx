"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


export default function RegistrationFormWithImages() {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
      <Form />
      <div className="relative z-20 hidden w-full items-center justify-center overflow-hidden border-l border-neutral-100 bg-white md:flex dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-sm">
  <p
    className={cn(
      "text-center text-xl font-semibold text-red-600 dark:text-red-500"
    )}
  >
    ⚠️ Restricted Area
  </p>
  <p
    className={cn(
      "mt-8 text-center text-base font-normal text-neutral-500 dark:text-neutral-400"
    )}
  >
    This page is for administrators only. If you are not authorized, leave immediately or access will be denied.
  </p>
</div>


        <GridLineHorizontal
          className="left-1/2 top-4 -translate-x-1/2"
          offset="-10px"
        />
        <GridLineHorizontal
          className="bottom-4 left-1/2 top-auto -translate-x-1/2"
          offset="-10px"
        />
        <GridLineVertical
          className="left-10 top-1/2 -translate-y-1/2"
          offset="-10px"
        />
        <GridLineVertical
          className="left-auto right-10 top-1/2 -translate-y-1/2"
          offset="-10px"
        />
       
      </div>
    </div>
  );
}



export  function Form() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (username === "FaycalAdmin" && password === "FaycalHrops2025@") {
      localStorage.setItem("admin-auth", "true");

      toast.success("Welcome Admin ✅", {
        description: "Redirecting to dashboard...",
      });

      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } else {
      toast.error("Access Denied ❌", {
        description: "Invalid username or password",
      });
    }
  }

  return (
    <form className="bg-gray-50 dark:bg-neutral-950" onSubmit={onSubmit}>
      <div className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div>
            <div className="flex">
              <Logo />
            </div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
              Welcome Back! Faycal Khadad (Admin)
            </h2>
          </div>

          <div className="mt-10 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-400"
              >
                Username
              </label>
              <input
                id="name"
                type="text"
                placeholder="Admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-400"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="relative z-10 flex w-full items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:shadow-xl"
            >
              Log In
            </button>

            <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
              You're an admin and something is wrong? Click{" "}
              <Link href="/contact" className="text-black dark:text-white">
                here
              </Link>
            </p>

            <div className="relative mt-10">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-neutral-300 dark:border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-gray-50 px-6 text-neutral-400 dark:bg-neutral-950 dark:text-neutral-500">
                  Or Click On
                </span>
              </div>
            </div>

            <div className="mt-6 flex w-full items-center justify-center">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="relative z-10 flex w-full items-center justify-center rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white transition duration-200 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:shadow-xl"
              >
                <span className="text-sm font-semibold leading-6">Leave</span>
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
              By clicking on log in, You Entre to our{" "}
              <Link href="#" className="text-neutral-500 dark:text-neutral-300">
                Admin Dashboard
              </Link>{" "}
             
              
              .
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}


const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="/images/logo-2.png"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-black dark:text-white">HROPS</span>
    </Link>
  );
};



const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
