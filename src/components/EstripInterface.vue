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
                           group="strips"
                           @start="onDragStart"
                           @end="onDragEnd"
                           :move="onMove"
                           :animation="0"
                           :ghost-class="'hidden-ghost'"
                           
                          >
                          <template #item="{ element }">
                            <Estrip 
                            :key="element.id" 
                            :data="element" 
                            :style="{ left: `${element.x}px`, top: `${element.y}px`, opacity: isDragging ? 1 : 1 }" 
                            class="draggable-strip"
                            :data-id="element.id"
                          />
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
              { id: 2, content: 'Second strip', x: 0, y: 0},
              { id: 3, content: 'Third strip', x: 0, y: 0 },
              { id: 4, content: 'Fourth strip', x: 0, y: 0 },
            ],
            initialX: 0,
            initialY: 0,
            offsetX: 0,
            offsetY: 0,
            isDrawing: false,
            isDragging: false,
            stripWidth: 300, // Assuming the width of the strip
            stripHeight: 80, // Assuming the height of the strip
            dragAreaWidth: 0,
            dragAreaHeight: 0
        };
    },
    mounted() {
        const dragArea = this.$el.querySelector('.drag-area');
        this.dragAreaWidth = dragArea.clientWidth;
        this.dragAreaHeight = dragArea.clientHeight;
    },
    methods: {
    onEnd(event) {
        console.log('Drag operation finished', event);
        // Additional logic to handle after drag ends
    },
    onDragStart(evt) {
      const draggedElement = evt.item;
      const rect = draggedElement.getBoundingClientRect();
      this.initialX = evt.originalEvent.clientX;
      this.initialY = evt.originalEvent.clientY;
      this.offsetX = rect.left - this.initialX;
      this.offsetY = rect.top - this.initialY;
      this.isDragging = true;
    },
    onDragEnd(evt) {
      const draggedElement = evt.item;
      const draggedId = parseInt(draggedElement.getAttribute('data-id'));
      const draggedItem = this.findDraggedItem(draggedId);
      if (draggedItem) {
        let newX = draggedItem.x + (evt.originalEvent.clientX - this.initialX);
        let newY = draggedItem.y + (evt.originalEvent.clientY - this.initialY);
        newX = Math.max(0, Math.min(newX, this.dragAreaWidth - this.stripWidth));
        newY = Math.max(0, Math.min(newY, this.dragAreaHeight - this.stripHeight));
        draggedItem.x = newX;
        draggedItem.y = newY;
        
      } else {
        console.error('Dragged item not found');
      }
      this.isDragging = false;
      console.log('Finished dragging', evt);
      console.log('New strips order:', this.strips);
    
    },
    findDraggedItem(draggedId) {
      return this.strips.find(item => item.id === draggedId);
    },
    cockStrips(draggedItem) {
      // Move the dragged item to the right by 30px
      draggedItem.x += 30;
      draggedItem.x = Math.min(draggedItem.x, this.dragAreaWidth - this.stripWidth);
    },
    
    
    
   
  }
}
</script>

<style>
.hidden-ghost {
    display: none !important;
}
.drag-container {
  height: 100%;
  width: 40%;
  position: relative;
}
.draggable-strip {
  position: absolute;
  cursor: move;
}
.drag-area {
  border: 2px solid white;
  min-height: 100px;
  min-width: 100%;  
  width: 30px;
  position: absolute;
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

