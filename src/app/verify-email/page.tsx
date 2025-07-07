import { verifyEmail } from "@/lib/action/emailVerify";

type PageProps = {
  searchParams: {
    token?: string;
  };
};

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const token =  searchParams.token;
  let message = "Invalid request"
  if (token) {
    const res = await verifyEmail(token)
    message = res.message
  }

  return <div className=" w-screen h-screen text-center p-8 text-white flex justify-center items-center">{message}</div>
}
