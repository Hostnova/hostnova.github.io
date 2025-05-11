# PowerShell script to remove unused CSS files from the HostNova project
# Created on May 10, 2025

$projectRoot = "c:\Users\user\Documents\projects_from_git\project_hostnova"

# List of unused CSS files to remove
$unusedCssFiles = @(
    # Root CSS files
    "css\style.css",
    "css\main.css",
    
    # Component CSS files
    "css\components\navigation.css",
    "css\components\cards.css",
    "css\components\features.css",
    "css\components\products.css",
    "css\components\business-solutions.css",
    "css\components\ai-interactions.css",
    "css\components\orbital-enhancements.css",
    "css\components\community.css",
    "css\components\team.css",
    "css\components\footer.css",
    "css\components\content-sections.css",
    "css\components\mission-soft-redesign.css",
    "css\components\fullpage-sections.css",
    "css\components\hero-fixed.css",
    "css\components\landing-content.css",
    "css\components\position-fix.css",
    "css\components\section-backgrounds.css",
    "css\components\section-widgets.css",
    "css\components\text-fix.css"
)

# Count for summary
$deletedCount = 0
$notFoundCount = 0
$errorCount = 0

# Create a backup folder
$backupFolder = Join-Path $projectRoot "css_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupFolder -Force | Out-Null
Write-Host "Created backup folder: $backupFolder" -ForegroundColor Green

# Back up all CSS files first
Write-Host "Backing up CSS files..." -ForegroundColor Cyan
Get-ChildItem -Path (Join-Path $projectRoot "css") -Filter *.css -Recurse | ForEach-Object {
    $relativePath = $_.FullName.Substring($projectRoot.Length + 1)
    $backupPath = Join-Path $backupFolder $relativePath
    $backupDir = Split-Path -Path $backupPath -Parent
    
    # Create directory structure in backup folder
    if (-not (Test-Path $backupDir)) {
        New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    }
    
    # Copy file to backup
    Copy-Item -Path $_.FullName -Destination $backupPath
}
Write-Host "Backup complete." -ForegroundColor Green

# Remove unused CSS files
Write-Host "Removing unused CSS files..." -ForegroundColor Yellow
foreach ($file in $unusedCssFiles) {
    $fullPath = Join-Path $projectRoot $file
    
    if (Test-Path $fullPath) {
        try {
            Remove-Item -Path $fullPath -Force
            Write-Host "Deleted: $file" -ForegroundColor Green
            $deletedCount++
        } catch {
            Write-Host "Error deleting: $file - $_" -ForegroundColor Red
            $errorCount++
        }
    } else {
        Write-Host "Not found: $file" -ForegroundColor Yellow
        $notFoundCount++
    }
}

# Display summary
Write-Host "`nCleanup Summary:" -ForegroundColor Cyan
Write-Host "Files deleted: $deletedCount" -ForegroundColor Green
Write-Host "Files not found: $notFoundCount" -ForegroundColor Yellow
Write-Host "Errors encountered: $errorCount" -ForegroundColor Red
Write-Host "`nBackup location: $backupFolder" -ForegroundColor Cyan
Write-Host "`nTo restore files if needed, run:" -ForegroundColor Cyan
Write-Host "Copy-Item -Path '$backupFolder\*' -Destination '$projectRoot' -Recurse -Force" -ForegroundColor Gray
