<template>

    <div class="estrip">
        <!-- Add your strip content here -->
        <div class="columns is-gapless">
            <div class="column is-1 first">
                <div class="container is-fluid first-content">
                <p class="state">PSH</p>
                <p class="RFL">F350</p>
                </div>
            </div>
            <div class="column is-4 second"></div>
            <div class="column is-7 third"></div>
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
    width: 700px;
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