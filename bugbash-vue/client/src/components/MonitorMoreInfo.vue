<template>
  <div>
    <p>More info example: </p>
    <p>{{ new Date(error.timeStamp * 1000) }}</p>
  </div>
</template>
<script>
export default {
    name: 'MonitorMoreInfo',
    props: {
        error: Object,
    }
};
</script>
<style scoped></style>
