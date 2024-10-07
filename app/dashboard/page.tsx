"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Play, Pause, Share2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import axios from "axios"

interface Video {
    id: string
    title: string
    votes: number
}

const REFRESH_INTERVAL_MS = 10 * 1000;

export default function Component() {
    const [videoLink, setVideoLink] = useState("")
    const [previewId, setPreviewId] = useState("")
    const [queue, setQueue] = useState<Video[]>([
        { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", votes: 5 },
        { id: "9bZkp7q19f0", title: "PSY - GANGNAM STYLE", votes: 3 },
        { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee", votes: 2 },
    ])
    const [currentVideo, setCurrentVideo] = useState("dQw4w9WgXcQ")
    const [isPlaying, setIsPlaying] = useState(true)


    async function refreshStreams() {
        const res = await axios.get(`/api/streams/my`)
        console.log(res)
    }


    useEffect(() => {
        refreshStreams();
        const interval = setInterval(() => {

        }, REFRESH_INTERVAL_MS)
    }, [])


    const extractVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : null
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const videoId = extractVideoId(videoLink)
        if (videoId) {
            setQueue([...queue, { id: videoId, title: "New Video", votes: 0 }])
            setVideoLink("")
            setPreviewId("")
        }
    }

    const handlePreview = () => {
        const videoId = extractVideoId(videoLink)
        if (videoId) {
            setPreviewId(videoId)
        }
    }

    const handleVote = (id: string, increment: number) => {
        setQueue(
            queue
                .map((video) => (video.id === id ? { ...video, votes: video.votes + increment } : video))
                .sort((a, b) => b.votes - a.votes)
        )
    }

    const handleShare = async () => {
        const shareData = {
            title: 'Stream Song Voter',
            text: 'Vote for the next song on the stream!',
            url: window.location.href
        }

        try {
            if (navigator.share) {
                await navigator.share(shareData)
                toast({
                    title: "Shared successfully!",
                    description: "The link has been shared.",
                })
            } else {
                await navigator.clipboard.writeText(window.location.href)
                toast({
                    title: "Link copied!",
                    description: "The link has been copied to your clipboard.",
                })
            }
        } catch (err) {
            toast({
                title: "Error sharing",
                description: "There was an error sharing the link.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-[rgb(10,10,10)] text-gray-200">
            <header className="py-6 bg-[rgb(20,20,20)]">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-purple-400">Streamify</h1>
                    <Button
                        onClick={handleShare}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                    </Button>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=0`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <Button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                                {isPlaying ? "Pause" : "Play"}
                            </Button>
                            <Button
                                onClick={() => setCurrentVideo(queue[0]?.id)}
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                Next Song
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="text"
                                placeholder="Enter YouTube video link"
                                value={videoLink}
                                onChange={(e) => setVideoLink(e.target.value)}
                                className="bg-[rgb(30,30,30)] border-gray-700 text-white placeholder-gray-400"
                            />
                            <div className="flex justify-center space-x-4">
                                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Add to Queue</Button>
                                <Button type="button" onClick={handlePreview} className="bg-blue-600 hover:bg-blue-700 text-white">Preview</Button>
                            </div>
                        </form>

                        {previewId && (
                            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${previewId}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-purple-400">Upcoming Songs</h2>
                        {queue.map((video) => (
                            <Card key={video.id} className="bg-[rgb(20,20,20)] border-gray-800">
                                <CardContent className="flex items-center justify-between p-4">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                                            alt={video.title}
                                            className="w-24 h-18 object-cover rounded-md"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-purple-300">{video.title}</h3>
                                            <p className="text-gray-400">Votes: {video.votes}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handleVote(video.id, 1)}
                                            aria-label="Upvote"
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            <ThumbsUp className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleVote(video.id, -1)}
                                            aria-label="Downvote"
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            <ThumbsDown className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}