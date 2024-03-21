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

```

### run FastAPI
```bash
$ uvicorn src.canary_sidecar.main:app
$ uvicorn --app-dir src/canary_sidecar main:app
```

### ref
- https://github.com/pdm-project/pdm
- https://www.python.org/doc/versions/
- https://devguide.python.org/versions/