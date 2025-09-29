import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Waves, Brain, Database, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter } from "recharts";

interface HeroProps {
  onViewDashboard: () => void;
}

const Hero = ({ onViewDashboard }: HeroProps) => {
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  const salinityData = [
    { month: 'Jan', salinity: 35.2 }, { month: 'Feb', salinity: 35.4 },
    { month: 'Mar', salinity: 35.6 }, { month: 'Apr', salinity: 35.3 },
    { month: 'May', salinity: 35.1 }, { month: 'Jun', salinity: 34.9 }
  ];

  const bgcData = [
    { depth: 0, oxygen: 210, chlorophyll: 0.8, nitrate: 2 },
    { depth: 50, oxygen: 200, chlorophyll: 1.2, nitrate: 5 },
    { depth: 100, oxygen: 180, chlorophyll: 0.6, nitrate: 12 },
    { depth: 200, oxygen: 150, chlorophyll: 0.2, nitrate: 20 },
    { depth: 500, oxygen: 120, chlorophyll: 0.1, nitrate: 30 }
  ];

  const trajectoryData = [
    { lon: 60, lat: 15, id: 1 }, { lon: 62, lat: 16, id: 1 },
    { lon: 64, lat: 17.5, id: 1 }, { lon: 65, lat: 19, id: 2 },
    { lon: 67, lat: 20, id: 2 }, { lon: 69, lat: 21.5, id: 2 }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "RAG-powered LLM for intelligent oceanographic data queries"
    },
    {
      icon: Database,
      title: "Real-time Data",
      description: "ARGO floats, gliders, buoys, and satellite feeds integration"
    },
    {
      icon: TrendingUp,
      title: "Predictive Insights",
      description: "Trend analysis, forecasts, and anomaly detection"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-depth-gradient">
        <div className="absolute inset-0 bg-ocean-gradient opacity-20"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary-glow/10 rounded-full blur-2xl animate-wave"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-secondary/10 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 pt-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-2 bg-accent/10 rounded-full mb-6 animate-glow">
              <Waves className="w-6 h-6 text-accent mr-2" />
              <span className="text-sm font-medium text-accent">Next-Gen Ocean Intelligence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-wave-gradient bg-clip-text text-transparent">
                Unlock Ocean
              </span>
              <br />
              <span className="text-foreground">
                Intelligence with AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Interact with oceanographic data through natural language. Get AI-powered insights, 
              predictive analytics, and real-time monitoring for climate, fisheries, and disaster management.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/chat">
                <Button 
                  size="lg" 
                  className="bg-ocean-gradient hover:shadow-ocean transition-wave text-lg px-8 py-6 font-semibold group"
                >
                  Start AI Chat
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-accent/30 hover:bg-accent/10 hover:border-accent transition-wave text-lg px-8 py-6"
                onClick={onViewDashboard}
              >
                View Dashboard
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/30 hover:shadow-ocean transition-wave"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="w-12 h-12 bg-ocean-gradient rounded-xl flex items-center justify-center mb-4 group-hover:animate-float">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-smooth">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Example Queries Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Example Queries</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "Plot salinity near the equator for March 2024",
                "Compare BGC parameters in the Arabian Sea",
                "Show recent float trajectories"
              ].map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="border-accent/30 hover:bg-accent/10 hover:border-accent transition-wave"
                  onClick={() => setSelectedQuery(query)}
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>

          {/* Interactive Graphs Section */}
          {selectedQuery && (
            <div className="mt-12 max-w-6xl mx-auto animate-fade-in">
              <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                <h3 className="text-2xl font-semibold mb-6 text-center">{selectedQuery}</h3>
                
                {selectedQuery.includes("salinity") && (
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={salinityData}>
                      <defs>
                        <linearGradient id="salinityGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" domain={[34, 36]} />
                      <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                      <Area type="monotone" dataKey="salinity" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#salinityGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}

                {selectedQuery.includes("BGC") && (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={bgcData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="depth" stroke="hsl(var(--muted-foreground))" label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5 }} />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                      <Legend />
                      <Line type="monotone" dataKey="oxygen" stroke="hsl(var(--accent))" strokeWidth={2} />
                      <Line type="monotone" dataKey="chlorophyll" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="nitrate" stroke="hsl(var(--secondary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {selectedQuery.includes("trajectories") && (
                  <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="lon" stroke="hsl(var(--muted-foreground))" label={{ value: 'Longitude', position: 'insideBottom', offset: -5 }} />
                      <YAxis dataKey="lat" stroke="hsl(var(--muted-foreground))" label={{ value: 'Latitude', angle: -90, position: 'insideLeft' }} />
                      <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                      <Legend />
                      <Scatter name="Float Trajectory" data={trajectoryData} fill="hsl(var(--accent))" line={{ stroke: 'hsl(var(--accent))', strokeWidth: 2 }} />
                    </ScatterChart>
                  </ResponsiveContainer>
                )}

                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedQuery(null)}
                    className="border-accent/30 hover:bg-accent/10"
                  >
                    Close Visualization
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;