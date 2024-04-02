# Kustomize base for fragments

This is a base configuration for fragment deployments, the scope of this document is to outline how
the kustomization folders should look in your repository.

## Kustomize base folder
In the base folder you should have 2 files, the `kustomization.yaml` and the `patch-deployment-images.yaml`
For the purposes of providing an example, let us consider a fragment called `example-fragment`. The
kustomization.yaml needed would be as follows:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - ../../kustomize-base/fragment/base

commonLabels:
  app: example-fragment

patchesStrategicMerge:
  - patch-deployment-images.yaml
```

We need to have the `patch-deployment-images.yaml` in order to patch the base with the proper name of
the images for the containers. It is very important for this convention of name to be followed since
the kustomize deployer depends on this convention for fragments.  For the case of our example, the
`patch-deployment-images.yaml` file would be as follows:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fragment
spec:
  template:
    spec:
      containers:
      - name: php
        image: example-fragment-php
      - name: nginx
        image: example-fragment-frontend
```

## Overlays
In the overlays a good structure to follow is the following:

```
<overlay-name>
├── ingress.yaml
├── kustomization.yaml
└── patches
    └── patch-deployment-env-vars.yaml
```

The following are the files we would use for `example-fragment` in the QA overlay

**kustomization.yaml** - paths may need to be updated here to reference the base folder and kustomize-base submodule
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namePrefix: example-


resources:
  - ../../../base
  - ingress.yaml


patchesStrategicMerge:
  - patches/patch-deployment-env-vars.yaml
```

**ingress.yaml**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-fragment-ingress
spec:
  rules:
    - host: example-fragment-qa1-fragments.mt1-test.enjoy-platform.local
      http:
        paths:
          - backend:
              serviceName: example-fragment-svc
              servicePort: 8081
```

**patch-deployment-env-vars.yaml** - add environment variables you want to override or set in this file, these will vary for each fragment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-fragment
spec:
  template:
    spec:
      containers:
      - name: php
        env:
        - name: APP_ENV
          value: qa
        - name: ENJOY_ENVIRONMENT
          value: plng-qa
        - name: EXAMPLE_APP_URL
          value: http://example-app-svc.qa1-backend.svc:8080
```

## Adding content
To add content using a "Content in Git" worklow, please have a look at the `components` folder

# Ephemeral overlays

IMPORTANT: In the `kustomization.yaml` for the eph overlays, do not include `namespace:`.  This is because for ephemeral environments the namespace will change based on what namespace is assigned to you to do your testing, meaning that if you hardcode it in `kustomization.yaml` you will get an error and the pipeline will fail.
