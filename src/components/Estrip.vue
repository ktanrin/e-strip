<template>

    <div class="strip">
        <!-- Add your strip content here -->
        <div class="columns is-gapless">
            <div class="column is-1 first">
                <div class="container is-fluid first-content">
                <p class="state">PSH</p>
                <p class="RFL">F350</p>
                </div>
            </div>
            <div class="column is-4 second">
                <div class="container is-fluid second-content">
                    <p class="Type">B738</p>
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
                    <div class="column is-6">
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
                                <input type="button" />
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
                            <p class="emoji">D</p>
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
            taxiRoute: ''
        };
    }
};
</script>




<style scoped>
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
    height: 100px;
    width: 650px;
    background-color: whitesmoke;
    position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%);
}
.column.second {
    background-color: rgb(255, 255, 0);

}
</style>