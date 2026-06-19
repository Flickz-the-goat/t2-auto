import { prisma } from "@/lib/prisma";
import { User } from "@auth0/nextjs-auth0/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { user }: { user: User } = await req.json()


	if (!user.email) return Response.error()

	try {
		const prismaUser = await prisma.users.create({
			data: {
				username: user.nickname || "user",
				email: user.email
			}
		})

		return Response.json({ status: "success" })
	}
	catch (e) {
		return Response.error()
	}

}
