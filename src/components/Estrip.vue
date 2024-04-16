<template>
    <div class="estrip">
        <!-- Your code here -->
    </div>
</template>

<script>
export default {
    name: 'Estrip',
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
.estrip {
    /* Your styles here */
}
</style>