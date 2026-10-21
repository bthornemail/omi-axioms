# TRUNC — redirection truncates the file before the command runs

- **status:** P1
- **category:** redirection
- **applets:** cat, wc, tr
- **owner:** `busybox/catalog/B-TRUNC.sh`
- **result:** holds

## Claim

`> F` opens and empties F before the command runs, and `>` replaces F's content wholesale. (The command must not also read F — see ../pending for why `cat A F B > F` loops instead.)

## Statements

- `:` produces no output, so `: > F` leaves F empty — truncation happens before the command
- `>` replaces the content wholesale
