import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Play, 
  Plus, 
  Share, 
  Star,
  Clock,
  Calendar,
  Users,
  PlayCircle
} from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import { useState } from "react";

// Dados fictícios dos filmes
const movieData = {
  "1": {
    title: "Ação Explosiva",
    genre: "Ação",
    rating: 8.5,
    year: 2024,
    duration: "2h 15min",
    director: "Michael Bay",
    cast: ["Ryan Reynolds", "Scarlett Johansson", "The Rock"],
    synopsis: "Um agente especial deve infiltrar-se numa organização criminosa internacional para impedir um ataque terrorista que pode mudar o mundo para sempre. Com sequências de ação espetaculares e efeitos visuais de última geração.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    categories: ["Ação", "Suspense", "Aventura"],
    ageRating: "16+",
    languages: ["Português", "Inglês", "Espanhol"],
    quality: "4K Ultra HD"
  },
  "2": {
    title: "Romance Eterno",
    genre: "Romance",
    rating: 7.8,
    year: 2024,
    duration: "1h 45min",
    director: "Sofia Coppola",
    cast: ["Emma Stone", "Ryan Gosling", "Rachel McAdams"],
    synopsis: "Uma história tocante sobre o amor que transcende o tempo. Dois jovens se conhecem durante o verão e vivem um romance intenso que marcará suas vidas para sempre.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    categories: ["Romance", "Drama"],
    ageRating: "12+",
    languages: ["Português", "Inglês"],
    quality: "HD"
  },
  "3": {
    title: "Futuro Cyberpunk",
    genre: "Ficção Científica",
    rating: 9.1,
    year: 2024,
    duration: "2h 30min",
    director: "Denis Villeneuve",
    cast: ["Keanu Reeves", "Charlize Theron", "Oscar Isaac"],
    synopsis: "No ano 2077, a humanidade vive em megacidades dominadas por corporações. Um hacker rebelde descobre uma conspiração que pode libertar a sociedade do controle digital.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    categories: ["Ficção Científica", "Ação", "Cyberpunk"],
    ageRating: "18+",
    languages: ["Português", "Inglês", "Japonês"],
    quality: "4K Ultra HD"
  }
} as const;

const MovieDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("id") || "1";
  const movie = movieData[movieId as keyof typeof movieData] || movieData["1"];
  
  const [selectedTrailer, setSelectedTrailer] = useState<{ url: string; title: string } | null>(null);

  const handleWatchNow = () => {
    navigate(`/watch?id=${movieId}&title=${encodeURIComponent(movie.title)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Detalhes do Filme</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Poster */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden bg-gradient-card border-border">
              <div className="aspect-[2/3] bg-gradient-to-br from-muted to-card flex items-center justify-center">
                <div className="text-center">
                  <PlayCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold">{movie.title}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Movie Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-primary fill-current" />
                  <span className="font-medium">{movie.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration}</span>
                </div>
                <Badge variant="secondary">{movie.ageRating}</Badge>
                <Badge variant="outline">{movie.quality}</Badge>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.categories.map((category) => (
                  <Badge key={category} variant="default">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                variant="netflix" 
                size="lg"
                onClick={handleWatchNow}
                className="flex-1 min-w-[200px]"
              >
                <Play className="mr-2 h-5 w-5" />
                Assistir Agora
              </Button>
              
              {movie.trailerUrl && (
                <Button 
                  variant="netflix-outline" 
                  size="lg"
                  onClick={() => setSelectedTrailer({ url: movie.trailerUrl!, title: movie.title })}
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Trailer
                </Button>
              )}
              
              <Button variant="outline" size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Minha Lista
              </Button>
              
              <Button variant="ghost" size="lg">
                <Share className="mr-2 h-5 w-5" />
                Compartilhar
              </Button>
            </div>

            {/* Synopsis */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Sinopse</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.synopsis}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cast & Crew */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Elenco e Equipe
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-primary mb-2">Diretor</h4>
                  <p className="text-muted-foreground">{movie.director}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-primary mb-2">Elenco Principal</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor) => (
                      <Badge key={actor} variant="secondary">
                        {actor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Detalhes Técnicos</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-primary mb-2">Idiomas Disponíveis</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.languages.map((language) => (
                      <Badge key={language} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-primary mb-2">Qualidade</h4>
                  <p className="text-muted-foreground">{movie.quality}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-primary mb-2">Classificação</h4>
                  <Badge variant="secondary">{movie.ageRating}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <VideoPlayer
        isOpen={!!selectedTrailer}
        onClose={() => setSelectedTrailer(null)}
        videoUrl={selectedTrailer?.url || ""}
        title={selectedTrailer?.title || ""}
      />
    </div>
  );
};

export default MovieDetails;