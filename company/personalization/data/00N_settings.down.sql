-- DRAFT migration 00N_settings (down). W-1521. Drops only the table this migration created;
-- touches no other team's table. Destroys every stored choice: run only on preview (fake data)
-- or as part of an approved rollback (EDD-008 rollout).
DROP TABLE IF EXISTS settings;
