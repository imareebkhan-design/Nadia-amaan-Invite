
DROP POLICY "No public reads" ON public.rsvp_responses;

CREATE POLICY "Allow select for anon"
ON public.rsvp_responses
FOR SELECT
TO anon
USING (true);
