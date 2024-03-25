<script setup>
import { ref, onMounted, watch } from 'vue'

import { generateColumns, callData } from '../common/global.js'

import MsgBoard from './MsgBoard.vue'
import CallTable from './TableCallData.vue'

import EcosystemIcon from '@/components/icons/IconEcosystem.vue'
import IconHourglass from "@/components/icons/IconHourglass.vue";
import IconDatabase from "@/components/icons/IconDatabase.vue";
import IconRedo from "@/components/icons/IconRedo.vue";

const data = ref()

const tableData = ref()
const columnsInfo = ref()
watch(() => data.value, (newVal) => {
  tableData.value = newVal
  columnsInfo.value = generateColumns(newVal)
})
</script>

<template>
  <CallTable urmInfo="delays">
    <template #icon>
      <IconHourglass />
    </template>
    <template #heading>DELAYS</template>
    입수 지연 장애 상대, 담당자, 예상시간(ETA)
  </CallTable>

  <CallTable urmInfo="sources">
    <template #icon>
      <IconDatabase />
    </template>
    <template #heading>SOURCE PROBLEMS</template>
    원천 데이터 이상 및 담당자 및 작업 상태
  </CallTable>

  <CallTable urmInfo="pipelines">
    <template #icon>
      <IconHourglass />
    </template>
    <template #heading>PIPELINE INTERRUPTIONS</template>
    데이터 파이프라인 작동 오류 및 중단 목록
  </CallTable>

  <CallTable urmInfo="recoveries">
    <template #icon>
      <IconRedo />
    </template>
    <template #heading>RECOVERIES</template>
    장애 처리 진행 상태
  </CallTable>

  <MsgBoard>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>ECOSYSTEM</template>
    장애 보고 및 처리 ,
    장애 상태 업데이트 연동

    장애 보고와 처리에 관련된 <a href="" target="_blank" rel="noopener">issues</a> 및
    장애 상태 업데이트를 연동할 수 있는 <a href="" target="_blank" rel="noopener">API</a> 를 제공합니다.
    이 API는 장애가 발생하거나 처리되는 과정을 추적하고, 관련 이슈를 생성하고 업데이트하는 데 사용될 수 있습니다.
    또한 장애 상태 업데이트 API를 통해 장애 처리 상태를 실시간으로 추적하고 해당 정보를 연관된 시스템에 동기화할 수 있습니다.
  </MsgBoard>

</template>
