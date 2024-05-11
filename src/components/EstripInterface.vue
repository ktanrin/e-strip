<template>
    <div class="container is-fluid">
        <div class = "columns is-gapless">
            <div class="column is-2 leftzone">
              <Draggable class="full-height" v-model="leftStrips" group="strips" @end="onEnd">
                    <template #item="{ element }">
                        <Estrip :data="element" />
                    </template>
                </Draggable>
            </div>
            
            
            <div class="column is-8 dropzone">
              <div class="drag-container">
                <Draggable v-model="strips" itemKey="id" :options="{ direction: 'horizontal' }" class="drag-area" @end="onDragEnd">
                  <template  #item="{ element }">
                    <Estrip  :key="element.id" :data="element"/>
                  </template>
                </Draggable>
              </div>
            </div>
           
            <div class="column is-2 rightzone">
              <Draggable class="full-height" v-model="rightStrips" group="strips" @end="onEnd">
                    <template #item="{ element }">
                        <Estrip :data="element" />
                    </template>
                </Draggable>
            </div>
        </div>
    </div>
</template>

<script>
import Draggable from 'vuedraggable'; // for Vue 3
import Estrip from './Estrip.vue';

export default {
    name: 'EstripInterface',
    components: {
    Draggable,
    Estrip
    },
    
    data() {
        return {
            leftStrips: [],
            centerStrips: [],
            rightStrips: [],
            strips: [
              { id: 1, content: 'First strip' },  // Example data, adapt based on your actual data structure
              { id: 2, content: 'Second strip' },
              { id: 3, content: 'Third strip' },
            
            ]
        };
    },
    methods: {
    onEnd(event) {
        console.log('Drag operation finished', event);
        // Additional logic to handle after drag ends
    },
    onDragEnd(event) {
    console.log('Finished dragging', event);
    console.log('New strips order:', this.strips);
  }
  }
}
</script>

<style>
.drag-container {
  padding: 20px;
}

.drag-area {
  border: 1px solid #ccc;
  min-height: 100px;
  min-width: 100%;  
  
}

.estrip-item {
  margin: 10px;
  padding: 5px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
}
.full-height {
  height: 100%;
}
.draggable-list {
  min-height: 100px;
  background-color: lightgray;
}

.strip-wrapper {
  padding: 10px;
  border: 1px solid blue; 
}

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

