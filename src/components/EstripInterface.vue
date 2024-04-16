<template>
    <div class="container is-fluid">
        <div class = "columns is-gapless">
            <div class="column is-2 leftzone"></div>
            <div class="column is-8 dropzone"></div>
            <div class="column is-2 rightzone"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EstripInterface',
    mounted() {
    
    }
}
</script>

<style>
.container.is-fluid {
  padding: 0 !important;
}
html, body {
  height: 100% !important;
  margin: 0;
}

#app {
  height: 100% !important;
}

.is-fluid, .columns, .column {
  height: 100%  !important;
}

.dropzone {
  border: 2px dashed #ccc;
  background-color: lightgray;
  /* Removed padding and text-align to allow full height */
  font-size: 20px;
}

.leftzone, .rightzone {
  background-color: darkgray; /* Use a different color if needed */
  height: 100%;
  /* Adjust padding to your requirements */
}
</style>

