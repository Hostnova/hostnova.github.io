# PowerShell script to optimize CSS and JS files for production
# Created on May 11, 2025

# This script will:
# 1. Create backup copies of the original files
# 2. Concatenate all CSS files into a single file
# 3. Concatenate all JS files into a single file
# 4. Minify CSS and JS (basic minification for demonstration)

$projectRoot = "c:\Users\user\Documents\projects_from_git\project_hostnova"

# Create a backup folder
$backupFolder = Join-Path $projectRoot "production_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupFolder -Force | Out-Null

# Function to copy a directory structure to backup
function Backup-Directory {
    param (
        [string]$sourcePath,
        [string]$destinationPath
    )
    
    # Create the destination directory if it doesn't exist
    if (-not (Test-Path -Path $destinationPath)) {
        New-Item -ItemType Directory -Path $destinationPath -Force | Out-Null
    }
    
    # Copy all files in the source directory to the destination
    Get-ChildItem -Path $sourcePath -File | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination $destinationPath -Force
    }
    
    # Recursively copy subdirectories
    Get-ChildItem -Path $sourcePath -Directory | ForEach-Object {
        $newDestinationPath = Join-Path -Path $destinationPath -ChildPath $_.Name
        Backup-Directory -sourcePath $_.FullName -destinationPath $newDestinationPath
    }
}

# Backup CSS and JS directories
Write-Host "Creating backup copies..." -ForegroundColor Cyan
Backup-Directory -sourcePath (Join-Path $projectRoot "css") -destinationPath (Join-Path $backupFolder "css")
Backup-Directory -sourcePath (Join-Path $projectRoot "js") -destinationPath (Join-Path $backupFolder "js")
Write-Host "Backup completed to: $backupFolder" -ForegroundColor Green

# Create production folder
$prodFolder = Join-Path $projectRoot "production"
if (-not (Test-Path -Path $prodFolder)) {
    New-Item -ItemType Directory -Path $prodFolder -Force | Out-Null
}

# Directories for CSS and JS in production
$prodCssDir = Join-Path $prodFolder "css"
$prodJsDir = Join-Path $prodFolder "js"

New-Item -ItemType Directory -Path $prodCssDir -Force | Out-Null
New-Item -ItemType Directory -Path $prodJsDir -Force | Out-Null

# Concatenate CSS files
Write-Host "Concatenating CSS files..." -ForegroundColor Cyan
$cssFilesInOrder = @(
    # Core styles
    "css\core.css",
    "css\base.css",
    "css\layout.css",
    "css\components\color-palette.css",
    "css\components\buttons.css",
    
    # Animation system
    "css\animation-system.css",
    "css\animations.css",
    "css\components\section-transitions.css",
    
    # Visual effects
    "css\visual-effects.css",
    "css\components\cosmic-background.css",
    "css\components\orbital-elements.css",
    "css\components\section-background-loaders.css",
    
    # Content sections
    "css\content-sections.css",
    "css\components\hero.css",
    "css\components\hostara.css",
    "css\components\business-hostara.css",
    "css\landing-style.css"
)

$combinedCssContent = "/* HostNova - Optimized CSS - $(Get-Date -Format 'yyyy-MM-dd') */`n`n"

foreach ($cssFile in $cssFilesInOrder) {
    $fullPath = Join-Path $projectRoot $cssFile
    if (Test-Path $fullPath) {
        $fileContent = Get-Content -Path $fullPath -Raw
        
        # Basic CSS minification (remove comments and unnecessary whitespace)
        $fileContent = $fileContent -replace "/\*.*?\*/", "" -replace "[\r\n\t]+", " " -replace "[ ]+", " " -replace ": ", ":" -replace " \{", "{" -replace "\} ", "}" -replace ", ", ","
        
        $combinedCssContent += "`n/* From: $cssFile */`n$fileContent"
    } else {
        Write-Host "Warning: File not found - $fullPath" -ForegroundColor Yellow
    }
}

# Save combined CSS
$combinedCssPath = Join-Path $prodCssDir "hostnova.min.css"
$combinedCssContent | Out-File -FilePath $combinedCssPath -Encoding utf8 -Force
Write-Host "Combined CSS saved to: $combinedCssPath" -ForegroundColor Green

# Concatenate JS files
Write-Host "Concatenating JS files..." -ForegroundColor Cyan
$jsFilesInOrder = @(
    "js\core.js",
    "js\visual-effects.js",
    "js\interactions.js",
    "js\sections.js",
    "js\main.min.js"
)

$combinedJsContent = "/* HostNova - Optimized JavaScript - $(Get-Date -Format 'yyyy-MM-dd') */`n`n"

foreach ($jsFile in $jsFilesInOrder) {
    $fullPath = Join-Path $projectRoot $jsFile
    if (Test-Path $fullPath) {
        $fileContent = Get-Content -Path $fullPath -Raw
        
        # Basic JS minification (remove comments and unnecessary whitespace)
        $fileContent = $fileContent -replace "//.*", "" -replace "/\*.*?\*/", "" -replace "[\r\n\t]+", " " -replace "[ ]+", " " -replace "; ", ";" -replace " \{", "{" -replace "\} ", "}"
        
        $combinedJsContent += "`n/* From: $jsFile */`n$fileContent"
    } else {
        Write-Host "Warning: File not found - $fullPath" -ForegroundColor Yellow
    }
}

# Save combined JS
$combinedJsPath = Join-Path $prodJsDir "hostnova.min.js"
$combinedJsContent | Out-File -FilePath $combinedJsPath -Encoding utf8 -Force
Write-Host "Combined JS saved to: $combinedJsPath" -ForegroundColor Green

# Create a production-ready index.html
Write-Host "Creating production index.html..." -ForegroundColor Cyan
$indexHtmlPath = Join-Path $projectRoot "index.html"
$prodIndexHtmlPath = Join-Path $prodFolder "index.html"

# Read the original index.html
$indexHtmlContent = Get-Content -Path $indexHtmlPath -Raw

# Replace CSS and JS references
$indexHtmlContent = $indexHtmlContent -replace '<link rel="stylesheet" href="css/main.css">', '<link rel="stylesheet" href="css/hostnova.min.css">'
$indexHtmlContent = $indexHtmlContent -replace '<script src="js/core.js" defer></script>(\s+)<script src="js/visual-effects.js" defer></script>(\s+)<script src="js/interactions.js" defer></script>(\s+)<script src="js/sections.js" defer></script>(\s+)<script src="js/main.min.js" defer></script>', '<script src="js/hostnova.min.js" defer></script>'

# Save production index.html
$indexHtmlContent | Out-File -FilePath $prodIndexHtmlPath -Encoding utf8 -Force
Write-Host "Production index.html saved to: $prodIndexHtmlPath" -ForegroundColor Green

# Copy other necessary files
Write-Host "Copying other necessary files to production folder..." -ForegroundColor Cyan
Copy-Item -Path (Join-Path $projectRoot "images") -Destination $prodFolder -Recurse -Force
Copy-Item -Path (Join-Path $projectRoot "videos") -Destination $prodFolder -Recurse -Force
Copy-Item -Path (Join-Path $projectRoot "favicon*.png") -Destination $prodFolder -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $projectRoot "site.webmanifest") -Destination $prodFolder -Force -ErrorAction SilentlyContinue

# Summary
$originalCssSize = 0
Get-ChildItem -Path (Join-Path $projectRoot "css") -Filter *.css -Recurse | ForEach-Object {
    $originalCssSize += $_.Length
}

$originalJsSize = 0
Get-ChildItem -Path (Join-Path $projectRoot "js") -Filter *.js -Recurse | ForEach-Object {
    $originalJsSize += $_.Length
}

$prodCssSize = (Get-Item $combinedCssPath).Length
$prodJsSize = (Get-Item $combinedJsPath).Length

$cssSavings = [math]::Round(100 - ($prodCssSize * 100 / $originalCssSize), 2)
$jsSavings = [math]::Round(100 - ($prodJsSize * 100 / $originalJsSize), 2)

Write-Host "`nOptimization complete!" -ForegroundColor Green
Write-Host "--------------------------" -ForegroundColor Cyan
Write-Host "Original CSS size: $([math]::Round($originalCssSize / 1KB, 2)) KB" -ForegroundColor White
Write-Host "Optimized CSS size: $([math]::Round($prodCssSize / 1KB, 2)) KB" -ForegroundColor White
Write-Host "CSS size reduction: $cssSavings%" -ForegroundColor Green
Write-Host "--------------------------" -ForegroundColor Cyan
Write-Host "Original JS size: $([math]::Round($originalJsSize / 1KB, 2)) KB" -ForegroundColor White
Write-Host "Optimized JS size: $([math]::Round($prodJsSize / 1KB, 2)) KB" -ForegroundColor White
Write-Host "JS size reduction: $jsSavings%" -ForegroundColor Green
Write-Host "--------------------------" -ForegroundColor Cyan
Write-Host "Production files are ready in: $prodFolder" -ForegroundColor Green
Write-Host "To test production build, navigate to: $prodFolder and open index.html" -ForegroundColor Cyan
