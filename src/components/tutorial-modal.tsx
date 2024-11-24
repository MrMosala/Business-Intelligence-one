import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Bot, Play } from "lucide-react"

export function TutorialModal() {
  const [isOpen, setIsOpen] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayVideo = () => {
    setIsPlaying(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-stone-900 dark:text-stone-50">Welcome to Our Business Intelligence Platform</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
            {isPlaying ? (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <img
                  alt="Video thumbnail"
                  className="object-cover"
                  height="338"
                  src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
                  style={{
                    aspectRatio: "600/338",
                    objectFit: "cover",
                  }}
                  width="600"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    className="rounded-full bg-stone-900/90 p-4 text-stone-50 hover:bg-stone-900/100 transition-colors dark:bg-stone-50/90 dark:text-stone-900 dark:hover:bg-stone-50/100"
                    size="icon"
                    onClick={handlePlayVideo}
                  >
                    <Play className="h-12 w-12" />
                  </Button>
                </div>
              </>
            )}
          </div>
          {!isPlaying && (
            <Button className="w-full text-lg py-6 bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90" size="lg" onClick={handlePlayVideo}>
              <Play className="mr-2 h-5 w-5" /> Watch Video Tutorial
            </Button>
          )} 
        </div>
      </DialogContent>
    </Dialog>
  )
}