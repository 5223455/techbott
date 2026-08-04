$dir = "c:\Users\saket\Downloads\public_html (1)"
$files = Get-ChildItem -Path $dir -Recurse -File -Include *.html,*.js

foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    $changed = $false

    # Swap in standard footers (same line)
    $pattern1 = "info@techbottindia.com<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; marketing@techbottindia.com"
    if ($content.Contains($pattern1)) {
        $content = $content.Replace($pattern1, "marketing@techbottindia.com<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; info@techbottindia.com")
        $changed = $true
    }

    # Swap in multiline footers (like index.html)
    # Using regex to capture whatever spacing is there
    $pattern2 = "(?i)info@techbottindia\.com\s*<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\s*marketing@techbottindia\.com"
    if ($content -match $pattern2) {
        $content = [regex]::Replace($content, $pattern2, "marketing@techbottindia.com<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`r`n                        info@techbottindia.com")
        $changed = $true
    }

    # Swap in contact.html
    $pattern3 = "info@techbottindia\.com<br>marketing@techbottindia\.com"
    if ($content -match $pattern3) {
        $content = [regex]::Replace($content, $pattern3, "marketing@techbottindia.com<br>info@techbottindia.com")
        $changed = $true
    }
    
    # Change standalone email in paragraph
    if ($content.Contains("<p>info@techbottindia.com</p>")) {
        $content = $content.Replace("<p>info@techbottindia.com</p>", "<p>marketing@techbottindia.com</p>")
        $changed = $true
    }
    
    # Change standalone email in footer (with envelope icon)
    if ($content.Contains("<i class=`"fa fa-envelope me-3`"></i>info@techbottindia.com</p>")) {
        $content = $content.Replace("<i class=`"fa fa-envelope me-3`"></i>info@techbottindia.com</p>", "<i class=`"fa fa-envelope me-3`"></i>marketing@techbottindia.com</p>")
        $changed = $true
    }

    # Update mavya-chatbot.js
    if ($content.Contains("email: { general: `"info@techbottindia.com`", marketing: `"marketing@techbottindia.com`" }")) {
        $content = $content.Replace("email: { general: `"info@techbottindia.com`", marketing: `"marketing@techbottindia.com`" }", "email: { general: `"marketing@techbottindia.com`", info: `"info@techbottindia.com`" }")
        $changed = $true
    }

    if ($changed) {
        Set-Content $f.FullName $content
    }
}
Write-Output "Done swapping emails."
