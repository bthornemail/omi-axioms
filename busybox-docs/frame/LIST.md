# LIST — an applet's name is the leaf of its install path

- **status:** P1
- **category:** frame
- **applets:** tr, wc, sed, cmp
- **owner:** `busybox/catalog/B-LIST.sh`
- **result:** holds

## Claim

`busybox --list` equals `busybox --list-full` with each directory stripped, line for line and same count — the install path is the frame, the applet name is its leaf (payload). (The author's --list / --list-full pair.)

## Statements

- the two listings have the same number of lines
- stripping the directory from each path yields the names, line for line
