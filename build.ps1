param(
  [string]$OutputDirectory = "dist"
)

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$RequiredItems = @("index.html", "app.js", "styles.css", "_worker.js", "assets")
$OutputPath = [IO.Path]::GetFullPath((Join-Path $Root $OutputDirectory))
$RootPath = [IO.Path]::GetFullPath($Root).TrimEnd("\") + "\"

if (-not $OutputPath.StartsWith($RootPath, [StringComparison]::OrdinalIgnoreCase)) {
  throw "Output directory must be inside the project root."
}

foreach ($Item in $RequiredItems) {
  if (-not (Test-Path -LiteralPath (Join-Path $Root $Item))) {
    throw "Missing required item: $Item"
  }
}

if (Test-Path -LiteralPath $OutputPath) {
  Remove-Item -LiteralPath $OutputPath -Recurse -Force
}

New-Item -ItemType Directory -Path $OutputPath -Force | Out-Null

foreach ($File in @("index.html", "app.js", "styles.css", "_worker.js")) {
  Copy-Item -LiteralPath (Join-Path $Root $File) -Destination $OutputPath -Force
}

Copy-Item -LiteralPath (Join-Path $Root "assets") -Destination $OutputPath -Recurse -Force

$MissingReferences = @()
$ReferenceMatches = Select-String `
  -Path (Join-Path $Root "index.html"), (Join-Path $Root "styles.css"), (Join-Path $Root "app.js") `
  -Pattern 'assets/[A-Za-z0-9_./-]+' `
  -AllMatches

$References = $ReferenceMatches |
  ForEach-Object { $_.Matches.Value } |
  Sort-Object -Unique

foreach ($Reference in $References) {
  if (-not (Test-Path -LiteralPath (Join-Path $OutputPath $Reference))) {
    $MissingReferences += $Reference
  }
}

if ($MissingReferences.Count -gt 0) {
  throw "Build contains missing asset references: $($MissingReferences -join ', ')"
}

$Files = Get-ChildItem -LiteralPath $OutputPath -Recurse -File
$Size = ($Files | Measure-Object -Property Length -Sum).Sum

Write-Host "Build completed successfully."
Write-Host "Output: $OutputPath"
Write-Host "Files: $($Files.Count)"
Write-Host "Size: $([Math]::Round($Size / 1MB, 2)) MB"
