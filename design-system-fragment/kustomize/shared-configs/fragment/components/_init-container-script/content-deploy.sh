#!/bin/sh

# Exit with an error if any command fails
set -e

# Check that required variables are present
VAR_ERR=0;
[ -z "$GIT_TOKEN" ] && echo "ERR: Environment variables \$GIT_TOKEN missing\\n  --Required to authenticate the request to git (used as PRIVATE-TOKEN header)" && VAR_ERR=1;
[ -z "$CONTENT_REPO" ] && echo "ERR: Environment variables \$CONTENT_REPO missing\\n  --Which repository to request artifact from (ex. dumarca/loyalty-content)" && VAR_ERR=1;
[ -z "$CONTENT_REPO_BRANCH" ] && echo "ERR: Environment variables \$CONTENT_REPO_BRANCH missing\\n--What branch to request artifact from (ex. release)" && VAR_ERR=1;
[ -z "$ARTEFACT_NAME" ] && echo "ERR: Environment variables \$ARTEFACT_NAME missing\\n  --What artifact to download from git (ex. rdge-translations)" && VAR_ERR=1;
[ -z "$FOLDER_NAME" ] && echo "ERR: Environment variables \$FOLDER_NAME missing\\n  --What subfolder to extract artifact content from (/build/\$FOLDER_NAME)" && $VAR_ERR=1;
if [ $VAR_ERR -eq 1 ]; then echo "### Please set the missing variables in a ConfigMap named '<fragment_name>-$CONFIG_MAP_NAME' or a Secret named '$SECRET_NAME' ###" && exit -1; fi
# Starting execution

echo "###STARTING INIT CONTAINER EXECUTION###"

# Change to folder where zip file contents are needed and download the artefact

cd /${VOLUME_DIR}

# Gitlab projects might have a / in their name, which must be url encoded
escaped_repo=`echo ${CONTENT_REPO} | sed 's#/#%2F#g'`
wget --header "PRIVATE-TOKEN: ${GIT_TOKEN}" -O content.zip https://gitlab.ballys.tech/api/v4/projects/${escaped_repo}/jobs/artifacts/${CONTENT_REPO_BRANCH}/download?job=${ARTEFACT_NAME}

# Extract content and delete downloaded artefact

echo "###EXTRACTING CONTENT###"

unzip  -o content.zip
rm content.zip

# Extract additional contents if needed
if [ ! -z "$ADDITIONAL_CONTENT_REPO" ];
then
    escaped_additional_repo=`echo ${ADDITIONAL_CONTENT_REPO} | sed 's#/#%2F#g'`
    wget --header "PRIVATE-TOKEN: ${GIT_TOKEN}" -O content2.zip https://gitlab.ballys.tech/api/v4/projects/${escaped_additional_repo}/jobs/artifacts/${CONTENT_REPO_BRANCH}/download?job=${ARTEFACT_NAME}

    # Extract content and delete downloaded artefact

    echo "###EXTRACTING ADDITIONAL CONTENT###"

    unzip -o content2.zip
    rm content2.zip
fi

# Move the contents of the zip file out of the folder structure

mv build/${FOLDER_NAME}/* /${VOLUME_DIR}/

#Finish execution

echo "###INIT CONTAINER EXECUTION COMPLETED###"
