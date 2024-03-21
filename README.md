# canary-sidecar
- Sample Code for Python PDM fastAPI Configuration

### init
```bash
$ pyenv --version
pyenv 2.3.36

$ pdm -V
PDM, version 2.12.4

$ python -V
Python 3.12.2

$ pdm init
```

### setup fastapi
```bash
$ pdm add fastapi
Adding packages to default dependencies: fastapi
🔒 Lock successful
Changes are written to pyproject.toml.
Synchronizing working set with resolved packages: 9 to add, 0 to update, 0 to remove

  ✔ Install annotated-types 0.6.0 successful
  ✔ Install sniffio 1.3.1 successful
  ✔ Install idna 3.6 successful
  ✔ Install anyio 4.3.0 successful
  ✔ Install typing-extensions 4.10.0 successful
  ✔ Install starlette 0.36.3 successful
  ✔ Install fastapi 0.110.0 successful
  ✔ Install pydantic 2.6.4 successful
  ✔ Install pydantic-core 2.16.3 successful

🎉 All complete!

 $ pdm add "uvicorn[standard]"
Adding packages to default dependencies: uvicorn
🔒 Lock successful
Changes are written to pyproject.toml.
Synchronizing working set with resolved packages: 9 to add, 0 to update, 0 to remove

  ✔ Install h11 0.14.0 successful
  ✔ Install click 8.1.7 successful
  ✔ Install python-dotenv 1.0.1 successful
  ✔ Install uvicorn 0.29.0 successful
  ✔ Install httptools 0.6.1 successful
  ✔ Install pyyaml 6.0.1 successful
  ✔ Install watchfiles 0.21.0 successful
  ✔ Install websockets 12.0 successful
  ✔ Install uvloop 0.19.0 successful

🎉 All complete!

pdm add -dG test pytest pytest-cov 
INFO: Adding group test to lockfile
Adding packages to test dev-dependencies: pytest, pytest-cov
🔒 Lock successful
Changes are written to pyproject.toml.
Synchronizing working set with resolved packages: 6 to add, 0 to update, 0 to remove

  ✔ Install iniconfig 2.0.0 successful
  ✔ Install pytest-cov 4.1.0 successful
  ✔ Install pluggy 1.4.0 successful
  ✔ Install packaging 24.0 successful
  ✔ Install pytest 8.1.1 successful
  ✔ Install coverage 7.4.4 successful

🎉 All complete!


```

### run FastAPI
```bash
$ uvicorn src.canary_sidecar.main:app
$ uvicorn --app-dir src/canary_sidecar main:app
```

### test
```bash
$ pytest
===== test session starts ======
platform darwin -- Python 3.12.2, pytest-8.1.1, pluggy-1.4.0
rootdir: /Users/m2/code/nintelli/canary/canary-sidecar
configfile: pyproject.toml
plugins: anyio-4.3.0, cov-4.1.0
collected 0 items                                                                                                              

===== no tests ran in 0.00s =====
```

### dockerizing
```bash
# BUILD
$ docker build -t sidecar:0.2.5 .

$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
sidecar      0.2.5     6946f969d75d   5 seconds ago   88.8MB

# RUN
$ docker run -d --name sidecar-5 -p 8888:80 sidecar:0.2.5

# RUN RELOAD
$ docker run -d --name sidecar-8 -p 8088:80 -v $(pwd)/src:/app/src --env RELOAD="--reload" sidecar:0.2.5
```

## Integrated Testing
```bash
$ docker compose -f docker-compose.yml up -d --force-recreate --build

$ docker compose -f docker-compose.yml ps
NAME                IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
sidecar-api-1       sidecar-api         "docker-entrypoint.s…"   api                 14 seconds ago      Up 12 seconds       80/tcp
sidecar-app-1       sidecar-app         "/bin/sh -c 'uvicorn…"   app                 13 seconds ago      Up 12 seconds       80/tcp
sidecar-proxy-1     nginx               "/docker-entrypoint.…"   proxy               13 seconds ago      Up 12 seconds       0.0.0.0:7942->80/tcp
```
```bash
$ docker compose -f docker-compose.yml down
```

## API
- http://localhost:7982/sidecar/docs
- http://localhost:7982/api/

### ref
- https://github.com/pdm-project/pdm
- https://www.python.org/doc/versions/
- https://devguide.python.org/versions/
- https://github.com/dMario24/president-speech
- https://pdm-project.org/latest/usage/advanced/#use-pdm-in-a-multi-stage-dockerfile