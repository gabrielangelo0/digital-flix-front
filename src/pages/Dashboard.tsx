import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, User, LogOut, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import movie1 from "@/assets/movie1.jpg";
import movie2 from "@/assets/movie2.jpg";
import movie3 from "@/assets/movie3.jpg";
import movie4 from "@/assets/movie4.jpg";
import movie5 from "@/assets/movie5.jpg";
import movie6 from "@/assets/movie6.jpg";

const movies = [
  {
    id: 1,
    title: "Ação Explosiva",
    genre: "Ação",
    rating: 8.5,
    image: movie1,
    featured: true,
  },
  {
    id: 2,
    title: "Romance Eterno",
    genre: "Romance",
    rating: 7.8,
    image: movie2,
    featured: false,
  },
  {
    id: 3,
    title: "Futuro Cyberpunk",
    genre: "Ficção Científica",
    rating: 9.1,
    image: movie3,
    featured: true,
  },
  {
    id: 4,
    title: "Terror Noturno",
    genre: "Terror",
    rating: 7.3,
    image: movie4,
    featured: false,
  },
  {
    id: 5,
    title: "Comédia Hilária",
    genre: "Comédia",
    rating: 8.0,
    image: movie5,
    featured: false,
  },
  {
    id: 6,
    title: "Aventura Mágica",
    genre: "Fantasia",
    rating: 8.7,
    image: movie6,
    featured: true,
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const featuredMovies = movies.filter(movie => movie.featured);
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Digitalflix</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar filmes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            
            <Button variant="outline" onClick={() => navigate("/admin")}>
              Admin
            </Button>
            
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {!searchTerm && (
          <section className="mb-12">
            <div className="relative rounded-lg overflow-hidden bg-gradient-card shadow-card">
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20 z-10" />
              <img
                src={featuredMovies[0]?.image}
                alt="Filme em destaque"
                className="w-full h-96 object-cover"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h2 className="text-4xl font-bold mb-2">{featuredMovies[0]?.title}</h2>
                <p className="text-lg text-muted-foreground mb-4">{featuredMovies[0]?.genre}</p>
                <div className="flex gap-4">
                  <Button variant="netflix" size="lg">
                    <Play className="mr-2 h-5 w-5" />
                    Assistir Agora
                  </Button>
                  <Button variant="netflix-outline" size="lg">
                    Mais Informações
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Movies Grid */}
        <section>
          <h3 className="text-2xl font-bold mb-6">
            {searchTerm ? `Resultados para "${searchTerm}"` : "Catálogo de Filmes"}
          </h3>
          
          {filteredMovies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                Nenhum filme encontrado para "{searchTerm}"
              </p>
              <Button 
                variant="netflix-outline" 
                onClick={() => navigate("/not-found")}
              >
                Ver página de conteúdo não encontrado
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMovies.map((movie) => (
                <Card
                  key={movie.id}
                  className="group hover:scale-105 transition-all duration-300 bg-card border-border hover:shadow-netflix cursor-pointer overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-64 object-cover group-hover:brightness-110 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="netflix" size="sm" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Assistir
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg mb-1">{movie.title}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{movie.genre}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-medium">★ {movie.rating}</span>
                      <span className="text-xs text-muted-foreground">2024</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;