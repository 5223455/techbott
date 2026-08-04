$dir = "c:\Users\saket\Downloads\public_html (1)"

# 1. Remove dates in blogs.html
$blogsPath = Join-Path $dir "pages\general\blogs.html"
$blogsContent = Get-Content $blogsPath -Raw
$blogsContent = $blogsContent -replace '(?s)<small class="text-muted"><i class="fa fa-calendar-alt me-2 text-primary"></i>.*?</small>\s*', ''
Set-Content $blogsPath $blogsContent

# 2. Fix 'customise' in maplejet files
$maplejetFiles = @(
    "pages\products\ultro.html",
    "pages\products\Ultro-25w.html",
    "pages\products\Hx-Nitro.html",
    "pages\products\Hx-Megalo.html",
    "pages\products\Hx-Cartro.html"
)
foreach ($file in $maplejetFiles) {
    $path = Join-Path $dir $file
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        $content = $content -replace "customise", "customize"
        Set-Content $path $content
    }
}

# 3. Fix emails across entire website
Get-ChildItem -Path $dir -Recurse -File -Include *.html,*.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $changed = $false
    
    if ($content -match "info@techbott.com") {
        $content = $content -replace "info@techbott.com", "info@techbottindia.com"
        $changed = $true
    }
    
    # footer pattern
    if ($content -match "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sales@techbottindia.com") {
        $content = $content -replace "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sales@techbottindia.com", ""
        $changed = $true
    }
    # contact pattern
    if ($content -match "<br>\s*sales@techbottindia.com") {
        $content = $content -replace "<br>\s*sales@techbottindia.com", ""
        $changed = $true
    }
    # generic pattern if still exists
    if ($content -match "sales@techbottindia.com") {
        $content = $content -replace "sales@techbottindia.com", ""
        $changed = $true
    }
    # chatbot pattern
    $content = $content -replace ', sales: ""', ''
    
    if ($changed) {
        Set-Content $_.FullName $content
    }
}
Write-Output "Done replacing."
