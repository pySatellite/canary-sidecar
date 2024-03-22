# build stage
FROM python:3.12.2-alpine3.19 AS builder
WORKDIR /build

# install PDM
RUN pip install -U pip setuptools wheel
RUN pip install pdm

# copy files
COPY pyproject.toml .
COPY  pdm.lock .

# install dependencies and project into the local packages directory
RUN mkdir __pypackages__ && pdm sync --prod --no-editable


# run stage
FROM python:3.12.2-alpine3.19
WORKDIR /app

# retrieve packages from build stage
COPY --from=builder /build/__pypackages__/3.12/lib ./pkgs

# retrieve executables
COPY --from=builder /build/__pypackages__/3.12/bin/* /bin/

ENV PYTHONPATH=/app/pkgs
COPY src ./src

#ARG RELOAD="--reload"
ENV RELOAD=""

EXPOSE 80
CMD uvicorn --app-dir src/canary_sidecar main:app  --host 0.0.0.0 --port 80 $RELOAD