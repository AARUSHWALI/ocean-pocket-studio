import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageSquare, BarChart3, Fish, CloudRain, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: MessageSquare, label: "AI Chat", href: "/chat", isExternal: true },
    { icon: BarChart3, label: "Dashboard", href: "/", isExternal: true },
    { icon: Fish, label: "Fisheries", href: "#fisheries", isExternal: false },
    { icon: CloudRain, label: "Climate", href: "#climate", isExternal: false },
    { icon: AlertTriangle, label: "Disasters", href: "#disasters", isExternal: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-ocean-gradient rounded-xl flex items-center justify-center animate-float">
              <div className="w-6 h-6 bg-accent rounded-full opacity-80"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-wave-gradient bg-clip-text text-transparent">
                FloatChat
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                AI Ocean Intelligence
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              item.isExternal ? (
                <Link key={index} to={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-accent hover:bg-accent/10 transition-smooth"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-accent hover:bg-accent/10 transition-smooth"
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-ocean-gradient hover:shadow-ocean transition-wave font-medium">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                item.isExternal ? (
                  <Link key={index} to={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-accent hover:bg-accent/10"
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    key={index}
                    variant="ghost"
                    className="justify-start text-muted-foreground hover:text-accent hover:bg-accent/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                )
              ))}
              <Button className="mt-4 bg-ocean-gradient hover:shadow-ocean transition-wave">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;