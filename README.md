Employment Hero App Chart
=========================

This is Employment Hero application definitions for [Kubernetes Helm](https://helm.sh). For more information about installing and using Helm, see its [README.md](https://github.com/kubernetes/helm/tree/master/README.md). To get a quick introduction to Charts see this [chart document](https://github.com/kubernetes/helm/blob/master/docs/charts.md).

Charts
=====
In the current repository, we are maintaining 2 types of charts:
- `employment-hero-app`: the main helm chart that applies for most normal
  application in our system.
- `employment-hero-kong`: special helm chart used for Kong API gateway.

All those helm charts are gathered into one Helm Repository and hosted on Github. The URL of the repository: [https://thinkei.github.io/employment-hero-app-chart/](https://thinkei.github.io/employment-hero-app-chart/)
Add Employment Hero chart report to helm using the following command:
```bash
helm repo add employment-hero https://thinkei.github.io/employment-hero-app-chart
```

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

Release
===========
After updating helm chart, please follow the following to release to helm repository
- Update the helm chart verstionin `Chart.yml` file.
- Package your updated helm chart, for example `helm package employment-hero-app`
- Update the helm repository index file with: `helm repo index . --url https://thinkei.github.io/employment-hero-app-chart`
- Commit and publish, and done <3
