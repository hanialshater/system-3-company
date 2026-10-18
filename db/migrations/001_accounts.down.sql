-- Down for 001: drops every accounts table. All learner rows in them are gone after this (that is the point).
DROP TABLE IF EXISTS recall;
DROP TABLE IF EXISTS progress;
DROP TABLE IF EXISTS signup_intent;
DROP TABLE IF EXISTS auth_verification;
DROP TABLE IF EXISTS auth_account;
DROP TABLE IF EXISTS auth_session;
DROP TABLE IF EXISTS deleted_account;
DROP TABLE IF EXISTS auth_user;
