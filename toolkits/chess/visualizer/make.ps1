function Select-Choice($prompt, $items) {
    Write-Host $prompt
    Write-Host $items.length
    for ($i = 1; $i -le $items.length; $i++) {
        Write-Host "[$i] " $items[$i - 1].Name
    }

    $idx = -1
    while ($idx -lt 0 -or $idx -ge $items.length) {
        $str = Read-Host "Enter number"
        $idx = ($str -as [int]) - 1
    }


    return $items[$idx].FullName
}

function Get-AnkiMediaPath() {
    $paths = ls ~\AppData\Roaming\Anki2\ -Directory |
        ? { Test-Path (Join-Path $_.FullName "collection.media") }

    if ($paths.length -eq 0) {
        return ""
    } else {
        $path = if ($paths.length -eq 1) { $paths[0] }
                else { Select-Choice "Select Anki Profile:" $paths }
        return Join-Path $path "collection.media"
    }
}

function Build-Optimized() {
    elm make src/Main.elm --output build/app.js --optimize
}

if ($args[0] -eq "live") {
    elm-live src/Main.elm --open '--' --output build/app.js --debug
}
elseif ($args[0] -eq "anki") {
    $path = Get-AnkiMediaPath
    if ($path.Empty) {
        Write-Error "No Anki profiles found. Deployment aborted."
    }
    else {
        Write-Host "Building..."
        Build-Optimized
        $version = (get-date).ToString("yyMMdd_mmss")
        $name = "_acv_v1_$version.js"
        Write-Host "Deploying '$name' to '$path'..."
        cp "build\app.js" "$path\$name" -Force
        Write-Host "Success!"
    }
}
elseif ($args[0] -eq "gh") {
    $path = "~\src\eulerphi.github.io\acv\build\"
    if (-not (Test-Path $path)) {
        Write-Error "'$path' not found. Deployment aborted."
    }
    else {
        Write-Host "Building..."
        Build-Optimized

        Write-Host "Deploying to '$path'..."
        cp "build\app.js" $path -Force
        Write-Host "Success!"
    }
}
else {
    elm make src/Main.elm --output build/app.js
}