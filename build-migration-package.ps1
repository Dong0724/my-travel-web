param(
  [string]$OutputPath
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectName = "TravelWeb"
$DateStamp = Get-Date -Format "yyyyMMdd"

Set-Location $Root
$env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "Git is required to build the migration package."
}

if (-not $OutputPath) {
  $OutputPath = Join-Path (Split-Path -Parent $Root) "$ProjectName-Win-$DateStamp.zip"
}

$OutputPath = [IO.Path]::GetFullPath($OutputPath)
$TempRoot = [IO.Path]::GetFullPath($env:TEMP)
$StageRoot = Join-Path $TempRoot "$ProjectName-Migration-$([Guid]::NewGuid().ToString('N'))"
$StageProject = Join-Path $StageRoot $ProjectName

try {
  New-Item -ItemType Directory -Path $StageProject -Force | Out-Null

  $TrackedFiles = git ls-files
  foreach ($RelativePath in $TrackedFiles) {
    $Source = Join-Path $Root $RelativePath
    $Destination = Join-Path $StageProject $RelativePath
    $DestinationDirectory = Split-Path -Parent $Destination
    if (-not (Test-Path -LiteralPath $DestinationDirectory)) {
      New-Item -ItemType Directory -Path $DestinationDirectory -Force | Out-Null
    }
    Copy-Item -LiteralPath $Source -Destination $Destination -Force
  }

  $SourceCommit = git rev-parse HEAD
  Set-Content -LiteralPath (Join-Path $StageProject "SOURCE-COMMIT.txt") -Value $SourceCommit -Encoding ASCII

  if (Test-Path -LiteralPath $OutputPath) {
    Remove-Item -LiteralPath $OutputPath -Force
  }

  tar.exe -a -c -f $OutputPath -C $StageRoot $ProjectName
  if ($LASTEXITCODE -ne 0) {
    throw "tar.exe failed to create the zip package."
  }

  $Package = Get-Item -LiteralPath $OutputPath
  Write-Host "Migration package created:"
  Write-Host $Package.FullName
  Write-Host "Size: $([Math]::Round($Package.Length / 1MB, 2)) MB"
} finally {
  if (Test-Path -LiteralPath $StageRoot) {
    $ResolvedStage = (Resolve-Path -LiteralPath $StageRoot).Path
    if (-not $ResolvedStage.StartsWith($TempRoot, [StringComparison]::OrdinalIgnoreCase)) {
      throw "Refuse to clean staging folder outside TEMP: $ResolvedStage"
    }
    Remove-Item -LiteralPath $ResolvedStage -Recurse -Force
  }
}
