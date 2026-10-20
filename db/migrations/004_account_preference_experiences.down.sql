-- Additive feature rollback retains legacy choices and every account row.
ALTER TABLE settings DROP COLUMN IF EXISTS challenge;
ALTER TABLE settings DROP COLUMN IF EXISTS experiences;
