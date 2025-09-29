import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/chat/ChatInterface";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Chat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Chat Page Header */}
      <section className="pt-20 pb-8 bg-depth-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-wave-gradient bg-clip-text text-transparent">
                  FloatChat AI Chat
                </span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Ask questions about ocean data, ARGO floats, climate patterns, and marine ecosystems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ChatInterface />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;