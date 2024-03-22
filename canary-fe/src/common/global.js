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
async function callData(dataPocket, urn) {

  dataPocket.value = null;
  const res = await fetch(`${API_URL}/${urn}`);
  dataPocket.value = await res.json();
}

async function patchData(urn, jobID, jsonBody) {
  console.log("==============")
  console.log("jsonBody", jsonBody)

  await fetch(`${API_URL}/${urn}/${jobID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    // jsonBody: '{"views": 1}'
    body: JSON.stringify(jsonBody)
  });
}

export { generateColumns, callData, patchData };
