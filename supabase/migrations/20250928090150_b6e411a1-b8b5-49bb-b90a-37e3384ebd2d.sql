-- Create a table for chat conversations
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  title TEXT DEFAULT 'New Conversation',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for chat messages
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for ocean float data
CREATE TABLE public.ocean_floats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  float_id TEXT NOT NULL UNIQUE,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  depth DECIMAL(8, 2),
  temperature DECIMAL(5, 2),
  salinity DECIMAL(5, 2),
  status TEXT DEFAULT 'active',
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocean_floats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversations (public access for demo)
CREATE POLICY "Anyone can view conversations" 
ON public.conversations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create conversations" 
ON public.conversations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update conversations" 
ON public.conversations 
FOR UPDATE 
USING (true);

-- RLS Policies for messages (public access for demo)
CREATE POLICY "Anyone can view messages" 
ON public.messages 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create messages" 
ON public.messages 
FOR INSERT 
WITH CHECK (true);

-- RLS Policies for ocean floats (public read-only)
CREATE POLICY "Anyone can view ocean floats" 
ON public.ocean_floats 
FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);
CREATE INDEX idx_ocean_floats_location ON public.ocean_floats(latitude, longitude);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_conversations_updated_at
BEFORE UPDATE ON public.conversations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample ocean float data
INSERT INTO public.ocean_floats (float_id, latitude, longitude, depth, temperature, salinity, status) VALUES
('ARGO_001', 35.5847, -5.3624, 1500.00, 15.2, 35.1, 'active'),
('ARGO_002', 40.7128, -74.0060, 2000.00, 12.8, 34.7, 'active'),
('ARGO_003', 51.5074, -0.1278, 1200.00, 18.5, 35.3, 'active'),
('ARGO_004', 35.6762, 139.6503, 1800.00, 22.1, 34.9, 'active'),
('ARGO_005', -33.8688, 151.2093, 1600.00, 19.7, 35.2, 'maintenance'),
('ARGO_006', 25.7617, -80.1918, 900.00, 26.3, 36.1, 'active'),
('ARGO_007', 60.1282, 18.6435, 800.00, 8.9, 32.8, 'active'),
('ARGO_008', -34.6037, -58.3816, 2200.00, 14.6, 34.5, 'active');