import { verifyEmail } from "@/lib/action/emailVerify"

export default async function VerifyEmailPage({ searchParams }: { searchParams: { token?: string |undefined } }) {
  const token:string|undefined =  searchParams.token;
  let message = "Invalid request"
  if (token) {
    const res = await verifyEmail(token)
    message = res.message
  }

  return <div className=" w-screen h-screen text-center p-8 text-white flex justify-center items-center">{message}</div>
}
