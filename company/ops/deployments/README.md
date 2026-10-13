# Deployment records

owner: release-manager

`npm run deploy -- preview|production` writes one JSON record per attempt: intended project,
environment, source commit, whether the preview source was dirty, deployment URL, completed
steps and final status. Failed runs name the failed step. Commit these records after the run;
they are the release history the next agent reads. Credentials and subprocess output are never
stored here. `--dry-run` writes nothing.
