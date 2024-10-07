import Image from "next/image";
import { Appbar } from "./components/Appbar";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Users, Radio } from "lucide-react"
import Link from "next/link"
import Redirect from "./components/Redirect";

export default function LandingPage() {
  return (
    <main className="">
      <Appbar />
      <Redirect />
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-800">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Let Fans Choose Your Stream's Soundtrack
                  </h1>
                  <p className="mx-auto max-w-[700px] text-xl text-gray-400">
                    Give your audience the power to shape your stream's vibe with StreamTunes.
                  </p>
                </div>
                <Button className="bg-purple-600 text-white hover:bg-purple-700">Get Started</Button>
              </div>
            </div>
          </section>
          <section id="features" className="w-full py-12 md:py-24 bg-gray-900">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-purple-400">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 mb-4 text-pink-500" />
                  <h3 className="text-xl font-bold mb-2 text-gray-100">Fan Engagement</h3>
                  <p className="text-gray-400">Boost interaction with song voting.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Radio className="h-12 w-12 mb-4 text-pink-500" />
                  <h3 className="text-xl font-bold mb-2 text-gray-100">Live Integration</h3>
                  <p className="text-gray-400">Seamless streaming platform integration.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Music className="h-12 w-12 mb-4 text-pink-500" />
                  <h3 className="text-xl font-bold mb-2 text-gray-100">Vast Music Library</h3>
                  <p className="text-gray-400">Millions of tracks at your fingertips.</p>
                </div>
              </div>
            </div>
          </section>
          <section id="cta" className="w-full py-12 md:py-24 bg-gray-800">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-purple-400">
                    Ready to Amplify Your Stream?
                  </h2>
                  <p className="mx-auto max-w-[600px] text-xl text-gray-300">
                    Join Musify today and revolutionize your streaming experience.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input className="max-w-lg flex-1 bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600" placeholder="Enter your email" type="email" />
                    <Button type="submit" className="bg-pink-600 text-white hover:bg-pink-700">Sign Up</Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="w-full py-6 bg-gray-900 text-center text-gray-400 border-t border-gray-800">
          <p className="text-sm">© 2024 Musify. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
