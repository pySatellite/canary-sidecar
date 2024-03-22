<script setup>
import { ref, watch, defineProps, onMounted } from 'vue'

import { generateColumns, callData, patchData } from '../common/global.js'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from 'primevue/dropdown';
import { useToast } from 'primevue/usetoast';


const props = defineProps(['urmInfo']);

const data = ref()
const tableData = ref()
const columnsInfo = ref()

onMounted(() => {
  callData(data, props.urmInfo)
  tableData.value = data.value
})


watch(() => data.value, (newVal) => {
  tableData.value = newVal
  columnsInfo.value = generateColumns(newVal)
})

const visiblePopup = ref(false);

const selectedId = ref();
const selectedWorker = ref();
const selectedContact = ref();
const selectedEta = ref();
const selectedState = ref();
const state = ref([
  { name: '발생', code: '발생' },
  { name: '확인', code: '확인' },
  { name: '진행', code: '진행' },
  { name: '완료', code: '완료' },
]);

async function update(event) {
  const jsonBody = {
    ...(selectedState.value && { state: selectedState.value }),
    ...(selectedWorker.value && { worker: selectedWorker.value }),
    ...(selectedContact.value && { worker: selectedContact.value }),
    ...(selectedEta.value && { eta: selectedEta.value }),
  };

  await patchData(props.urmInfo, selectedId.value, jsonBody)

  await callData(data, props.urmInfo)

  visiblePopup.value = false;
}

const onRowSelect = (event) => {
  selectedId.value = event.data.id;
  selectedWorker.value = event.data.worker;
  selectedContact.value = event.data.contact;
  selectedEta.value = event.data.eta;
  selectedState.value = event.data.state;

  visiblePopup.value = true;
};
</script>

<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>

      <DataTable :value="tableData" tableStyle="min-width: 22rem"
        data-key="id" selectionMode="single" @rowSelect="onRowSelect"
      >
        <Column v-for="col of columnsInfo" :key="col.field" :field="col.field" :header="col.header">
        </Column>
      </DataTable>

      <template>
        <div class="card flex justify-content-center">
          <Dialog
              v-model:visible="visiblePopup"
              modal
              :pt="{
                root: 'border-none',
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }"
          >
            <template #container="{ closeCallback }">
              <div class="flex flex-column px-5 py-5 gap-4" style="border-radius: 12px; background-image: radial-gradient(circle at left top, var(--primary-400), var(--primary-700))">
                <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="block mx-auto">
                  <path
                      d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                      fill="var(--primary-700)"
                  />
                  <path
                      d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                      fill="var(--primary-200)"
                  />
                </svg>

                <div class="inline-flex flex-column gap-2">
                  <label for="job_id" class="text-primary-50 font-semibold">ID</label>
                  <InputText id="job_id" v-model="selectedId" class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem"></InputText>
                </div>
                <div class="inline-flex flex-column gap-2">
                  <label for="job_state" class="text-primary-50 font-semibold">STATUS</label>
                  <Dropdown id="job_state" v-model="selectedState" :options="state"
                            option-label="name"
                            option-value="code"
                            placeholder="select a state"
                            class="bg-white-alpha-20 border-none p-2 text-primary-50  p-2 text-primary-50 w-20rem" />
                </div>
                <div class="inline-flex flex-column gap-2" v-if="columnsInfo.find(item => item.field === 'worker')">
                  <label for="job_worker" class="text-primary-50 font-semibold">WORKER</label>
                  <InputText id="job_worker" v-model="selectedWorker" class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem" placeholder="Disaster Recovery Agent"></InputText>
                </div>
                <div class="inline-flex flex-column gap-2" v-if="columnsInfo.find(item => item.field === 'contact')">
                  <label for="job_contact" class="text-primary-50 font-semibold">CONTACT</label>
                  <InputText id="job_contact" v-model="selectedContact" class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem" placeholder="Disaster Recovery Agent"></InputText>
                </div>
                <div class="inline-flex flex-column gap-2" v-if="columnsInfo.find(item => item.field === 'eta')">
                  <label for="job_eta" class="text-primary-50 font-semibold">ETA</label>
                  <InputText id="job_eta" v-model="selectedEta" class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem" placeholder="Estimated Time of Arrival"></InputText>
                </div>

                <div class="flex align-items-center gap-3">
                  <Button label="Cancel" @click="closeCallback" text class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                  <Button label="Update" @click="update" text class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                </div>
              </div>
            </template>
          </Dialog>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>

.p-datatable {
  font-size: 0.5rem;
}

p-editable-column .p-cell-editing  {
  font-size: 0.1rem;
}

.p-editable-column {
  font-size: 0.1rem;
}

.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

Button {
  font-size: 0.7rem;
  font-weight: 500;
  margin-bottom: -0.35rem;
}


@media (min-width: 1024px) {
  .p-datatable {
    font-size: 0.777rem;
    width: 100%;
  }

  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }

}
</style>
