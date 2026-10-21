# SheetCo: the organisation (generated from the spec `sheetco`; do not edit)

SheetCo builds a small spreadsheet engine. The team designs its own module split and interfaces in the kickoff meeting; requirements arrive in waves.

## Roles

| Role | Level | Reports to | Room (floor) | Lane | Skills |
|---|---|---|---|---|---|
| founder | founder (a person) | - | lobby (1) | - | - |
| cos | chief-of-staff | founder | ceo-office (1) | - | - |
| lead | manager | cos | workshop (2) | s | manage |
| dev-1 | builder | lead | workshop (2) | s | js |
| dev-2 | builder | lead | workshop (2) | s | js |
| reviewer | checker | cos | review (3) | q | review |
| release | release | cos | launch (3) | r | release |

## How work flows

Every order goes through the `task` flow; each stage is signed by one kind of role, and nobody checks their own work.

1. **build**, signed by the builder (evidence: live/work/<task>/)
1. **test1**, signed by the supervisor's code
1. **check**, signed by the checker (evidence: review notes)
1. **uat**, signed by the orderer (evidence: hidden acceptance tests)
1. **ship**, signed by the release (evidence: copied to live/shipped/)

## Channels

- `company` (company): announcements
- `lane:s` (lane): the workshop
