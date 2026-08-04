$files = Get-ChildItem -Path '.' -Filter '*.html' -Recurse
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    if ($content -match 'pioneering') {
        $content = $content -replace 'is a pioneering company', 'is a pioneer company'
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($file.FullName)"
    }
}
