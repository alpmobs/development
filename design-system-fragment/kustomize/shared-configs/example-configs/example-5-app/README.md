# Java app with NGINX-content

## Explaination
This configuration example showcases a configuration where an app is deployed along with a nginx instance serving static content.

This content is fetched from a separate repository, as defined in `base/kustomization.yaml` under the `CONTENT_REPO` key. Like this.
```yaml
configMapGenerator:
  - name: nginx-init-content-config
    literals:
      - ARTEFACT_NAME=example-artefact
      - FOLDER_NAME=translations
      - CONTENT_REPO=example/example-content
      - CONTENT_REPO_BRANCH=master
```

The deployment will now download an artifact named `example-artefact` from a repo named `example/example-content`, on the `master` branch. It will extract the artifact in a folder named `translations`. You can change all these variables to best suit your needs.

Once the NGINX service is up and running, it works similarly to how the NGINX service in our fragments work. It will allow you to fetch content directly from the service, giving you the possibility to have content stored in git but deployed along with your application. Useful for translations and assets that is tied with the java application.


## Overlays
Once you've configured your base profile for your app, you have the possibility to have separate artifacts downloaded per overlay. 

To do you, add a configMapGenerator to the `kustomization.yaml` file for your overlay and add this.

```yaml
...
  - name: nginx-init-content-config
    behavior: merge
    literals:
      - ARTEFACT_NAME=plng-stg-translations
...
```

You can change the value of `ARTEFACT_NAME` to whatever you like, as long as the artifact exists. These artifacts are produced whenever the pipeline for your content repository is done, but you'll need to explicitly name your gitlab-ci jobs according to what artifact name you want to have. 

One example can be found [here](https://gitlab.ballys.tech/dumarca/loyalty-content/-/blob/release/.gitlab-ci.yml).
