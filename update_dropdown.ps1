$files = Get-ChildItem -Path "c:\Users\saket\Downloads\public_html (1)" -Filter "*.html" -Recurse
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    $changed = $false
    
    if ($content -match '<a href="pages/technology/Leibinger\.html" class="dropdown-item">Leibinger</a>') {
        $content = $content -replace '<a href="pages/technology/Leibinger\.html" class="dropdown-item">Leibinger</a>', '<a href="pages/technology/Continuous-Inkjet-(CIJ)-printers.html" class="dropdown-item">Continuous Inkjet (CIJ)</a>'
        $changed = $true
    }
    
    if ($content -match '<a href="\.\./\.\./pages/technology/Leibinger\.html" class="dropdown-item">Leibinger</a>') {
        $content = $content -replace '<a href="\.\./\.\./pages/technology/Leibinger\.html" class="dropdown-item">Leibinger</a>', '<a href="../../pages/technology/Continuous-Inkjet-(CIJ)-printers.html" class="dropdown-item">Continuous Inkjet (CIJ)</a>'
        $changed = $true
    }
    
    if ($changed) {
        Set-Content -Path $f.FullName -Value $content -NoNewline
        Write-Host "Updated $($f.FullName)"
    }
}
