
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import json
from typing import Union

from .settings import settings as env

app = FastAPI()

# https://fastapi.tiangolo.com/tutorial/cors/
origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def read_root():
    return {"HI": "Sidecar"}


@app.get("/env")
def read_root():
    return {
        "environment": env.environment,
        "api_url": env.api_url
    }


@app.get("/update_dashboard")
def update_dashboard():
    import requests
    headers = {
        'Content-Type': 'application/json',
    }
    dashboard_api = f'{env.api_url}/dashboard/1'
    dashboard_data = requests.get(dashboard_api, headers=headers).json()

    for label_index, label in enumerate(dashboard_data['labels']):
        print(f'label.lower():{label.lower()}')
        data = requests.get(f'{env.api_url}/{label.lower()}', headers=headers).json()

        from collections import Counter
        state_counts = Counter({"발생": 0, "확인": 0, "진행": 0, "완료": 0})
        for item in data:
            state_counts[item['state']] += 1

        for label_name, value in state_counts.items():
            for dataset in dashboard_data["datasets"]:
                if dataset["label"] == label_name:
                    dataset["data"][label_index] = value

    requests.get(dashboard_api, headers=headers).json()
    res_put = requests.put(url=dashboard_api, headers=headers, json=dashboard_data)

    return {
        "dashboard": dashboard_data
    }


@app.get("/group_by/{name}")
def group_by(name: str, q: Union[str, None] = None):
    import requests
    headers = {
        'Content-Type': 'application/json',
    }
    url = f'{env.api_url}/{name}'
    response = requests.get(url, headers=headers)
    json_data = response.json()

    from collections import Counter
    state_counts = Counter({"발생": 0, "확인": 0, "진행": 0, "완료": 0})
    for item in json_data:
        state_counts[item['state']] += 1

    url = f'{env.api_url}/dashboard/1'
    dashboard = requests.get(url, headers=headers).json()

    second_data = json.loads(json.dumps(dashboard))

    # 첫 번째 JSON 데이터의 값을 두 번째 JSON 데이터에 적용
    labels_index = second_data['labels'].index(name.upper())
    for label, value in state_counts.items():
        for dataset in second_data["datasets"]:
            if dataset["label"] == label:
                dataset["data"][labels_index] = value

    return {
        "state_counts": state_counts,
        "dashboard": dashboard,
        "second_data": second_data

    }
