# Sube los builds de Unity WebGL al bucket R2 `athernix-assets`.
# Requisito: `npx wrangler login` previamente (cuenta con acceso al bucket).
#
# Uso:  .\scripts\upload-unity-r2.ps1
#
# Después de subir, configurar en el proyecto de Cloudflare (build variables):
#   NEXT_PUBLIC_ASSETS_URL = https://assets.athernix.com
# (o la URL pública del worker r2-assets / del bucket)

$ErrorActionPreference = "Stop"
$buildDir = Join-Path $PSScriptRoot "..\public\Unity\Build"
$bucket = "athernix-assets"

$files = @(
  "HistoryV2.loader.js", "HistoryV2.framework.js", "HistoryV2.wasm", "HistoryV2.data",
  "MentalV2.loader.js",  "MentalV2.framework.js",  "MentalV2.wasm",  "MentalV2.data",
  "LobbyV4.loader.js",   "LobbyV4.framework.js",   "LobbyV4.wasm",   "LobbyV4.data"
)

foreach ($f in $files) {
  $path = Join-Path $buildDir $f
  if (-not (Test-Path $path)) {
    Write-Warning "No existe: $f — se omite"
    continue
  }
  $size = "{0:N1} MB" -f ((Get-Item $path).Length / 1MB)
  Write-Host "Subiendo Unity/Build/$f ($size)..."
  npx wrangler r2 object put "$bucket/Unity/Build/$f" --file $path --remote
  if ($LASTEXITCODE -ne 0) { throw "Falló la subida de $f" }
}

# Modelo 3D de Ather (usado por /experience via assetUrl)
$atherDir = Join-Path $PSScriptRoot "..\public\AtherModel"
$atherFiles = @("AthernixitoUnityVer.fbx")
foreach ($f in $atherFiles) {
  $path = Join-Path $atherDir $f
  if (-not (Test-Path $path)) {
    Write-Warning "No existe: $f — se omite"
    continue
  }
  $size = "{0:N1} MB" -f ((Get-Item $path).Length / 1MB)
  Write-Host "Subiendo AtherModel/$f ($size)..."
  npx wrangler r2 object put "$bucket/AtherModel/$f" --file $path --remote
  if ($LASTEXITCODE -ne 0) { throw "Falló la subida de $f" }
}

Write-Host "`nListo. Verifica con:"
Write-Host "  npx wrangler r2 object list $bucket --prefix Unity/Build --remote"
Write-Host "  npx wrangler r2 object list $bucket --prefix AtherModel --remote"
