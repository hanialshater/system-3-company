-- Accept the earlier unapplied draft schema too, preserving its rows.
ALTER TABLE settings ADD COLUMN IF NOT EXISTS experiences text[] NOT NULL DEFAULT '{}'
  CHECK (coalesce(array_ndims(experiences), 1) = 1)
  CHECK (cardinality(experiences) <= 5)
  CHECK (array_position(experiences, NULL) IS NULL)
  CHECK (experiences <@ ARRAY['surprise','visualExplanation','playfulness','practicalValue','depth']::text[]);
ALTER TABLE settings ADD COLUMN IF NOT EXISTS challenge text
  CHECK (challenge IS NULL OR challenge IN ('gentle','balanced','demanding'));
