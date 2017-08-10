{{/* Generate image labels */}}
{{- define "image_labels" }}
image: {{ .Values.config.image_repo }}:{{ default "latest" .Values.app.version }}
imagePullPolicy: {{ default "IfNotPresent" .Values.config.image_pull_policy }}
{{- end }}

{{/* Generate env labels */}}
{{- define "env_labels" }}
env:
- name: KUBERNETES_NODE_NAME
  valueFrom:
    fieldRef:
      fieldPath: spec.nodeName
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

{{/* Generate external dns */}}
{{- define "external_dns" }}
external-dns.alpha.kubernetes.io/hostname: {{ .Values.app.host }}.
{{- end }}
