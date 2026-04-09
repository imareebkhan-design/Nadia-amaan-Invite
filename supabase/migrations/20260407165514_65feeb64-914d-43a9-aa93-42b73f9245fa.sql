CREATE POLICY "Allow select for authenticated users"
ON public.rsvp_responses
FOR SELECT
TO authenticated
USING (true);