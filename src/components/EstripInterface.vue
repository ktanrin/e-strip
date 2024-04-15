<template>
    <div class="container is-fluid">
        <div class = "columns is-gapless">
            <div class="column is-2 leftzone"></div>
            <div class="column is-8 dropzone"></div>
            <div class="column is-2 rightzone"></div>
        </div>
    </div>
</template>

<style>
.container.is-fluid {
  padding: 0 !important;
}
html, body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
}

.is-fluid, .columns, .column {
  height: 100%;
}

.dropzone {
  border: 2px dashed #ccc;
  background-color: lightgray;
  /* Removed padding and text-align to allow full height */
  font-size: 20px;
}

.leftzone, .rightzone {
  background-color: darkgray; /* Use a different color if needed */
  /* Adjust padding to your requirements */
}
</style>

<script>
export default {
    name: 'EstripInterface',
    mounted() {
    
    }
}
</script>