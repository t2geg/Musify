import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

const YT_REGEX = new RegExp("^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([a-zA-Z0-9_-]{11})(\S*)?$");

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = YT_REGEX.test(data.url);

        if (!isYt) {
            return NextResponse.json({
                message: "Wrong url format"
            }, {
                status: 411
            })
        }

        const extractedId = data.url.split("?v=")[1];

        const res = await youtubesearchapi.GetVideoDetails(extractedId);

        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: { width: number }, b: { width: number }) => a.width < b.width ? -1 : 1);

        const stream = await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: res.title ?? "can't find video",
                bigImg: thumbnails[thumbnails.length - 1].url ?? "https://www.istockphoto.com/photos/music",
                smallImg: thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url ?? "https://www.istockphoto.com/photos/music",
            }

        })
        return NextResponse.json({
            message: "Stream added successfully",
            id: stream.id
        })

    } catch (e) {
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 411
        })
    }


}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");

    const streams = await prismaClient.stream.findMany({
        where: {
            userId: creatorId ?? "",
        }
    });

    return NextResponse.json({
        streams
    })
}




// This api route is for stream

// Error while fetching the streams it is not returning the upvotes