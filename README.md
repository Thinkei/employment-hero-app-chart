Employment Hero App Chart
=========================

This is Employment Hero application definitions for [Kubernetes Helm](https://helm.sh). For more information about installing and using Helm, see its [README.md](https://github.com/kubernetes/helm/tree/master/README.md). To get a quick introduction to Charts see this [chart document](https://github.com/kubernetes/helm/blob/master/docs/charts.md).

Usage
=====

**Step 1:** Download the chart and extract the values file
```bash
curl -sL https://github.com/Thinkei/employment-hero-app-chart/releases/download/v0.2.2/employment-hero-app-0.2.2.tgz -o employment-hero-app-0.2.2.tgz
helm inspect values employment-hero-app-0.2.2.tgz | sed -n '1!p' > values.yaml
```

**Step 2:** Update configurations in values file and install
```bash
helm install \
  --namespace <namespace> \
  -name <release_name> \
  -f values.yaml \
  employment-hero-app-0.2.2.tgz
```

Development
===========

|Command|Description|
|---|---|
|`make lint`|Runs `helm lint employment-hero-app`, lints templates|
|`make test name=<app_name>`|Tests if the chart generating correct results|
|`make package`|Packages chart and prepare to release|
