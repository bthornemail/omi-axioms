# GROW — append extends the file; the complement of truncate

- **status:** P1
- **category:** redirection
- **applets:** cat, wc, tr
- **owner:** `busybox/catalog/B-GROW.sh`
- **result:** holds

## Claim

`>>` appends — after `printf A > F; printf B >> F`, F is A+B and grew by exactly |B|. `>` replaces, `>>` keeps and extends. (F is not an input to the command — see ../pending.)

## Statements

- the content is A followed by B
- the file grew by exactly |B| = 3
- strictly larger than before
