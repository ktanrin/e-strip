<template>
    <div class="short-strip">
        <div class="container data">
            <div class="first-row">
                <p class="type">BK17/L</p>
                <p class="callsign">{{ data.aircraftCallsign }}</p>             
            </div>
            <div class="second-row container columns">
                <div class="column is-3 p-0">
                    <p>21L</p>
                </div>
                <div class="column is-3 p-0">
                    <p>106</p>
                </div>
                <div class="column is-3 p-0">
                    
                </div>
                <div class="column is-3 p-0">
                    <p>1004</p>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShortEstrip',
    props: {
    data: {
      type: Object,
      required: true
    }
  },
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
/* Add your component-specific styles here */
.short-strip {
      /* Add your strip styles here */
    position: relative;
    margin: 1px;
    height: 68px;
    width: full-width;
    background-color: yellow; 
    border: black 1px solid;
}

.first-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    color: black;
    font-size: bold;
}
.type {
    font-size: 0.75em;
    
}
.second-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    color: black;
    background-color: lightgrey;
    font-size: bold;
}
</style>