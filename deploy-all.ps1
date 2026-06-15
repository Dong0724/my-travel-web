param(
  [string]$Message = "Update travel website"
)

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$DeployDir = Join-Path $Root "deploy-cloudflare-pages"
$RequiredItems = @("index.html", "app.js", "styles.css", "assets", "_worker.js")

Set-Location $Root
$env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")

foreach ($Item in $RequiredItems) {
  if (-not (Test-Path -LiteralPath (Join-Path $Root $Item))) {
    throw "Missing required item: $Item"
  }
}

if (Test-Path -LiteralPath $DeployDir) {
  $ResolvedDeploy = (Resolve-Path -LiteralPath $DeployDir).Path
  if (-not $ResolvedDeploy.StartsWith($Root, [StringComparison]::OrdinalIgnoreCase)) {
    throw "Refuse to clean deploy folder outside project root: $ResolvedDeploy"
  }
  Remove-Item -LiteralPath $ResolvedDeploy -Recurse -Force
}

New-Item -ItemType Directory -Path $DeployDir | Out-Null
Copy-Item -LiteralPath (Join-Path $Root "index.html"), (Join-Path $Root "app.js"), (Join-Path $Root "styles.css"), (Join-Path $Root "_worker.js") -Destination $DeployDir -Force
Copy-Item -LiteralPath (Join-Path $Root "assets") -Destination $DeployDir -Recurse -Force

git add .

$Staged = git diff --cached --name-only
if ($Staged) {
  git commit -m $Message
  git push origin main
} else {
  Write-Host "No Git changes to commit. Skipping GitHub push."
}

npx --yes wrangler pages deploy $DeployDir --project-name my-travel-web --branch main

Write-Host ""
Write-Host "GitHub Pages:    https://dong0724.github.io/my-travel-web/"
Write-Host "Cloudflare Pages: https://my-travel-web.pages.dev/"
