if ($args[0] -eq "live") {
    elm-live src/Main.elm --open '--' --output build/app.js --debug
}
elseif ($args[0] -eq "optimize") {
    elm make src/Main.elm --output build/app.js --optimize
}
else {
    elm make src/Main.elm --output build/app.js
}