# React_Projects_MR

Monorepo con mis sitios web. Cada carpeta es un sitio independiente que se despliega a su propio
bucket S3 + distribución CloudFront (infraestructura en **AWS_Cloud_MR**), bajo el mismo dominio del portafolio.

| Carpeta | Tipo | Workflow | Infra (AWS_Cloud_MR) | Prefijo de variables |
|---------|------|----------|----------------------|----------------------|
| [`modern_personal_website/`](modern_personal_website) | React (CRA) — portafolio | `modern-personal-website.yml` | `portfolio_web` | `PORTFOLIO_` |
| [`profecan/`](profecan) | React (CRA) + react-router | `profecan.yml` | `profecan_stack` | `PROFECAN_` |
| [`apartamento_rionegro/`](apartamento_rionegro) | HTML/CSS estático (sin build) | `apartamento-rionegro.yml` | `apartamento_rionegro_stack` | `APARTAMENTO_` |

## Cómo funciona el CI/CD

- Cada workflow tiene un filtro `paths`: **solo se ejecuta cuando cambia algo dentro de su carpeta**.
- Todos llaman al workflow reutilizable `.github/workflows/_s3-site.yml`:
  1. **build**: React → `npm ci`, tests, `react-scripts build`. Estático → copia la carpeta (sin `.claude/` ni README).
  2. **security-scan**: gitleaks.
  3. **deploy** (solo push a `trunk`): `aws s3 sync --delete` al bucket + invalidación `/*` de CloudFront.
- El deploy se **omite** (no falla) mientras `<PREFIJO>_BUCKET_NAME` no exista.
- Todos se pueden lanzar a mano desde **Actions → (workflow) → Run workflow**.

## Secretos y variables

Settings → Secrets and variables → Actions, **a nivel repositorio**:

| Tipo | Nombre | Valor |
|------|--------|-------|
| Secret | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | Las mismas llaves de AWS_Cloud_MR |
| Variable | `REGION` | Región de los buckets |
| Variable | `PORTFOLIO_BUCKET_NAME`, `PORTFOLIO_DISTRIBUTION_ID` | Bucket y distribución del stack `portfolio_web` |
| Variable | `PROFECAN_BUCKET_NAME`, `PROFECAN_DISTRIBUTION_ID` | Outputs del stack `profecan_stack` |
| Variable | `APARTAMENTO_BUCKET_NAME`, `APARTAMENTO_DISTRIBUTION_ID` | Outputs del stack `apartamento_rionegro_stack` |

El job *Stack outputs* del deploy en AWS_Cloud_MR imprime el bucket y el `distributionId` de profecan y apartamento.
Los del portafolio están en la consola (CloudFormation → stack del portafolio → Resources).

## Desarrollo local

```bash
cd profecan            # o modern_personal_website
npm ci
npm start
```

`apartamento_rionegro` se sirve con `npx serve apartamento_rionegro`.
