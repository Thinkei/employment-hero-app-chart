{{/* Generate image labels */}}
{{- define "image_labels" }}
image: {{ .Values.config.image_repo }}:{{ default "latest" .Values.app.version }}
imagePullPolicy: {{ default "IfNotPresent" .Values.config.image_pull_policy }}
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
external-dns.alpha.kubernetes.io/hostname: {{ . }}.
{{- end }}
