# Kustomize base for fragments using Content in Git

This is a component that can be added to fragment deployments for fragments that use a "Content in Git"
workflow. There are a couple of files you will need to write, and a couple of values that you will need
to provide. This document outlines those needs.

## Including the images content component in your fragment
To include this component in your fragment, you need to add the following configuration in the base kustomization.yaml:

```
components:
  - ../../kustomize-base/fragment/components/_init-container-script
  - ../../kustomize-base/fragment/components/images-init-container
```

If other content components are needed, you would need to add them to this list. Note that `_init-container-script` should be included only once.

## Flow
Basically, including this component will add a step that will download an artifact from git, extract it, and move the content of the artifact to a volume. This volume can then be mounted into the main container for access.

## Mounting content in fragments
Content is mounted into the fragments using an init-container script that runs upon pod creation. This script
will download the latest artifact from a git repo, unpack it and copy the content into a certain directory. 
There is a single init-container job.

You will need to provide some environment variables for this container to be able to do its job. These values 
should be exposed as env variables, via ConfigMaps or via Secrets. The following values must exist:
* `GIT_TOKEN` - The auth token to use for accessing the git repo. See gitlab header `PRIVATE-TOKEN`
* `CONTENT_REPO` - Name of the repository to read from  (ex. dumarca/loyalty-content)
* `CONTENT_REPO_BRANCH` - Name of branch to read from (ex. release)
* `ARTEFACT_NAME` - Name of artifact to download (ex. translations-rdge)
* `FOLDER_NAME` - Name of folder in artifact to extract from. Note that we assume there is a folder `build` at the root of the artifact, and will extract from `build/$FOLDER_NAME`

#### Images 
ConfigMap name: `fragment-init-images-config` | Secret name: `git-private-token`

The data from this step is then made available under volume `images`. The volume should generally be mounted
under `<FRAGMENT_DIR>/public/build/images`

## Example Usage
In your kustomize config, in your `kustomization.yaml` file, add the following section (and change configs to match your needs):
```yaml
configMapGenerator:
  - name: fragment-init-images-config
    literals:
      - ARTEFACT_NAME=plng-assets
      - FOLDER_NAME=images
      - CONTENT_REPO=dumarca/loyalty-content
      - CONTENT_REPO_BRANCH=release
```
Then, make sure you mount the volume `images` in your deployment at the path where the fragment expects them. By default the volume will be mounted to `/opt/app-root/src/platform/public/build/images` for both the `php` and `nginx` container, however this can be overridden with overlays.

### Overlay overrides
If you need to modify these settings for different overlays, you can do so by patching the config map in your `kustomization.yaml` file. Use the following example as a reference:
```yaml
configMapGenerator:
  - name: <fragment_name>-fragment-init-content-config
    behavior: merge
    literals:
      - CONTENT_REPO_BRANCH=development
```

Note that in the overlay the ConfigMap needs to be referenced with the full name of the ConfigMap at that point, meaning it has to include the namePrefix applied in the base folder
