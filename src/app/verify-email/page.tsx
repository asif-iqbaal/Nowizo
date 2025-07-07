import { verifyEmail } from "@/lib/action/emailVerify";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const rawToken = resolvedSearchParams.token;
  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;

  let message = "Invalid request";

  if (token) {
    const res = await verifyEmail(token);
    message = res.message;
  }

  return (
    <div className="w-screen h-screen text-center p-8 text-white flex justify-center items-center">
      {message}
    </div>
  );
}
