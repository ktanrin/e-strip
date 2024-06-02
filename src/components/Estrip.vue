<template>
    <div class="strip">
        <!-- Add your strip content here -->
        <canvas ref="canvas"
        class="strip-canvas"
        width="575"
        height="80"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"></canvas>
        <div class="columns is-gapless">
            <div class="column is-1 first">
                <div class="container is-fluid first-content">
                <p class="state">PSH</p>
                <p class="RFL">F350</p>
                </div>
            </div>
            <div class="column second">
                <div class="container is-fluid second-content">
                    <p class="Type">A320</p>
                    <p class="aircraftCallsign">AIQ536</p>     
                    <div class="container is-fluid lastrow">
                        <p class="SSR">6113</p>
                        <p class="TOBT">1730</p>
                        <p class="destinationAirportICAOCode">ZGGG</p>
                    </div>  
                </div>
            </div>
            <div class="column is-7 third">
                <div class="columns is-gapless">
                    <div class="column">
                        <div class="container is-fluid thirdone-content">
                            <div class="container is-fluid firstrow">                               
                                <p class="stand">26</p>
                                <p class="runwayInUse">21L</p>
                                <p class="SID">NOBER3C</p>
                            </div>
                            <div class="container is-fluid secondrow">
                                <p class="flightRule">IFR</p>
                                <p class="taxiRoute">H C D</p>
                            </div>
                            <div class="container is-fluid thirdrow">
                                <input type="button" disabled />
                            </div>
                        </div>
                    </div>
                    <div class="column is-2">
                        <div class="container is-fluid thirdtwo-content">
                            <p class="pushbacktime">1734</p>
                        </div>
                    </div>
                    <div class="column is-3">
                        <div class="container is-fluid thirdthree-content">
                            <p class="nextstate title">TXI</p>
                        </div>
                    </div>
                    <div class="column is-1">
                        <div class="container is-fluid thirdfour-content">
                            <font-awesome-icon icon="eraser" class="icon-eraser fa-lg" @click="startErasing" />
                            <font-awesome-icon icon="pencil-alt" class="icon-pencil fa-lg" @click="togglePencil" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Dep-Estrip',
    data() {
        return {
            state: '',
            requestedFlightLevel: '',
            aircraftCallsign: '',
            Type: '',
            WTC: '',
            SSR: '',
            TOBT: '',
            destinationAirportICAOCode: '',
            stand: '',
            flightRule: '',
            runwayInUse: '',
            SID: '',
            taxiRoute: '',
            isDrawing: false,
            isErasing: false,
            context: null,
            lastX: 0,
            lastY: 0,
        };
    },
    mounted() {
        this.context = this.$refs.canvas.getContext('2d');
        this.context.strokeStyle = '#000';  // Default drawing color
        this.context.lineWidth = 2;         // Default line width
    },

    methods: {
    startDrawing(event) {
      // Only start drawing if we are not erasing
      if (!this.isErasing && event.button === 0) {
        this.isDrawing = true;
        this.lastX = event.offsetX;
        this.lastY = event.offsetY;
        this.context = this.$refs.canvas.getContext('2d');
        this.context.beginPath();
        this.context.moveTo(this.lastX, this.lastY);
      }
    },
    draw(event) {
      if (!this.isDrawing) return;
      this.context.lineTo(event.offsetX, event.offsetY);
      this.context.stroke();
   
    },
    stopDrawing() {
      if (this.isDrawing) {
        this.context.closePath();
        this.isDrawing = false;
      }
    },
    clearCanvas() {
        if (this.context) {
                this.context.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
            }
    },
    startErasing() {
      this.clearCanvas();
    },
    togglePencil() {
        this.isDrawing = false; 
    },
  
},

};
</script>




<style scoped>
.aircraftCallsign{
    font-size: 1.25em;
    font-weight: bold;
    
}
.Type {
    font-size: 0.75em;
    
}
.stand, .runwayInUse, .SID, .taxiRoute {
    
    border: 1px solid black;
    border-radius: 5px;
    width: 85%;
    text-align: center;
}

.strip-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10; /* Ensure it's above the strip content */
  /* border: 1px solid black; */
}
.thirdfour-content {
    display: flex;
    justify-content: end;
    align-items: center;
    flex-direction: column;
    color: black;
    font-size: bold;
}
.nextstate.title {
    color: black;
}
.thirdthree-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: black;
    font-size: bold;
    border: 1px solid black;
    border-radius: 5px;

}
.thirdtwo-content {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: bottom;
    color: black;
    font-size: bold;
    
}
.thirdrow input[type="button"] {
    width: 100%;
}
.thirdrow {
    display: flex;
    justify-content: space-around;
    align-items: bottom;
    flex-direction: row;
    color: black;
    font-size: bold;
}
.secondrow {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    color: black;
    font-size: bold;
}
.firstrow {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    color: black;
    font-size: bold;
}
.thirdone-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    color: black;
    font-size: bold;
}

.lastrow {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
    color: black;
    font-size: bold;
    
}
.second-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: black;
    font-size: bold;
}
.state {
    font-size: 1.5em;
    border: 1px solid black;
    border-radius: 5px;
}
.first-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    color: black;
    font-size: bold;
}
.strip {
    /* Add your strip styles here */
    position: relative;
    margin: 5px;
    height: 80px;
    width: 600px;
    background-color: whitesmoke;
    /* position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); */
}
.column.second {
    background-color: rgb(255, 255, 0);

}
</style>