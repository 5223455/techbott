$files = Get-ChildItem -Path "c:\Users\saket\Downloads\public_html (1)\pages\technology" -Filter "*.html" -Recurse
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    $changed = $false
    
    if ($content -match '<a href="Leibinger\.html" class="dropdown-item">Leibinger</a>') {
        $content = $content -replace '<a href="Leibinger\.html" class="dropdown-item">Leibinger</a>', '<a href="Continuous-Inkjet-(CIJ)-printers.html" class="dropdown-item">Continuous Inkjet (CIJ)</a>'
        $changed = $true
    }
    
    if ($changed) {
        Set-Content -Path $f.FullName -Value $content -NoNewline
        Write-Host "Updated $($f.FullName)"
    }
}
