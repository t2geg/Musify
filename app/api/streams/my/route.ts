import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession();

    //get rid of db call here by storing the user
    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    });

    if (!user) {
        return NextResponse.json({
            message: "Unauthenticated"
        }, {
            status: 403
        })
    }

    const streams = await prismaClient.stream.findMany({
        where: {
            userId: user.id
        },
        include: {
            upvotes: true,  // Include upvotes for each stream
        }
    })


    return NextResponse.json({
        streams
    })
}