import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Camera, 
  Edit, 
  Save,
  Eye,
  Clock,
  Heart,
  Settings,
  Bell,
  Shield,
  CreditCard,
  HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    bio: "Amante de filmes de ação e ficção científica",
    plan: "Premium",
    joinDate: "Janeiro 2024"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso!",
    });
  };

  const recentlyWatched = [
    { title: "Ação Explosiva", progress: 85 },
    { title: "Futuro Cyberpunk", progress: 100 },
    { title: "Romance Eterno", progress: 45 }
  ];

  const favorites = [
    "Ação Explosiva",
    "Futuro Cyberpunk", 
    "Aventura Mágica"
  ];

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
            <h1 className="text-xl font-semibold">Meu Perfil</h1>
          </div>
          
          <Button
            variant={isEditing ? "netflix" : "outline"}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </>
            )}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar Card */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="" alt={profile.name} />
                    <AvatarFallback className="text-2xl">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="netflix"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold mb-2">{profile.name}</h2>
                <p className="text-muted-foreground mb-4">{profile.email}</p>
                
                <div className="flex justify-center gap-2 mb-4">
                  <Badge variant="default">{profile.plan}</Badge>
                  <Badge variant="outline">Membro desde {profile.joinDate}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <span className="text-sm">Filmes assistidos</span>
                  </div>
                  <span className="font-semibold">47</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">Horas assistidas</span>
                  </div>
                  <span className="font-semibold">126h</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span className="text-sm">Favoritos</span>
                  </div>
                  <span className="font-semibold">{favorites.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio">Biografia</Label>
                  <Input
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="Conte um pouco sobre seus gostos cinematográficos..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recently Watched */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Assistidos Recentemente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentlyWatched.map((movie, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{movie.title}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${movie.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12">
                          {movie.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Favorites */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Meus Favoritos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {favorites.map((movie, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {movie}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Configurações da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notificações
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacidade e Segurança
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Planos e Pagamentos
                </Button>
                
                <Separator />
                
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Ajuda e Suporte
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações Avançadas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;