
CREATE TABLE public.rsvp_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  guest_count INTEGER NOT NULL DEFAULT 1,
  events_attending TEXT[] DEFAULT '{}',
  dietary_preference TEXT DEFAULT 'No Preference',
  message TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit RSVP" ON public.rsvp_responses
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "No public reads" ON public.rsvp_responses
  FOR SELECT TO anon
  USING (false);
