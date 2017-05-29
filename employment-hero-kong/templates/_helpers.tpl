{{/* Generate image labels */}}
{{- define "image_labels" }}
image: {{ .Values.config.image_repo }}:{{ default "latest" .Values.app.version }}
imagePullPolicy: {{ default "IfNotPresent" .Values.config.image_pull_policy }}
{{- end }}

{{/* Generate env labels */}}
{{- define "env_labels" }}
env:
- name: KUBERNETES_POD_IP
  valueFrom:
    fieldRef:
      fieldPath: status.podIP
- name: KUBERNETES_NODE_NAME
  valueFrom:
    fieldRef:
      fieldPath: spec.nodeName
- name: KUBERNETES_NAMESPACE
  valueFrom:
    fieldRef:
      fieldPath: metadata.namespace
- name: KONG_CLUSTER_ADVERTISE
  value: $(KUBERNETES_POD_IP):7946
{{- $secret := .Values.app.name -}}
{{- range $key, $val := .Values.env }}
{{- if $val }}
- name: {{ $key }}
  valueFrom:
    secretKeyRef:
      name: {{ $secret }}
      key: {{ $key }}
{{- end }}
{{- end }}
{{- end }}

{{/* Generate command labels */}}
{{- define "command_labels" }}
command: [{{- range $index, $value := . }}
  {{- if $index }},{{ end }}
  {{- $value | quote }}
{{- end }}]
{{- end }}
