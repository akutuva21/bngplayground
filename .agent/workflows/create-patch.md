---
description: Create a git patch of all current changes against the last commit
---

# Create Patch Workflow

This workflow generates a diff of all staged and unstaged changes against the last commit (HEAD) and saves it to a file.

## Steps

1. (Optional) Track new files so they are included in the diff:
// turbo

```powershell
git add -N .
```

1. Generate the patch:
// turbo

```powershell
git diff HEAD > latest_changes.patch
```

1. Verify the patch creation:
// turbo

```powershell
Get-Item latest_changes.patch
```
