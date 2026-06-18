param(
  [switch]$SkipInstall
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

function Refresh-Path {
  $env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")
}

function Ensure-WingetPackage {
  param(
    [string]$Command,
    [string]$PackageId
  )

  Refresh-Path
  if (Get-Command $Command -ErrorAction SilentlyContinue) {
    Write-Host "$Command is already installed."
    return
  }

  if ($SkipInstall) {
    throw "$Command is missing. Install package $PackageId, then run this script again."
  }

  if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    throw "winget is unavailable. Install App Installer from Microsoft Store first."
  }

  winget install --id $PackageId -e --accept-source-agreements --accept-package-agreements --silent
  Refresh-Path

  if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) {
    throw "$Command installation finished but the command is still unavailable. Restart PowerShell and run this script again."
  }
}

Ensure-WingetPackage -Command "git" -PackageId "Git.Git"
Ensure-WingetPackage -Command "gh" -PackageId "GitHub.cli"
Ensure-WingetPackage -Command "node" -PackageId "OpenJS.NodeJS.LTS"

if (-not (Test-Path -LiteralPath (Join-Path $Root ".git"))) {
  throw "The .git folder is missing. Clone https://github.com/Dong0724/my-travel-web instead of using this incomplete folder."
}

$Remote = git remote get-url origin 2>$null
if (-not $Remote) {
  git remote add origin "https://github.com/Dong0724/my-travel-web.git"
}

gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "GitHub login is required. A browser authorization page will open."
  gh auth login --hostname github.com --web --git-protocol https
}

npx --yes wrangler whoami *> $null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Cloudflare login is required. A browser authorization page will open."
  npx --yes wrangler login
}

Write-Host ""
Write-Host "Environment is ready."
Write-Host "Run this command to deploy both websites:"
Write-Host '.\deploy-all.ps1 -Message "Redeploy from new Windows computer"'
