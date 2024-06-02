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
              <div class="drag-container full-height">
                <Draggable v-model="strips" 
                           itemKey="id" 
                           class="drag-area full-height" 
                           @start="onDragStart"
                           @end="onDragEnd"
                          >
                          <template #item="{ element }">
                            <Estrip :key="element.id" :data="element" :style="{ left: `${element.x}px`, top: `${element.y}px` }" class="draggable-strip" />
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
              { id: 1, content: 'First strip', x: 0, y: 0 },  // Add position properties
              { id: 2, content: 'Second strip', x: 0, y: 0 },
              { id: 3, content: 'Third strip', x: 0, y: 0 },
            ],
            initialX: 0,
            initialY: 0,
            offsetX: 0,
            offsetY: 0
        };
    },
    methods: {
    onEnd(event) {
        console.log('Drag operation finished', event);
        // Additional logic to handle after drag ends
    },
    onDragStart(evt) {
      const draggedElement = evt.item;
      this.initialX = evt.originalEvent.clientX;
      this.initialY = evt.originalEvent.clientY;
      this.offsetX = draggedElement.offsetLeft;
      this.offsetY = draggedElement.offsetTop;
    },
    onDragEnd(evt) {
      const draggedElement = evt.item;
      const draggedId = parseInt(draggedElement.getAttribute('data-id'));
      const draggedItem = this.strips.find(item => item.id === draggedId);
      if (draggedItem) {
        const newX = this.offsetX + (evt.originalEvent.clientX - this.initialX);
        const newY = this.offsetY + (evt.originalEvent.clientY - this.initialY);
        draggedItem.x = newX;
        draggedItem.y = newY;
      } else {
        console.error('Dragged item not found');
      }
      console.log('Finished dragging', evt);
      console.log('New strips order:', this.strips);
    
    }
   
  }
}
</script>

<style>
.drag-container {
  height: 100%;
  width: 100%;
  position: relative;
}
.draggable-strip {
  position: absolute;
  cursor: move;
}
.drag-area {
  border: 1px solid #ccc;
  min-height: 100px;
  min-width: 100%;  
  position: relative;

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

