Employment Hero App Chart
=========================

This is Employment Hero application definitions for [Kubernetes Helm](https://helm.sh). For more information about installing and using Helm, see its [README.md](https://github.com/kubernetes/helm/tree/master/README.md). To get a quick introduction to Charts see this [chart document](https://github.com/kubernetes/helm/blob/master/docs/charts.md).

Usage
=====

|Command|Description|
|---|---|
|`make lint`|Runs `helm lint employment-hero-app`, lints templates|
|`make test name=<app_name>`|Tests if the chart generating correct results|
|`make package`|Packages chart and prepare to release|
