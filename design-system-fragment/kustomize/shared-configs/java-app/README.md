# Kustomize base for Java applications

This is a base configuration for java app deployments, the scope of this document is to outline how
the kustomization folders should look in your repository.

## Kustomize base folder
In the base folder you should have at most 3 files, the `kustomization.yaml`, the `patch-deployment-images.yaml`
and `patch-cron-images.yaml`. For the purposes of providing an example, let us consider a fragment called `example-app`
that has a cronjob and an nginx server to serve assets. The `kustomization.yaml` needed would be as follows:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - ../../shared-configs/java-app/base
  - ../../shared-configs/cron/base

components:
  - ../../shared-configs/java-app/components/nginx-assets

commonLabels:
  app: example-app


patchesStrategicMerge:
  - patch-deployment-images.yaml
  - patch-cron-images.yaml
```

We need to have the `patch-deployment-images.yaml` and `patch-cron-images.yaml` in order to patch
the base with the proper name of the images for the containers. It is very important for this convention
of name to be followed since the kustomize deployer depends on this convention for apps.

For the case of our example, the `patch-deployment-images.yaml` file would be as follows:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  template:
    spec:
      containers:
      - name: java
        image: example-app
```

For the case of our example, the `patch-cron-images.yaml` file would be as follows:

```yaml
kind: CronJob
apiVersion: batch/v1
metadata:
  name: task
spec:
  jobTemplate:
    metadata:
    spec:
      template:
        spec:
          containers:
            - name: task
              image: example-cron-1
```

## Overlays
In the overlays a good structure to follow is the following:

```
<overlay-name>
    ├── configmaps
    │   └── application-<stg/prod>-k8s.yaml
    ├── kustomization.yaml
    ├── patches
    │   ├── app
    │   │   ├── patch-deployment-additional.yaml
    │   │   ├── patch-deployment-affinity.yaml
    │   │   ├── patch-deployment-configmap.yaml
    │   │   ├── patch-deployment-env-vars.yaml
    │   │   ├── patch-deployment-readiness.yaml
    │   │   └── patch-deployment-resources.yaml
    │   ├── cronjob
    │   │   ├── patch-cronjob-additional.yaml
    │   │   ├── patch-cronjob-configmap.yaml
    │   │   ├── patch-cronjob-env-vars.yaml
    │   │   ├── patch-cronjob-resources.yaml
    │   │   └── patch-cronjob-schedule.yaml
    │   └── nginx-assets
    │       ├── patch-nginx-deployment-additional.yaml
    │       ├── patch-nginx-deployment-affinity.yaml
    │       └── patch-nginx-deployment-env-vars.yaml
    └── resources
        ├── ingress.yaml
        └── sealed-secrets.yaml
```

The following samples the files we would use for `example-app` in the STG overlay

**kustomization.yaml** - paths may need to be updated here to reference the base folder and kustomize-base submodule
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


namePrefix: example-

resources:
  - ../../base
  - resources/ingress.yaml
  - resources/sealed-secrets.yaml


commonLabels:
  gamesys.com/deployable: example-app


patchesStrategicMerge:
  - patches/app/patch-deployment-additional.yaml
  - patches/app/patch-deployment-affinity.yaml
  - patches/app/patch-deployment-configmap.yaml
  - patches/app/patch-deployment-env-vars.yaml
  - patches/app/patch-deployment-resources.yaml
  - patches/app/patch-deployment-readiness.yaml
  - patches/cronjob/patch-cronjob-additional.yaml
  - patches/cronjob/patch-cronjob-configmap.yaml
  - patches/cronjob/patch-cronjob-env-vars.yaml
  - patches/cronjob/patch-cronjob-resources.yaml
  - patches/cronjob/patch-cronjob-schedule.yaml
  - patches/nginx-assets/patch-nginx-deployment-additional.yaml
  - patches/nginx-assets/patch-nginx-deployment-affinity.yaml
  - patches/nginx-assets/patch-nginx-deployment-env-vars.yaml

patches:
- patch: |-
    - op: add
      path: /metadata/labels/isMonitored
      value: monitored
  target:
    kind: Service
    version: v1
    name: app-svc


configMapGenerator:
  - name: app-config
    files:
       - configmaps/application-stg-k8s.yaml

namespace: plng-stg-backend
```

**ingress.yaml**
```yaml
kind: Ingress
apiVersion: networking.k8s.io/v1
metadata:
  name: app-ingress
spec:
  rules:
    - host: example-app-plng-stg-backend.mt1-test.enjoy-platform.local
      http:
        paths:
        - backend:
            serviceName: app-svc
            servicePort: 8080
```

# Ephemeral overlays

IMPORTANT: In the `kustomization.yaml` for the eph overlays, do not include `namespace:`.  This is because for ephemeral environments the namespace will change based on what namespace is assigned to you to do your testing, meaning that if you hardcode it in `kustomization.yaml` you will get an error and the pipeline will fail.

# Example config for Java applications

The following is a non-exhaustive sample configuration for different possible combinations of java apps deployments:

- `example-configs/example-1-app`: basic 'traditional' java app
- `example-configs/example-2-app`: java application that has a cronjob and an nginx for assets that has a pvc shared with the java app (assets such as those in loyalty-app and rewardbox-app)
- `example-configs/example-3-app`: java application that has 2 cronjobs
- `example-configs/example-4-app`: cronjob only java application
- `example-configs/example-5-app`: java application that has an nginx to serve content
