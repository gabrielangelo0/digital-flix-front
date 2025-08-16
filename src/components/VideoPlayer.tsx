import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

const getYouTubeEmbedUrl = (url: string): string => {
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(youtubeRegex);
  
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  
  return url;
};

const VideoPlayer = ({ isOpen, onClose, videoUrl, title }: VideoPlayerProps) => {
  if (!videoUrl) return null;

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black">
        <DialogHeader className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="bg-black/50 hover:bg-black/70 text-white rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedUrl}
            title={`Trailer - ${title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;