import axios from 'axios';

function generateColumns(data) {
  if (!data || data.length === 0) {
    return [];
  }

  const keys = Object.keys(data[0]);
  const columns = keys.map((key) => ({ field: key, header: key }));

  return columns;
}

//https://ko.vitejs.dev/guide/env-and-mode.html
const API_URL = import.meta.env.VITE_API_URL;
const SIDECAR_URL = import.meta.env.VITE_SIDECAR_URL;

async function callData(dataPocket, urn) {

  dataPocket.value = null;
  const res = await fetch(`${API_URL}/${urn}`);
  dataPocket.value = await res.json();
}


async function patchData(urn, jobID, jsonBody) {
  await fetch(`${API_URL}/${urn}/${jobID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonBody)
  });
}


async function updateDashboard() {

  const res = await fetch(`${SIDECAR_URL}/update_dashboard`);
  const resJson = await res.json();
  console.log(resJson)
}

export { generateColumns, callData, patchData, updateDashboard, API_URL };
