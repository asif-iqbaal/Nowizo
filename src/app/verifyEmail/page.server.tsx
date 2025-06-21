import { verifyEmail } from "@/lib/action/emailVerify"

export default async function VerifyEmailPage({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token
  let message = "Invalid request"

  if (token) {
    const res = await verifyEmail(token)
    message = res.message
  }

  return <div className="text-center p-8">{message}</div>
}
