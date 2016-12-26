.PHONY: help info lint package test

# config
name = invalid
namespace = default
chart = employment-hero-app
staging_name = $(name)-staging
production_name = $(name)-production
default_name = $(name)-default

help:
	@echo "make test namespace=<namespace> name=<app_name>"
	@echo "make install namespace=<namespace> name=<app_name>"
	@echo "make upgrade namespace=<namespace> name=<app_name>"
	@echo "make uninstall namespace=<namespace> name=<app_name>"

info:
	@echo "NAMESPACE         NAME"
	@echo "Default           $(default_name)"
	@echo "Staging           $(staging_name)"
	@echo "Production        $(production_name)"

validate_namespace_default:
validate_namespace_staging:
validate_namespace_production:

lint:
	helm lint $(chart)

package:
	helm package $(chart)
	mv -f *.tgz dist/

test: validate_namespace_$(namespace)
	helm install \
  --namespace $(namespace) \
  --name $($(namespace)_name) \
  --set app.name=$(name) \
  --dry-run --debug \
  $(chart)
