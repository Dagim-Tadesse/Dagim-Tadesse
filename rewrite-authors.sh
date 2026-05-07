#!/bin/sh
if echo "$GIT_AUTHOR_NAME" | grep -iq "lovable" || echo "$GIT_AUTHOR_EMAIL" | grep -iq "lovable"; then
  export GIT_AUTHOR_NAME="Dagim-Tadesse"
  export GIT_AUTHOR_EMAIL="dagimtadesse25@gmail.com"
fi
if echo "$GIT_COMMITTER_NAME" | grep -iq "lovable" || echo "$GIT_COMMITTER_EMAIL" | grep -iq "lovable"; then
  export GIT_COMMITTER_NAME="Dagim-Tadesse"
  export GIT_COMMITTER_EMAIL="dagimtadesse25@gmail.com"
fi
