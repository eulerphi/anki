module Images exposing (..)


arrowsUri : String
arrowsUri =
    "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iQ2FwYV8xIgogICB4PSIwcHgiCiAgIHk9IjBweCIKICAgdmlld0JveD0iMCAwIDI4LjU3NyAyOC41NzciCiAgIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI4LjU3NyAyOC41Nzc7IgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBzb2RpcG9kaTpkb2NuYW1lPSI0YXJyb3dzLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcwogICBpZD0iZGVmczQwIiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgaWQ9Im5hbWVkdmlldzM4IgogICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgIHNob3dncmlkPSJmYWxzZSIKICAgaW5rc2NhcGU6em9vbT0iMzAuNTQ5MDQzIgogICBpbmtzY2FwZTpjeD0iMTQuMjcyMTMzIgogICBpbmtzY2FwZTpjeT0iMTQuMTI0ODI5IgogICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjM4NDAiCiAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjIwODAiCiAgIGlua3NjYXBlOndpbmRvdy14PSIyOTg5IgogICBpbmtzY2FwZTp3aW5kb3cteT0iLTExIgogICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJDYXBhXzEiIC8+CjxnCiAgIGlkPSJnNSIKICAgdHJhbnNmb3JtPSJyb3RhdGUoNDUsMTQuMjg4ODI0LDE0LjI4ODMzNSkiPgoJPGcKICAgaWQ9ImMxMTdfYXJyb3dzIj4KCQk8cGF0aAogICBzdHlsZT0iZmlsbDojMDMwMTA0IgogICBkPSJNIDI4LjE5LDEzLjU4OCAyNC4zODQsOS43ODIgQyAyMy44OSw5LjI5IDIzLjExMyw5LjI2MyAyMi42NTEsOS43MjggYyAtMC40NjIsMC40NjIgLTAuNDM5LDEuMjM3IDAuMDU3LDEuNzMyIGwgMS44MjEsMS44MjEgSCAxNS40ODIgViA0LjExOCBsIDEuODIsMS44MiBjIDAuNDk1LDAuNDkzIDEuMjcxLDAuNTIxIDEuNzMyLDAuMDU1IEMgMTkuNDk4LDUuNTI5IDE5LjQ3Niw0Ljc1NSAxOC45NzksNC4yNiBMIDE1LjE3NCwwLjQ1MyBDIDE0LjY3OSwtMC4wNCAxMy45MDMsLTAuMDY0IDEzLjQ0MSwwLjM5OSAxMy40MjgsMC40MTEgMTMuNDIsMC40MjMgMTMuNDEsMC40MzcgMTMuMzkzLDAuNDUgMTMuMzc0LDAuNDYyIDEzLjM1NiwwLjQ4MSBMIDkuNjA2LDQuMjM1IEMgOS4xMTgsNC43MjQgOS4wOTcsNS40OTMgOS41NjIsNS45NTcgMTAuMDI1LDYuNDE4IDEwLjc5NSw2LjQgMTEuMjg1LDUuOTEzIEwgMTMuMTEsNC4wODUgdiA5LjE5NiBIIDQuMDE3IGwgMS44MywtMS44MjcgQyA2LjMzNSwxMC45NjUgNi4zNTIsMTAuMTk0IDUuODg4LDkuNzMzIDUuNDI2LDkuMjY4IDQuNjU2LDkuMjg5IDQuMTY5LDkuNzc2IGwgLTMuNzU2LDMuNzUyIGMgLTAuMDE3LDAuMDIgLTAuMDI4LDAuMDM3IC0wLjA0MywwLjA1MyAtMC4wMTIsMC4wMTIgLTAuMDI2LDAuMDIxIC0wLjAzNywwLjAzIC0wLjQ2NSwwLjQ2NyAtMC40NCwxLjI0MSAwLjA1NywxLjczNCBsIDMuODA0LDMuODA3IGMgMC40OTQsMC40OTUgMS4yNzEsMC41MiAxLjczMywwLjA1NiAwLjQ2MiwtMC40NjQgMC40MzgsLTEuMjQgLTAuMDU2LC0xLjczMyBsIC0xLjgyLC0xLjgyIGggOS4wNTkgdiA4LjgwMyBsIC0xLjgxNywtMS44MiBjIC0wLjQ5NSwtMC40OTQgLTEuMjcxLC0wLjUxOSAtMS43MzQsLTAuMDU0IC0wLjQ2MywwLjQ2MyAtMC40MzksMS4yMzcgMC4wNTYsMS43MyBsIDMuODA1LDMuODA3IGMgMC40OTUsMC40OTYgMS4yNzEsMC41MiAxLjczNCwwLjA1NyAwLjAxMywtMC4wMTMgMC4wMjEsLTAuMDI0IDAuMDI5LC0wLjA0IDAuMDE4LC0wLjAxMyAwLjAzNiwtMC4wMjYgMC4wNTYsLTAuMDQyIEwgMTguOTksMjQuMzQgYyAwLjQ4OSwtMC40ODQgMC41MSwtMS4yNTYgMC4wNDUsLTEuNzIxIC0wLjQ2NSwtMC40NiAtMS4yMzQsLTAuNDQyIC0xLjcyMiwwLjA0MiBsIC0xLjgyOSwxLjgyOSAxMGUtNCwtOC44MzUgaCA5LjA3OCBsIC0xLjgzLDEuODMgYyAtMC40ODgsMC40ODUgLTAuNTA2LDEuMjU1IC0wLjA0MywxLjcyMiAwLjQ2MiwwLjQ2MiAxLjIzMiwwLjQ0MyAxLjcyMSwtMC4wNDYgbCAzLjc1NCwtMy43NTQgYyAwLjAxNywtMC4wMTYgMC4wMjksLTAuMDM2IDAuMDQ1LC0wLjA1MyAwLjAxMywtMC4wMTIgMC4wMjcsLTAuMDE5IDAuMDM5LC0wLjAzIDAuNDU5LC0wLjQ2NSAwLjQzNSwtMS4yNCAtMC4wNTksLTEuNzM2IHoiCiAgIGlkPSJwYXRoMiIgLz4KCTwvZz4KPC9nPgo8ZwogICBpZD0iZzciCiAgIHRyYW5zZm9ybT0icm90YXRlKDQ1LDE0LjI4ODgyNCwxNC4yODgzMzUpIj4KPC9nPgo8ZwogICBpZD0iZzkiCiAgIHRyYW5zZm9ybT0icm90YXRlKDQ1LDE0LjI4ODgyNCwxNC4yODgzMzUpIj4KPC9nPgo8ZwogICBpZD0iZzExIgogICB0cmFuc2Zvcm09InJvdGF0ZSg0NSwxNC4yODg4MjQsMTQuMjg4MzM1KSI+CjwvZz4KPGcKICAgaWQ9ImcxMyIKICAgdHJhbnNmb3JtPSJyb3RhdGUoNDUsMTQuMjg4ODI0LDE0LjI4ODMzNSkiPgo8L2c+CjxnCiAgIGlkPSJnMTUiCiAgIHRyYW5zZm9ybT0icm90YXRlKDQ1LDE0LjI4ODgyNCwxNC4yODgzMzUpIj4KPC9nPgo8ZwogICBpZD0iZzE3IgogICB0cmFuc2Zvcm09InJvdGF0ZSg0NSwxNC4yODg4MjQsMTQuMjg4MzM1KSI+CjwvZz4KPGcKICAgaWQ9ImcxOSIKICAgdHJhbnNmb3JtPSJyb3RhdGUoNDUsMTQuMjg4ODI0LDE0LjI4ODMzNSkiPgo8L2c+CjxnCiAgIGlkPSJnMjEiCiAgIHRyYW5zZm9ybT0icm90YXRlKDQ1LDE0LjI4ODgyNCwxNC4yODgzMzUpIj4KPC9nPgo8ZwogICBpZD0iZzIzIgogICB0cmFuc2Zvcm09InJvdGF0ZSg0NSwxNC4yODg4MjQsMTQuMjg4MzM1KSI+CjwvZz4KPGcKICAgaWQ9ImcyNSIKICAgdHJhbnNmb3JtPSJyb3RhdGUoNDUsMTQuMjg4ODI0LDE0LjI4ODMzNSkiPgo8L2c+CjxnCiAgIGlkPSJnMjciCiAgIHRyYW5zZm9ybT0icm90YXRlKDQ1LDE0LjI4ODgyNCwxNC4yODgzMzUpIj4KPC9nPgo8ZwogICBpZD0iZzI5IgogICB0cmFuc2Zvcm09InJvdGF0ZSg0NSwxNC4yODg4MjQsMTQuMjg4MzM1KSI+CjwvZz4KPGcKICAgaWQ9ImczMSIKICAgdHJhbnNmb3JtPSJyb3RhdGUoNDUsMTQuMjg4ODI0LDE0LjI4ODMzNSkiPgo8L2c+CjxnCiAgIGlkPSJnMzMiCiAgIHRyYW5zZm9ybT0icm90YXRlKDQ1LDE0LjI4ODgyNCwxNC4yODgzMzUpIj4KPC9nPgo8ZwogICBpZD0iZzM1IgogICB0cmFuc2Zvcm09InJvdGF0ZSg0NSwxNC4yODg4MjQsMTQuMjg4MzM1KSI+CjwvZz4KPC9zdmc+Cg==)"


boardUri : String -> String
boardUri name =
    case name of
        "blue" ->
            "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgODAwIDgwMCI+CjxnIGlkPSJicm93bi1ib2FyZCI+CjxnIGlkPSJMaWdodCIgZmlsbD0iI2RlZTNlNiI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIi8+CjwvZz4KPGcgaWQ9IkZyYW1lIiBmaWxsPSJub25lIj4KPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiLz4KPC9nPgo8ZyBpZD0iRGFyayIgZmlsbD0iIzhjYTJhZCI+CjxnIGlkPSJyYXoiPgo8ZyBpZD0iZHZhIj4KPGcgaWQ9InRyaSI+CjxyZWN0IHg9IjEwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiLz4KPHJlY3QgeD0iMzAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPgo8cmVjdCB4PSI1MDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIi8+CjxyZWN0IHg9IjcwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiLz4KPC9nPgo8dXNlIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDAsMTAwKSIgeGxpbms6aHJlZj0iI3RyaSIvPgo8L2c+Cjx1c2UgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwyMDApIiB4bGluazpocmVmPSIjZHZhIi8+CjwvZz4KPHVzZSB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDQwMCkiIHhsaW5rOmhyZWY9IiNyYXoiLz4KPC9nPgo8L2c+Cjwvc3ZnPg==')"

        "green" ->
            "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4PSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgOCA4IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgo8ZyBpZD0iYSI+CiAgPGcgaWQ9ImIiPgogICAgPGcgaWQ9ImMiPgogICAgICA8ZyBpZD0iZCI+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZmZkZCIgaWQ9ImUiLz4KICAgICAgICA8dXNlIHg9IjEiIHk9IjEiIGhyZWY9IiNlIiB4OmhyZWY9IiNlIi8+CiAgICAgICAgPHJlY3QgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzg2YTY2NiIgaWQ9ImYiLz4KICAgICAgICA8dXNlIHg9IjEiIHk9Ii0xIiBocmVmPSIjZiIgeDpocmVmPSIjZiIvPgogICAgICA8L2c+CiAgICAgIDx1c2UgeD0iMiIgaHJlZj0iI2QiIHg6aHJlZj0iI2QiLz4KICAgIDwvZz4KICAgIDx1c2UgeD0iNCIgaHJlZj0iI2MiIHg6aHJlZj0iI2MiLz4KICA8L2c+CiAgPHVzZSB5PSIyIiBocmVmPSIjYiIgeDpocmVmPSIjYiIvPgo8L2c+Cjx1c2UgeT0iNCIgaHJlZj0iI2EiIHg6aHJlZj0iI2EiLz4KPC9zdmc+)"

        -- gray
        _ ->
            "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4PSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgOCA4IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgo8ZyBpZD0iYSI+CiAgPGcgaWQ9ImIiPgogICAgPGcgaWQ9ImMiPgogICAgICA8ZyBpZD0iZCI+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiIGlkPSJlIi8+CiAgICAgICAgPHVzZSB4PSIxIiB5PSIxIiBocmVmPSIjZSIgeDpocmVmPSIjZSIvPgogICAgICAgIDxyZWN0IHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImxpZ2h0Z3JheSIgaWQ9ImYiLz4KICAgICAgICA8dXNlIHg9IjEiIHk9Ii0xIiBocmVmPSIjZiIgeDpocmVmPSIjZiIvPgogICAgICA8L2c+CiAgICAgIDx1c2UgeD0iMiIgaHJlZj0iI2QiIHg6aHJlZj0iI2QiLz4KICAgIDwvZz4KICAgIDx1c2UgeD0iNCIgaHJlZj0iI2MiIHg6aHJlZj0iI2MiLz4KICA8L2c+CiAgPHVzZSB5PSIyIiBocmVmPSIjYiIgeDpocmVmPSIjYiIvPgo8L2c+Cjx1c2UgeT0iNCIgaHJlZj0iI2EiIHg6aHJlZj0iI2EiLz4KPC9zdmc+)"


circlesUri : String
circlesUri =
    "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiBpZD0iRmxhdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTgwLDY4YTUyLDUyLDAsMSwwLTUyLDUyQTUyLjA1OSw1Mi4wNTksMCwwLDAsMTgwLDY4Wk0xMjgsOTZhMjgsMjgsMCwxLDEsMjgtMjhBMjguMDMxNDYsMjguMDMxNDYsMCwwLDEsMTI4LDk2Wm02MCwyNGE1Miw1MiwwLDEsMCw1Miw1MkE1Mi4wNTksNTIuMDU5LDAsMCwwLDE4OCwxMjBabTAsODBhMjgsMjgsMCwxLDEsMjgtMjhBMjguMDMxNDYsMjguMDMxNDYsMCwwLDEsMTg4LDIwMFpNNjgsMTIwYTUyLDUyLDAsMSwwLDUyLDUyQTUyLjA1OSw1Mi4wNTksMCwwLDAsNjgsMTIwWm0wLDgwYTI4LDI4LDAsMSwxLDI4LTI4QTI4LjAzMTQ2LDI4LjAzMTQ2LDAsMCwxLDY4LDIwMFoiLz4KPC9zdmc+Cg==)"


clearUri : String
clearUri =
    "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQ0MyA0NDMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0MyA0NDM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxyZWN0IHg9IjYxLjc4NSIgeT0iMTI4IiB3aWR0aD0iNjAiIGhlaWdodD0iMjkwIi8+DQoJPHBhdGggZD0iTTIxMS43ODUsMjUwLjY1VjEyOGgtNjB2MjkwaDQ0LjE3MmMtMTQuODYxLTIxLjA2Ny0yMy42MDItNDYuNzQ2LTIzLjYwMi03NC40Mw0KCQlDMTcyLjM1NiwzMDcuMTQ1LDE4Ny40ODYsMjc0LjE5MywyMTEuNzg1LDI1MC42NXoiLz4NCgk8cGF0aCBkPSJNMzAxLjc4NSwyMTQuMTQxbDAtODYuMTQxaC02MHYxMDAuOTE4QzI1OS43MzEsMjE5LjQ4OCwyODAuMTQ0LDIxNC4xNDEsMzAxLjc4NSwyMTQuMTQxeiIvPg0KCTxwYXRoIGQ9Ik0zMjEuNzg1LDM4aC04My4zODRWMEgxMjUuMTY5djM4SDQxLjc4NXY2MGgyODBWMzh6IE0xNTUuMTY5LDMwaDUzLjIzMnY4aC01My4yMzJWMzB6Ii8+DQoJPHBhdGggZD0iTTMwMS43ODUsMjQ0LjE0MWMtNTQuODI2LDAtOTkuNDI5LDQ0LjYwNC05OS40MjksOTkuNDI5UzI0Ni45NTksNDQzLDMwMS43ODUsNDQzczk5LjQzLTQ0LjYwNCw5OS40My05OS40Mw0KCQlTMzU2LjYxMSwyNDQuMTQxLDMwMS43ODUsMjQ0LjE0MXogTTM1NS45NjEsMzc2LjUzM2wtMjEuMjEzLDIxLjIxM2wtMzIuOTYzLTMyLjk2M2wtMzIuOTYzLDMyLjk2M2wtMjEuMjEzLTIxLjIxM2wzMi45NjMtMzIuOTYzDQoJCWwtMzIuOTYzLTMyLjk2M2wyMS4yMTMtMjEuMjEzbDMyLjk2MywzMi45NjNsMzIuOTYzLTMyLjk2M2wyMS4yMTMsMjEuMjEzbC0zMi45NjMsMzIuOTYzTDM1NS45NjEsMzc2LjUzM3oiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K)"


nextUri : String
nextUri =
    "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDgwLDBjLTExLjc3NiwwLTIxLjMzMyw5LjU1Ny0yMS4zMzMsMjEuMzMzdjIxMC4zMjVMNDIuMjgzLDIuNjQ1Yy02LjYxMy0zLjYyNy0xNC42NTYtMy41Mi0yMS4xNDEsMC4zMg0KCQkJYy02LjQ4NSwzLjg0LTEwLjQ3NSwxMC44MTYtMTAuNDc1LDE4LjM2OHY0NjkuMzMzYzAsNy41NTIsMy45ODksMTQuNTI4LDEwLjQ3NSwxOC4zNjhDMjQuNDkxLDUxMS4wMTksMjguMjQ1LDUxMiwzMiw1MTINCgkJCWMzLjU0MSwwLDcuMDgzLTAuODc1LDEwLjI4My0yLjY0NWw0MTYuMzg0LTIyOS4wMTN2MjEwLjMyNWMwLDExLjc3Niw5LjU1NywyMS4zMzMsMjEuMzMzLDIxLjMzM3MyMS4zMzMtOS41NTcsMjEuMzMzLTIxLjMzMw0KCQkJVjIxLjMzM0M1MDEuMzMzLDkuNTU3LDQ5MS43NzYsMCw0ODAsMHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==)"


{-| Uppercase is white, lowercase is black
-}
pieceUri : Char -> String
pieceUri code =
    case code of
        'b' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIGZpbGw9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNOSAzNmMzLjM5LS45NyAxMC4xMS40MyAxMy41LTIgMy4zOSAyLjQzIDEwLjExIDEuMDMgMTMuNSAyIDAgMCAxLjY1LjU0IDMgMi0uNjguOTctMS42NS45OS0zIC41LTMuMzktLjk3LTEwLjExLjQ2LTEzLjUtMS0zLjM5IDEuNDYtMTAuMTEuMDMtMTMuNSAxLTEuMzU0LjQ5LTIuMzIzLjQ3LTMtLjUgMS4zNTQtMS45NCAzLTIgMy0yeiIvPjxwYXRoIGQ9Ik0xNSAzMmMyLjUgMi41IDEyLjUgMi41IDE1IDAgLjUtMS41IDAtMiAwLTIgMC0yLjUtMi41LTQtMi41LTQgNS41LTEuNSA2LTExLjUtNS0xNS41LTExIDQtMTAuNSAxNC01IDE1LjUgMCAwLTIuNSAxLjUtMi41IDQgMCAwLS41LjUgMCAyeiIvPjxwYXRoIGQ9Ik0yNSA4YTIuNSAyLjUgMCAxIDEtNSAwIDIuNSAyLjUgMCAxIDEgNSAweiIvPjwvZz48cGF0aCBkPSJNMTcuNSAyNmgxME0xNSAzMGgxNW0tNy41LTE0LjV2NU0yMCAxOGg1IiBzdHJva2U9IiNlY2VjZWMiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48L2c+PC9zdmc+')"

        'k' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMi41IDExLjYzVjYiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMjIuNSAyNXM0LjUtNy41IDMtMTAuNWMwIDAtMS0yLjUtMy0yLjVzLTMgMi41LTMgMi41Yy0xLjUgMyAzIDEwLjUgMyAxMC41IiBmaWxsPSIjMDAwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0xMS41IDM3YzUuNSAzLjUgMTUuNSAzLjUgMjEgMHYtN3M5LTQuNSA2LTEwLjVjLTQtNi41LTEzLjUtMy41LTE2IDRWMjd2LTMuNWMtMy41LTcuNS0xMy0xMC41LTE2LTQtMyA2IDUgMTAgNSAxMFYzN3oiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMjAgOGg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTMyIDI5LjVzOC41LTQgNi4wMy05LjY1QzM0LjE1IDE0IDI1IDE4IDIyLjUgMjQuNWwuMDEgMi4xLS4wMS0yLjFDMjAgMTggOS45MDYgMTQgNi45OTcgMTkuODVjLTIuNDk3IDUuNjUgNC44NTMgOSA0Ljg1MyA5IiBzdHJva2U9IiNlY2VjZWMiLz48cGF0aCBkPSJNMTEuNSAzMGM1LjUtMyAxNS41LTMgMjEgMG0tMjEgMy41YzUuNS0zIDE1LjUtMyAyMSAwbS0yMSAzLjVjNS41LTMgMTUuNS0zIDIxIDAiIHN0cm9rZT0iI2VjZWNlYyIvPjwvZz48L3N2Zz4=')"

        'n' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMiAxMGMxMC41IDEgMTYuNSA4IDE2IDI5SDE1YzAtOSAxMC02LjUgOC0yMSIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yNCAxOGMuMzggMi45MS01LjU1IDcuMzctOCA5LTMgMi0yLjgyIDQuMzQtNSA0LTEuMDQyLS45NCAxLjQxLTMuMDQgMC0zLTEgMCAuMTkgMS4yMy0xIDItMSAwLTQuMDAzIDEtNC00IDAtMiA2LTEyIDYtMTJzMS44OS0xLjkgMi0zLjVjLS43My0uOTk0LS41LTItLjUtMyAxLTEgMyAyLjUgMyAyLjVoMnMuNzgtMS45OTIgMi41LTNjMSAwIDEgMyAxIDMiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNOS41IDI1LjVhLjUuNSAwIDEgMS0xIDAgLjUuNSAwIDEgMSAxIDB6bTUuNDMzLTkuNzVhLjUgMS41IDMwIDEgMS0uODY2LS41LjUgMS41IDMwIDEgMSAuODY2LjV6IiBmaWxsPSIjZWNlY2VjIiBzdHJva2U9IiNlY2VjZWMiLz48cGF0aCBkPSJNMjQuNTUgMTAuNGwtLjQ1IDEuNDUuNS4xNWMzLjE1IDEgNS42NSAyLjQ5IDcuOSA2Ljc1UzM1Ljc1IDI5LjA2IDM1LjI1IDM5bC0uMDUuNWgyLjI1bC4wNS0uNWMuNS0xMC4wNi0uODgtMTYuODUtMy4yNS0yMS4zNC0yLjM3LTQuNDktNS43OS02LjY0LTkuMTktNy4xNmwtLjUxLS4xeiIgZmlsbD0iI2VjZWNlYyIgc3Ryb2tlPSJub25lIi8+PC9nPjwvc3ZnPg==')"

        'p' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PHBhdGggZD0iTTIyLjUgOWMtMi4yMSAwLTQgMS43OS00IDQgMCAuODkuMjkgMS43MS43OCAyLjM4QzE3LjMzIDE2LjUgMTYgMTguNTkgMTYgMjFjMCAyLjAzLjk0IDMuODQgMi40MSA1LjAzLTMgMS4wNi03LjQxIDUuNTUtNy40MSAxMy40N2gyM2MwLTcuOTItNC40MS0xMi40MS03LjQxLTEzLjQ3IDEuNDctMS4xOSAyLjQxLTMgMi40MS01LjAzIDAtMi40MS0xLjMzLTQuNS0zLjI4LTUuNjIuNDktLjY3Ljc4LTEuNDkuNzgtMi4zOCAwLTIuMjEtMS43OS00LTQtNHoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==')"

        'q' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIHN0cm9rZT0ibm9uZSI+PGNpcmNsZSBjeD0iNiIgY3k9IjEyIiByPSIyLjc1Ii8+PGNpcmNsZSBjeD0iMTQiIGN5PSI5IiByPSIyLjc1Ii8+PGNpcmNsZSBjeD0iMjIuNSIgY3k9IjgiIHI9IjIuNzUiLz48Y2lyY2xlIGN4PSIzMSIgY3k9IjkiIHI9IjIuNzUiLz48Y2lyY2xlIGN4PSIzOSIgY3k9IjEyIiByPSIyLjc1Ii8+PC9nPjxwYXRoIGQ9Ik05IDI2YzguNS0xLjUgMjEtMS41IDI3IDBsMi41LTEyLjVMMzEgMjVsLS4zLTE0LjEtNS4yIDEzLjYtMy0xNC41LTMgMTQuNS01LjItMTMuNkwxNCAyNSA2LjUgMTMuNSA5IDI2eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNOSAyNmMwIDIgMS41IDIgMi41IDQgMSAxLjUgMSAxIC41IDMuNS0xLjUgMS0xLjUgMi41LTEuNSAyLjUtMS41IDEuNS41IDIuNS41IDIuNSA2LjUgMSAxNi41IDEgMjMgMCAwIDAgMS41LTEgMC0yLjUgMCAwIC41LTEuNS0xLTIuNS0uNS0yLjUtLjUtMiAuNS0zLjUgMS0yIDIuNS0yIDIuNS00LTguNS0xLjUtMTguNS0xLjUtMjcgMHoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTExIDM4LjVhMzUgMzUgMSAwIDAgMjMgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMTEgMjlhMzUgMzUgMSAwIDEgMjMgMG0tMjEuNSAyLjVoMjBtLTIxIDNhMzUgMzUgMSAwIDAgMjIgMG0tMjMgM2EzNSAzNSAxIDAgMCAyNCAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlY2VjZWMiLz48L2c+PC9zdmc+')"

        'r' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik05IDM5aDI3di0zSDl2M3ptMy41LTdsMS41LTIuNWgxN2wxLjUgMi41aC0yMHptLS41IDR2LTRoMjF2NEgxMnoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTE0IDI5LjV2LTEzaDE3djEzSDE0eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMTQgMTYuNUwxMSAxNGgyM2wtMyAyLjVIMTR6TTExIDE0VjloNHYyaDVWOWg1djJoNVY5aDR2NUgxMXoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTEyIDM1LjVoMjFtLTIwLTRoMTltLTE4LTJoMTdtLTE3LTEzaDE3TTExIDE0aDIzIiBmaWxsPSJub25lIiBzdHJva2U9IiNlY2VjZWMiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjwvZz48L3N2Zz4=')"

        'B' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIGZpbGw9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNOSAzNmMzLjM5LS45NyAxMC4xMS40MyAxMy41LTIgMy4zOSAyLjQzIDEwLjExIDEuMDMgMTMuNSAyIDAgMCAxLjY1LjU0IDMgMi0uNjguOTctMS42NS45OS0zIC41LTMuMzktLjk3LTEwLjExLjQ2LTEzLjUtMS0zLjM5IDEuNDYtMTAuMTEuMDMtMTMuNSAxLTEuMzU0LjQ5LTIuMzIzLjQ3LTMtLjUgMS4zNTQtMS45NCAzLTIgMy0yeiIvPjxwYXRoIGQ9Ik0xNSAzMmMyLjUgMi41IDEyLjUgMi41IDE1IDAgLjUtMS41IDAtMiAwLTIgMC0yLjUtMi41LTQtMi41LTQgNS41LTEuNSA2LTExLjUtNS0xNS41LTExIDQtMTAuNSAxNC01IDE1LjUgMCAwLTIuNSAxLjUtMi41IDQgMCAwLS41LjUgMCAyeiIvPjxwYXRoIGQ9Ik0yNSA4YTIuNSAyLjUgMCAxIDEtNSAwIDIuNSAyLjUgMCAxIDEgNSAweiIvPjwvZz48cGF0aCBkPSJNMTcuNSAyNmgxME0xNSAzMGgxNW0tNy41LTE0LjV2NU0yMCAxOGg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PC9nPjwvc3ZnPg==')"

        'K' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMi41IDExLjYzVjZNMjAgOGg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTIyLjUgMjVzNC41LTcuNSAzLTEwLjVjMCAwLTEtMi41LTMtMi41cy0zIDIuNS0zIDIuNWMtMS41IDMgMyAxMC41IDMgMTAuNSIgZmlsbD0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMTEuNSAzN2M1LjUgMy41IDE1LjUgMy41IDIxIDB2LTdzOS00LjUgNi0xMC41Yy00LTYuNS0xMy41LTMuNS0xNiA0VjI3di0zLjVjLTMuNS03LjUtMTMtMTAuNS0xNi00LTMgNiA1IDEwIDUgMTBWMzd6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExLjUgMzBjNS41LTMgMTUuNS0zIDIxIDBtLTIxIDMuNWM1LjUtMyAxNS41LTMgMjEgMG0tMjEgMy41YzUuNS0zIDE1LjUtMyAyMSAwIi8+PC9nPjwvc3ZnPg==')"

        'N' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMiAxMGMxMC41IDEgMTYuNSA4IDE2IDI5SDE1YzAtOSAxMC02LjUgOC0yMSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNCAxOGMuMzggMi45MS01LjU1IDcuMzctOCA5LTMgMi0yLjgyIDQuMzQtNSA0LTEuMDQyLS45NCAxLjQxLTMuMDQgMC0zLTEgMCAuMTkgMS4yMy0xIDItMSAwLTQuMDAzIDEtNC00IDAtMiA2LTEyIDYtMTJzMS44OS0xLjkgMi0zLjVjLS43My0uOTk0LS41LTItLjUtMyAxLTEgMyAyLjUgMyAyLjVoMnMuNzgtMS45OTIgMi41LTNjMSAwIDEgMyAxIDMiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOS41IDI1LjVhLjUuNSAwIDEgMS0xIDAgLjUuNSAwIDEgMSAxIDB6bTUuNDMzLTkuNzVhLjUgMS41IDMwIDEgMS0uODY2LS41LjUgMS41IDMwIDEgMSAuODY2LjV6IiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==')"

        'P' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PHBhdGggZD0iTTIyLjUgOWMtMi4yMSAwLTQgMS43OS00IDQgMCAuODkuMjkgMS43MS43OCAyLjM4QzE3LjMzIDE2LjUgMTYgMTguNTkgMTYgMjFjMCAyLjAzLjk0IDMuODQgMi40MSA1LjAzLTMgMS4wNi03LjQxIDUuNTUtNy40MSAxMy40N2gyM2MwLTcuOTItNC40MS0xMi40MS03LjQxLTEzLjQ3IDEuNDctMS4xOSAyLjQxLTMgMi40MS01LjAzIDAtMi40MS0xLjMzLTQuNS0zLjI4LTUuNjIuNDktLjY3Ljc4LTEuNDkuNzgtMi4zOCAwLTIuMjEtMS43OS00LTQtNHoiIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==')"

        'Q' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04IDEyYTIgMiAwIDEgMS00IDAgMiAyIDAgMSAxIDQgMHptMTYuNS00LjVhMiAyIDAgMSAxLTQgMCAyIDIgMCAxIDEgNCAwek00MSAxMmEyIDIgMCAxIDEtNCAwIDIgMiAwIDEgMSA0IDB6TTE2IDguNWEyIDIgMCAxIDEtNCAwIDIgMiAwIDEgMSA0IDB6TTMzIDlhMiAyIDAgMSAxLTQgMCAyIDIgMCAxIDEgNCAweiIvPjxwYXRoIGQ9Ik05IDI2YzguNS0xLjUgMjEtMS41IDI3IDBsMi0xMi03IDExVjExbC01LjUgMTMuNS0zLTE1LTMgMTUtNS41LTE0VjI1TDcgMTRsMiAxMnoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTkgMjZjMCAyIDEuNSAyIDIuNSA0IDEgMS41IDEgMSAuNSAzLjUtMS41IDEtMS41IDIuNS0xLjUgMi41LTEuNSAxLjUuNSAyLjUuNSAyLjUgNi41IDEgMTYuNSAxIDIzIDAgMCAwIDEuNS0xIDAtMi41IDAgMCAuNS0xLjUtMS0yLjUtLjUtMi41LS41LTIgLjUtMy41IDEtMiAyLjUtMiAyLjUtNC04LjUtMS41LTE4LjUtMS41LTI3IDB6IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0xMS41IDMwYzMuNS0xIDE4LjUtMSAyMiAwTTEyIDMzLjVjNi0xIDE1LTEgMjEgMCIgZmlsbD0ibm9uZSIvPjwvZz48L3N2Zz4=')"

        'R' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik05IDM5aDI3di0zSDl2M3ptMy0zdi00aDIxdjRIMTJ6bS0xLTIyVjloNHYyaDVWOWg1djJoNVY5aDR2NSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMzQgMTRsLTMgM0gxNGwtMy0zIi8+PHBhdGggZD0iTTMxIDE3djEyLjVIMTRWMTciIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTMxIDI5LjVsMS41IDIuNWgtMjBsMS41LTIuNSIvPjxwYXRoIGQ9Ik0xMSAxNGgyMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjwvZz48L3N2Zz4=')"

        _ ->
            ""


prevUri : String
prevUri =
    "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iTGF5ZXJfMSIKICAgeD0iMHB4IgogICB5PSIwcHgiCiAgIHZpZXdCb3g9IjAgMCA1MTIgNTEyIgogICBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIKICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIKICAgc29kaXBvZGk6ZG9jbmFtZT0icHJldl8xLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcwogICBpZD0iZGVmczQxIiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgaWQ9Im5hbWVkdmlldzM5IgogICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgIHNob3dncmlkPSJmYWxzZSIKICAgaW5rc2NhcGU6em9vbT0iMS43MDUwNzgxIgogICBpbmtzY2FwZTpjeD0iMjU1LjcwNjc2IgogICBpbmtzY2FwZTpjeT0iMjU1LjcwNjc2IgogICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjM4NDAiCiAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjIwODAiCiAgIGlua3NjYXBlOndpbmRvdy14PSIyOTg5IgogICBpbmtzY2FwZTp3aW5kb3cteT0iLTExIgogICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJMYXllcl8xIiAvPgo8ZwogICBpZD0iZzYiCiAgIHRyYW5zZm9ybT0ibWF0cml4KC0xLDAsMCwxLDUxMiwwKSI+Cgk8ZwogICBpZD0iZzQiPgoJCTxwYXRoCiAgIGQ9Ik0gNDgwLDAgQyA0NjguMjI0LDAgNDU4LjY2Nyw5LjU1NyA0NTguNjY3LDIxLjMzMyBWIDIzMS42NTggTCA0Mi4yODMsMi42NDUgQyAzNS42NywtMC45ODIgMjcuNjI3LC0wLjg3NSAyMS4xNDIsMi45NjUgMTQuNjU3LDYuODA1IDEwLjY2NywxMy43ODEgMTAuNjY3LDIxLjMzMyB2IDQ2OS4zMzMgYyAwLDcuNTUyIDMuOTg5LDE0LjUyOCAxMC40NzUsMTguMzY4IDMuMzQ5LDEuOTg1IDcuMTAzLDIuOTY2IDEwLjg1OCwyLjk2NiAzLjU0MSwwIDcuMDgzLC0wLjg3NSAxMC4yODMsLTIuNjQ1IEwgNDU4LjY2NywyODAuMzQyIHYgMjEwLjMyNSBjIDAsMTEuNzc2IDkuNTU3LDIxLjMzMyAyMS4zMzMsMjEuMzMzIDExLjc3NiwwIDIxLjMzMywtOS41NTcgMjEuMzMzLC0yMS4zMzMgViAyMS4zMzMgQyA1MDEuMzMzLDkuNTU3IDQ5MS43NzYsMCA0ODAsMCBaIgogICBpZD0icGF0aDIiIC8+Cgk8L2c+CjwvZz4KPGcKICAgaWQ9Imc4IgogICB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsMSw1MTIsMCkiPgo8L2c+CjxnCiAgIGlkPSJnMTAiCiAgIHRyYW5zZm9ybT0ibWF0cml4KC0xLDAsMCwxLDUxMiwwKSI+CjwvZz4KPGcKICAgaWQ9ImcxMiIKICAgdHJhbnNmb3JtPSJtYXRyaXgoLTEsMCwwLDEsNTEyLDApIj4KPC9nPgo8ZwogICBpZD0iZzE0IgogICB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsMSw1MTIsMCkiPgo8L2c+CjxnCiAgIGlkPSJnMTYiCiAgIHRyYW5zZm9ybT0ibWF0cml4KC0xLDAsMCwxLDUxMiwwKSI+CjwvZz4KPGcKICAgaWQ9ImcxOCIKICAgdHJhbnNmb3JtPSJtYXRyaXgoLTEsMCwwLDEsNTEyLDApIj4KPC9nPgo8ZwogICBpZD0iZzIwIgogICB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsMSw1MTIsMCkiPgo8L2c+CjxnCiAgIGlkPSJnMjIiCiAgIHRyYW5zZm9ybT0ibWF0cml4KC0xLDAsMCwxLDUxMiwwKSI+CjwvZz4KPGcKICAgaWQ9ImcyNCIKICAgdHJhbnNmb3JtPSJtYXRyaXgoLTEsMCwwLDEsNTEyLDApIj4KPC9nPgo8ZwogICBpZD0iZzI2IgogICB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsMSw1MTIsMCkiPgo8L2c+CjxnCiAgIGlkPSJnMjgiCiAgIHRyYW5zZm9ybT0ibWF0cml4KC0xLDAsMCwxLDUxMiwwKSI+CjwvZz4KPGcKICAgaWQ9ImczMCIKICAgdHJhbnNmb3JtPSJtYXRyaXgoLTEsMCwwLDEsNTEyLDApIj4KPC9nPgo8ZwogICBpZD0iZzMyIgogICB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsMSw1MTIsMCkiPgo8L2c+CjxnCiAgIGlkPSJnMzQiCiAgIHRyYW5zZm9ybT0ibWF0cml4KC0xLDAsMCwxLDUxMiwwKSI+CjwvZz4KPGcKICAgaWQ9ImczNiIKICAgdHJhbnNmb3JtPSJtYXRyaXgoLTEsMCwwLDEsNTEyLDApIj4KPC9nPgo8L3N2Zz4K)"


redoUri : String
redoUri =
    "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDhweCIgaGVpZ2h0PSI0OHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPgo8cGF0aCBkPSJNMzYuNzI3OSAzNi43Mjc5QzMzLjQ3MDYgMzkuOTg1MyAyOC45NzA2IDQyIDI0IDQyQzE0LjA1ODkgNDIgNiAzMy45NDExIDYgMjRDNiAxNC4wNTg5IDE0LjA1ODkgNiAyNCA2QzI4Ljk3MDYgNiAzMy40NzA2IDguMDE0NzIgMzYuNzI3OSAxMS4yNzIxQzM4LjM4NTkgMTIuOTMwMSA0MiAxNyA0MiAxNyIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTQyIDhWMTdIMzMiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=)"


undoUri : String
undoUri =
    "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjQ4cHgiCiAgIGhlaWdodD0iNDhweCIKICAgdmlld0JveD0iMCAwIDQ4IDQ4IgogICBmaWxsPSJub25lIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmc4IgogICBzb2RpcG9kaTpkb2NuYW1lPSJ1bmRvLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMTIiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXcxMCIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIwIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIxOC4xODc1IgogICAgIGlua3NjYXBlOmN4PSIyMy45NzI1MDkiCiAgICAgaW5rc2NhcGU6Y3k9IjIzLjk3MjUwOSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjM4NDAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMjA4MCIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMjk4OSIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTExIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnOCIgLz4KICA8cmVjdAogICAgIHdpZHRoPSI0OCIKICAgICBoZWlnaHQ9IjQ4IgogICAgIGZpbGw9IiNmZmZmZmYiCiAgICAgZmlsbC1vcGFjaXR5PSIwLjAxIgogICAgIGlkPSJyZWN0MiIKICAgICB4PSIwIgogICAgIHk9IjAiIC8+CiAgPHBhdGgKICAgICBkPSJNIDExLjI3MjEsMzYuNzI3OSBDIDE0LjUyOTQsMzkuOTg1MyAxOS4wMjk0LDQyIDI0LDQyIDMzLjk0MTEsNDIgNDIsMzMuOTQxMSA0MiwyNCA0MiwxNC4wNTg5IDMzLjk0MTEsNiAyNCw2IDE5LjAyOTQsNiAxNC41Mjk0LDguMDE0NzIgMTEuMjcyMSwxMS4yNzIxIDkuNjE0MSwxMi45MzAxIDYsMTcgNiwxNyIKICAgICBzdHJva2U9IiMwMDAwMDAiCiAgICAgc3Ryb2tlLXdpZHRoPSI0IgogICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAgICBzdHJva2UtbGluZWpvaW49InJvdW5kIgogICAgIGlkPSJwYXRoNCIgLz4KICA8cGF0aAogICAgIGQ9Im0gNiw4IHYgOSBoIDkiCiAgICAgc3Ryb2tlPSIjMDAwMDAwIgogICAgIHN0cm9rZS13aWR0aD0iNCIKICAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgICAgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIKICAgICBpZD0icGF0aDYiIC8+Cjwvc3ZnPgo=)"