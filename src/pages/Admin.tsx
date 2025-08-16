import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Movie, movieApi } from "@/lib/api";

const Admin = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<Movie, 'id'>>({
    title: "",
    genre: "",
    rating: 0,
    image: "",
    featured: false,
    description: "",
    year: new Date().getFullYear(),
    trailerUrl: "",
  });

  const genres = [
    "Ação", "Romance", "Ficção Científica", "Terror", "Comédia", 
    "Drama", "Fantasia", "Thriller", "Aventura", "Documentário"
  ];

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setIsLoading(true);
      const response = await movieApi.getMovies();
      setMovies(response.data);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os filmes. Verifique se a API está rodando.",
        variant: "destructive",
      });
      // Fallback data for development
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMovie) {
        await movieApi.updateMovie(editingMovie.id!, formData);
        toast({
          title: "Sucesso",
          description: "Filme atualizado com sucesso!",
        });
      } else {
        await movieApi.createMovie(formData);
        toast({
          title: "Sucesso",
          description: "Filme criado com sucesso!",
        });
      }
      
      setIsDialogOpen(false);
      setEditingMovie(null);
      resetForm();
      loadMovies();
    } catch (error) {
      console.error('Erro ao salvar filme:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o filme. Verifique se a API está rodando.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      genre: movie.genre,
      rating: movie.rating,
      image: movie.image,
      featured: movie.featured,
      description: movie.description || "",
      year: movie.year || new Date().getFullYear(),
      trailerUrl: movie.trailerUrl || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await movieApi.deleteMovie(id);
      toast({
        title: "Sucesso",
        description: "Filme deletado com sucesso!",
      });
      loadMovies();
    } catch (error) {
      console.error('Erro ao deletar filme:', error);
      toast({
        title: "Erro",
        description: "Não foi possível deletar o filme.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      genre: "",
      rating: 0,
      image: "",
      featured: false,
      description: "",
      year: new Date().getFullYear(),
      trailerUrl: "",
    });
  };

  const openCreateDialog = () => {
    setEditingMovie(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">Admin - Gerenciar Filmes</h1>
          </div>
          
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
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Filme
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingMovie ? "Editar Filme" : "Novo Filme"}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="year">Ano</Label>
                      <Input
                        id="year"
                        type="number"
                        min="1900"
                        max="2030"
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="genre">Gênero *</Label>
                      <Select value={formData.genre} onValueChange={(value) => setFormData({...formData, genre: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um gênero" />
                        </SelectTrigger>
                        <SelectContent>
                          {genres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rating">Avaliação (0-10) *</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">URL da Imagem *</Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="https://exemplo.com/imagem.jpg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Descrição do filme..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trailerUrl">URL do Trailer</Label>
                    <Input
                      id="trailerUrl"
                      type="url"
                      value={formData.trailerUrl}
                      onChange={(e) => setFormData({...formData, trailerUrl: e.target.value})}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                    />
                    <Label htmlFor="featured">Filme em destaque</Label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingMovie ? "Atualizar" : "Criar"} Filme
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Carregando filmes...</p>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">
              {searchTerm ? `Nenhum filme encontrado para "${searchTerm}"` : "Nenhum filme cadastrado"}
            </p>
            {!searchTerm && (
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Filme
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie) => (
              <Card key={movie.id} className="group hover:shadow-netflix transition-all duration-300">
                <div className="relative">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  {movie.featured && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      Destaque
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{movie.title}</CardTitle>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{movie.genre}</span>
                    <span>{movie.year}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary font-medium">★ {movie.rating}/10</span>
                  </div>
                  
                  {movie.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {movie.description}
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(movie)}
                      className="flex-1"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja deletar o filme "{movie.title}"? 
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(movie.id!)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Deletar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;