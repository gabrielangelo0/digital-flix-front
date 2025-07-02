import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContentNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        {/* Netflix-style error illustration */}
        <div className="mb-8">
          <div className="relative mx-auto w-64 h-64 mb-8">
            <div className="absolute inset-0 bg-gradient-card rounded-full opacity-20" />
            <div className="absolute inset-8 bg-card rounded-full border-4 border-primary/30 flex items-center justify-center">
              <Search className="h-24 w-24 text-primary/50" />
            </div>
            
            {/* Floating elements for Netflix feel */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse" />
            <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-accent rounded-full animate-bounce" />
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-destructive rounded-full animate-ping" />
          </div>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-card">
          <CardContent className="p-8">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-4">Conteúdo Não Encontrado</h2>
            <p className="text-xl text-muted-foreground mb-6">
              Ops! O filme ou série que você está procurando não está disponível no momento.
            </p>
            <p className="text-muted-foreground mb-8">
              Parece que este título saiu do ar ou foi movido para outro lugar. 
              Que tal explorar nosso catálogo para descobrir algo novo?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="netflix"
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2"
              >
                <Home className="h-5 w-5" />
                Voltar ao Catálogo
              </Button>
              
              <Button
                variant="netflix-outline"
                size="lg"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Voltar
              </Button>
            </div>

            {/* Suggestions */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Sugestões:</h3>
              <ul className="text-left text-muted-foreground space-y-2">
                <li>• Verifique se digitou o título corretamente</li>
                <li>• Explore diferentes categorias no catálogo</li>
                <li>• Use a busca para encontrar conteúdos similares</li>
                <li>• Confira os lançamentos mais recentes</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Netflix-style footer */}
        <div className="mt-8">
          <p className="text-sm text-muted-foreground">
            Digitalflix • Sua plataforma de filmes favorita
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentNotFound;