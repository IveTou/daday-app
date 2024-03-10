import { getUserDTO } from "@/data/user/user-dto"
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams
  const userId = searchParams.get('id')


  if(userId) {
    const { data } = await getUserDTO(userId)
    return Response.json({ data });
  }

  return Response.json({})
}
