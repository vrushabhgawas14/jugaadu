"use client";
import { FormButton } from "@/components/FormButton";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  isLogin?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  greenText: string;
}

export default function LoginRegisterForm({
  isLogin,
}: // handleSubmit,
// error,
// greenText,
Props) {
  // const isSuccessfull = error === greenText; // Just for green text color
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex items-center justify-center my-10 px-8 min-w-screen text-zinc-200">
      <section className="flex flex-col items-center p-4 bg-background-mid rounded-xl w-96">
        <h1 className="text-3xl font-bold">
          {isLogin ? "Login" : "Registration"}
        </h1>
        <div className="py-6 w-[95%] flex flex-col items-center space-y-2">
          {/* <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-4"
          >
            <div className="flex items-center justify-center font-semibold space-x-4">
              <label htmlFor="userEmail" className="text-xl cursor-pointer">
                Email :
              </label>
              <input
                id="userEmail"
                name="userEmail"
                type="text"
                required
                placeholder="Enter Email"
                className="px-2 py-1 rounded-xl text-teal-900 sm:w-40"
              />
            </div>
            <div className="flex items-center justify-center font-semibold space-x-4 pb-2">
              <label htmlFor="userPassword" className="text-xl cursor-pointer">
                Pass :
              </label>
              <input
                id="userPassword"
                name="userPassword"
                type="password"
                required
                placeholder="Enter Password"
                className="px-2 py-1 rounded-xl text-teal-900 sm:w-40"
              />
            </div>
            <FormButton
              type="submit"
              text={isLogin ? "Login" : "Create Account"}
            />
            {error && (
              <p
                className={`text-center bg-gray-200 px-2 py-1 rounded-2xl line-clamp-4 ${
                  isSuccessfull ? "text-green-700" : "text-red-600"
                }`}
              >
                {error}
              </p>
            )}
          </form>
          <p className="font-bold">Or</p> */}
          <div onClick={() => setLoading(!loading)}>
            <FormButton
              text={`${isLogin ? "Sign in" : "Continue"} with Google`}
              onClick={() => signIn("google")}
              loading={loading}
            />
          </div>
          <div>
            {isLogin ? (
              <div className="py-2">
                Don&apos;t have an account?
                <Link href="/register" className="pl-1 font-bold underline">
                  Register
                </Link>
              </div>
            ) : (
              <div className="py-2">
                Already have an account?
                <Link href="/login" className="pl-1 font-bold underline">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* <div className="text-center underline">
          <Link href="/">Back To Home</Link>
        </div> */}
      </section>
    </main>
  );
}
