import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Maximize, 
  Settings,
  SkipBack,
  SkipForward
} from "lucide-react";

const getYouTubeEmbedUrl = (url: string): string => {
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(youtubeRegex);
  
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0&controls=1&showinfo=0&modestbranding=1`;
  }
  
  return url;
};

const WatchNow = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("id");
  const movieTitle = searchParams.get("title") || "Filme";
  const videoUrl = searchParams.get("videoUrl") || "";
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(7320); // 2h 2min em segundos

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [showControls]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, duration));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : "";

  return (
    <div 
      className="fixed inset-0 bg-background text-foreground overflow-hidden cursor-default"
      onMouseMove={() => setShowControls(true)}
    >
      {/* Video container */}
      <div className="absolute inset-0">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={`Assistindo - ${movieTitle}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-netflix-dark via-muted to-card">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">{movieTitle}</h1>
                <p className="text-xl text-muted-foreground">
                  {isPlaying ? "Reproduzindo..." : "Pausado"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="bg-background/20 hover:bg-background/40 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold">{movieTitle}</h2>
            <p className="text-sm text-muted-foreground">Temporada 1 • Episódio 1</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/20 hover:bg-background/40 backdrop-blur-sm"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>


        {/* Minimal bottom controls - only back button */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-background/20 hover:bg-background/40 backdrop-blur-sm"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchNow;