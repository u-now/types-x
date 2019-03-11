# Contributing Guidelines

## One-time setup

- Read [Understanding the GitHub Flow](https://guides.github.com/introduction/flow/index.html)
- Install VS Code
- Install the "Prettier" Visual Studio Code extension, and configure settings
  - Under User Settings > Prettier: Check "Require Config"
  - Under User Settings > Text Editor > Formatting: Enable "Format on save"
- Fork `types-x` repo
  - TODO: add details, images
- Clone your fork locally
  - `git clone https://github.com/${your_username}/types-x.git && cd types-x`
- Run `npm install` to install development packages

## Contribute pull request

- Create a feature branch (TODO: create and link branch naming guidelines?)
  - `git checkout -b ${branch_name}`
- Make your changes (edit existing files or create new ones)
- Commit the changes (TODO: create and link "commit message guidelines")
  - `git commit --all -m "${commit_message}"`
- Push the commit(s) to your fork:
  - `git push origin ${branch_name}`
- Go to the github page for your fork and click the green "pull request" button
- If you later need to add new commits to the pull request (after a review for example), you can
  simply commit the changes to the local branch and then use `git push` to automatically update the
  pull request.

TODO: Contribute using GitHub's web interface

TODO: Contribute using VS Code
