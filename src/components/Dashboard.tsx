import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Fish, 
  CloudRain, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Waves,
  Thermometer,
  Droplets,
  Wind
} from "lucide-react";

const Dashboard = () => {
  const dashboardSections = [
    {
      id: 'fisheries',
      title: 'Fisheries Monitoring',
      icon: Fish,
      color: 'bg-emerald-500',
      description: 'Track fish populations, migration patterns, and sustainable fishing zones',
      metrics: [
        { label: 'Active Vessels', value: '1,247', trend: 'up', change: '+5%' },
        { label: 'Fish Density', value: 'High', trend: 'stable', change: '0%' },
        { label: 'Catch Reports', value: '89', trend: 'up', change: '+12%' },
      ],
      alerts: ['Overfishing detected in Zone 7B', 'New breeding ground identified']
    },
    {
      id: 'climate',
      title: 'Climate Monitoring',
      icon: CloudRain,
      color: 'bg-blue-500',
      description: 'Monitor ocean temperature, currents, and climate change indicators',
      metrics: [
        { label: 'Avg Temperature', value: '15.2°C', trend: 'up', change: '+0.3°C' },
        { label: 'Sea Level', value: '2.1mm', trend: 'up', change: '+0.1mm' },
        { label: 'pH Level', value: '8.1', trend: 'down', change: '-0.02' },
      ],
      alerts: ['Temperature anomaly in North Pacific', 'Ocean acidification trending up']
    },
    {
      id: 'disasters',
      title: 'Disaster Monitoring',
      icon: AlertTriangle,
      color: 'bg-red-500',
      description: 'Early warning systems for tsunamis, hurricanes, and extreme weather',
      metrics: [
        { label: 'Active Warnings', value: '3', trend: 'stable', change: '0' },
        { label: 'Risk Level', value: 'Medium', trend: 'down', change: '-1' },
        { label: 'Monitored Events', value: '127', trend: 'up', change: '+8' },
      ],
      alerts: ['Tropical storm forming in Atlantic', 'Seismic activity detected near Japan']
    }
  ];

  const realtimeData = [
    { icon: Thermometer, label: 'Ocean Temperature', value: '15.2°C', status: 'normal' },
    { icon: Droplets, label: 'Salinity Level', value: '35.1 psu', status: 'normal' },
    { icon: Wind, label: 'Current Speed', value: '2.3 m/s', status: 'high' },
    { icon: Activity, label: 'Data Streams', value: '1,247', status: 'active' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'active': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="dashboard" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-wave-gradient bg-clip-text text-transparent">
              Intelligence Dashboard
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-time monitoring and predictive analytics for ocean intelligence
          </p>
        </div>

        {/* Real-time Status Bar */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Waves className="w-5 h-5 mr-2 text-accent" />
              Real-time Ocean Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {realtimeData.map((item, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-smooth">
                  <item.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="font-semibold text-lg">{item.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{item.label}</div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {dashboardSections.map((section, index) => (
            <Card key={section.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-ocean transition-wave">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-xl ${section.color} flex items-center justify-center mr-3`}>
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold">{section.title}</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        {section.description}
                      </div>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Metrics */}
                <div className="space-y-3">
                  {section.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <div>
                        <div className="font-medium">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(metric.trend)}
                        <span className={`text-sm ${
                          metric.trend === 'up' ? 'text-emerald-500' : 
                          metric.trend === 'down' ? 'text-red-500' : 
                          'text-muted-foreground'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Alerts */}
                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">Recent Alerts</h4>
                  <div className="space-y-2">
                    {section.alerts.map((alert, alertIndex) => (
                      <div key={alertIndex} className="text-sm p-2 rounded bg-orange-500/10 text-orange-500 border border-orange-500/20">
                        {alert}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full bg-ocean-gradient hover:shadow-ocean transition-wave"
                  onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Analyze with AI
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Map Placeholder */}
        <Card className="mt-8 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-accent" />
              Global Ocean Monitoring Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-ocean-gradient opacity-10"></div>
              <div className="text-center z-10">
                <Activity className="w-12 h-12 text-accent mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg font-semibold mb-2">Interactive Ocean Map</h3>
                <p className="text-muted-foreground mb-4">
                  Real-time visualization of ARGO floats, gliders, and satellite data
                </p>
                <Button 
                  variant="outline" 
                  className="border-accent/30 hover:bg-accent/10 hover:border-accent transition-wave"
                >
                  Load Interactive Map
                </Button>
              </div>
              {/* Animated dots representing data points */}
              <div className="absolute top-20 left-20 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <div className="absolute top-32 right-32 w-2 h-2 bg-secondary rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-24 left-1/3 w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-16 right-16 w-2 h-2 bg-secondary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;