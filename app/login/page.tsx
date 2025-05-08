"use client"
import { login } from "@/app/login/actions"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function Login() {
  const [withToken, setWithToken] = useState(true)
  const searchParams = useSearchParams()

  const error = searchParams.get("error")
  return (
    <div className="flex h-svh items-center justify-center">
      <div className="flex w-full max-w-lg flex-col rounded-lg border border-zinc-600 p-8">
        <div className="mb-5">
          <h3 className="text-center text-xl">Login</h3>
          <p className="text-red text-center text-red-400">{error}</p>
        </div>

        <form className="flex flex-col" action={login}>
          {withToken ? (
            <input
              name="token"
              type="text"
              required
              placeholder="Token"
              className="mb-3 rounded border border-zinc-700 p-2"
            />
          ) : (
            <>
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="mb-3 rounded border border-zinc-700 p-2"
              />
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                className="mb-3 rounded border border-zinc-700 p-2"
              />
            </>
          )}
          <button
            type="submit"
            className="mt-5 mb-2 w-full cursor-pointer rounded bg-blue-600 p-2 transition-colors hover:bg-blue-700"
          >
            LOGIN
          </button>
          <button
            type="button"
            onClick={() => setWithToken(!withToken)}
            className="cursor-pointer"
          >
            Login with {withToken ? "email" : "token"}
          </button>
        </form>
      </div>
    </div>
  )
}
