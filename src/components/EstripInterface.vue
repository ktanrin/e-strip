<template>
    <div class="estrip-layout">
      <aside class="side-column">
        <section
          v-for="zone in leftZones"
          :key="zone.key"
          class="side-zone"
          :class="{ 'is-drop-target': dragOverZone === zone.key }"
          :data-strip-zone="zone.key"
          @dragover.prevent="setDragOverZone(zone.key)"
          @dragleave="clearDragOverZone($event, zone.key)"
          @drop.prevent="dropOnSideZone($event, zone.key)"
        >
          <div class="zone-title">{{ zone.title }}</div>
          <div class="side-strip-list">
            <div
              v-for="element in zoneStrips(zone.key)"
              :key="element.id"
              class="short-strip-shell"
              draggable="true"
              @dragstart="startShortStripDrag($event, element, zone.key)"
              @dragend="finishNativeDrag"
            >
              <ShortEstrip :data="element" />
            </div>
            <div v-if="zoneStrips(zone.key).length === 0" class="empty-zone">Empty</div>
          </div>
        </section>
      </aside>

      <main class="center-panel">
        <div class="center-lists">
          <div
            v-for="list in centerLists"
            :key="list.key"
            class="strip-board"
            :class="{
              'is-list-source': isSourceCenterList(list.key),
              'is-list-target': isTargetCenterList(list.key)
            }"
            :data-center-list="list.key"
            @dragover.prevent
            @drop.prevent="dropOnCenter($event, list.key)"
          >
            <div
              :ref="element => setCenterListRef(list.key, element)"
              class="strip-list"
              :style="{ height: `${getListHeight(list.key)}px` }"
            >
              <div
                v-for="element in centerListStrips(list.key)"
                :key="element.id"
                class="strip-row"
                :class="{
                  'is-held': isHeld(element),
                  'is-moving': isMoving(element),
                  'is-transferring': isTransferPreview(element)
                }"
                :style="{ top: `${getStripY(element)}px` }"
              >
                <div
                  class="strip-slide"
                  :class="{
                    'is-emphasized': element.emphasized,
                    'is-sliding': isSliding(element)
                  }"
                  :style="{ '--slide-offset': `${getSlideOffset(element)}px` }"
                  @pointerdown="startStripGesture($event, element, list.key)"
                >
                  <Estrip
                    :data="stripWithNextState(element)"
                    @advance-state="advanceStripState(element)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <aside class="side-column">
        <section
          v-for="zone in rightZones"
          :key="zone.key"
          class="side-zone"
          :class="{ 'is-drop-target': dragOverZone === zone.key }"
          :data-strip-zone="zone.key"
          @dragover.prevent="setDragOverZone(zone.key)"
          @dragleave="clearDragOverZone($event, zone.key)"
          @drop.prevent="dropOnSideZone($event, zone.key)"
        >
          <div class="zone-title">{{ zone.title }}</div>
          <div class="side-strip-list">
            <div
              v-for="element in zoneStrips(zone.key)"
              :key="element.id"
              class="short-strip-shell"
              draggable="true"
              @dragstart="startShortStripDrag($event, element, zone.key)"
              @dragend="finishNativeDrag"
            >
              <ShortEstrip :data="element" />
            </div>
            <div v-if="zoneStrips(zone.key).length === 0" class="empty-zone">Empty</div>
          </div>
        </section>
      </aside>
    </div>
</template>

<script>
import Estrip from './Estrip.vue';
import ShortEstrip from './ShortEstrip.vue';

export default {
    name: 'EstripInterface',
    components: {
    Estrip,
    ShortEstrip
    },
    
    data() {
        return {
            centerLists: [
              { key: 'centerA' },
              { key: 'centerB' }
            ],
            centerListRefs: {
              centerA: null,
              centerB: null
            },
            centerStrips: {
              centerA: [
                { id: 1, type: 'departure', state: 'APR', content: 'First strip', aircraftCallsign: 'AIQ536', emphasized: false, y: 8 },
                { id: 2, type: 'departure', state: 'PSH', content: 'Second strip', aircraftCallsign: 'TLM123', emphasized: false, y: 108 },
              ],
              centerB: [
                { id: 3, type: 'arrival', state: 'CLR', content: 'Third strip', aircraftCallsign: 'NOK456', emphasized: false, y: 8 },
                { id: 4, type: 'arrival', state: 'LND', content: 'Fourth strip', aircraftCallsign: 'DKH789', emphasized: false, y: 108 },
              ]
            },
            stateOrders: {
              departure: ['PND', 'APR', 'SUG', 'PSH', 'TXI', 'HND', 'HLD', 'CRS', 'RCL', 'L/U', 'T/O'],
              arrival: ['1ST', 'CLR', 'LND', 'RCL', 'HND', 'TXI', 'ONB']
            },
            terminalZones: {
              departure: {
                PND: 'departureInbound',
                'T/O': 'departureOutbound'
              },
              arrival: {
                '1ST': 'arrivalInbound',
                ONB: 'arrivalOutbound'
              }
            },
            zoneStates: {
              departureOutbound: 'T/O',
              departureInbound: 'PND',
              arrivalInbound: '1ST',
              arrivalOutbound: 'ONB'
            },
            gesture: null,
            slideDistance: 48,
            slideThreshold: 24,
            gestureThreshold: 6,
            centerTransferThreshold: 96,
            stripHeight: 90,
            stripGap: 8,
            transferDistance: 900,
            dragOverZone: null,
            nativeDrag: null,
            zoneDefinitions: [
              { key: 'departureOutbound', title: 'Departure Outbound', column: 'left' },
              { key: 'departureInbound', title: 'Departure Inbound', column: 'left' },
              { key: 'arrivalInbound', title: 'Arrival Inbound', column: 'right' },
              { key: 'arrivalOutbound', title: 'Arrival Outbound', column: 'right' },
            ],
            sideStrips: {
              departureOutbound: [
                { id: 5, type: 'departure', state: 'T/O', content: 'Fifth strip', aircraftCallsign: 'DKH789', emphasized: false, y: 0 }
              ],
              departureInbound: [
                { id: 6, type: 'departure', state: 'PND', content: 'Sixth strip', aircraftCallsign: 'THA212', emphasized: false, y: 0 }
              ],
              arrivalInbound: [
                { id: 7, type: 'arrival', state: '1ST', content: 'Seventh strip', aircraftCallsign: 'CPA431', emphasized: false, y: 0 }
              ],
              arrivalOutbound: [
                { id: 8, type: 'arrival', state: 'ONB', content: 'Eighth strip', aircraftCallsign: 'EVA882', emphasized: false, y: 0 }
              ]
            }
        };
    },
    computed: {
      leftZones() {
        return this.zoneDefinitions.filter(zone => zone.column === 'left');
      },
      rightZones() {
        return this.zoneDefinitions.filter(zone => zone.column === 'right');
      },
    },
    mounted() {
      this.routeTerminalCenterStrips();
    },
    beforeUnmount() {
      this.removeGestureListeners();
    },
    methods: {
    isSliding(strip) {
      return this.gesture && this.gesture.axis === 'x' && this.gesture.stripId === strip.id;
    },
    isHeld(strip) {
      return this.gesture && this.gesture.stripId === strip.id;
    },
    isMoving(strip) {
      return this.gesture && this.gesture.axis === 'y' && this.gesture.stripId === strip.id;
    },
    isTransferPreview(strip) {
      return this.gesture && this.gesture.isTransferPreview && this.gesture.stripId === strip.id;
    },
    isSourceCenterList(listKey) {
      return this.gesture && this.gesture.listKey === listKey;
    },
    isTargetCenterList(listKey) {
      return (
        this.gesture &&
        this.gesture.overListKey === listKey &&
        this.gesture.listKey !== listKey
      );
    },
    getStripY(strip) {
      if (this.isMoving(strip) || this.isTransferPreview(strip)) {
        return this.gesture.y;
      }

      return Number.isFinite(strip.y) ? strip.y : 0;
    },
    getSlideOffset(strip) {
      if (this.isSliding(strip)) {
        return this.gesture.offset;
      }

      return strip.emphasized ? -this.slideDistance : 0;
    },
    setCenterListRef(listKey, element) {
      if (element) {
        this.centerListRefs[listKey] = element;
      }
    },
    centerListStrips(listKey) {
      return this.centerStrips[listKey] || [];
    },
    getListHeight(listKey) {
      const bottomMostStrip = this.centerListStrips(listKey).reduce(
        (maxY, strip) => Math.max(maxY, this.getStripY(strip)),
        0
      );

      return bottomMostStrip + this.stripHeight + 32;
    },
    getAllCenterStrips() {
      return Object.values(this.centerStrips).flat();
    },
    findCenterListKey(stripId) {
      return Object.keys(this.centerStrips).find(listKey => (
        this.centerStrips[listKey].some(strip => strip.id === stripId)
      ));
    },
    findCenterStrip(stripId) {
      const listKey = this.findCenterListKey(stripId);

      if (!listKey) {
        return {
          strip: null,
          listKey: null
        };
      }

      return {
        strip: this.centerStrips[listKey].find(strip => strip.id === stripId),
        listKey
      };
    },
    zoneStrips(zoneKey) {
      return this.sideStrips[zoneKey] || [];
    },
    stripWithNextState(strip) {
      return {
        ...strip,
        nextState: this.getNextState(strip)
      };
    },
    getStripType(strip) {
      return strip.type === 'arrival' ? 'arrival' : 'departure';
    },
    getNextState(strip) {
      const stateOrder = this.stateOrders[this.getStripType(strip)];
      const currentIndex = stateOrder.indexOf(strip.state);

      if (currentIndex === -1) return stateOrder[0] || '';

      return stateOrder[currentIndex + 1] || '';
    },
    advanceStripState(strip) {
      const nextState = this.getNextState(strip);

      if (!nextState) return;

      strip.state = nextState;
      this.routeStripByCurrentState(strip);
    },
    routeStripByCurrentState(strip) {
      const type = this.getStripType(strip);
      const zoneKey = this.terminalZones[type][strip.state];

      if (!zoneKey) return;

      this.moveCenterStripToSideZone(strip, zoneKey, false);
    },
    routeTerminalCenterStrips() {
      this.getAllCenterStrips().forEach(strip => {
        this.routeStripByCurrentState(strip);
      });
    },
    startStripGesture(event, strip, listKey) {
      if (event.button !== undefined && event.button !== 0) return;
      if (event.target.closest('button, input, .icon-pencil, .icon-eraser, .strip-canvas.is-active')) return;

      const currentY = this.getStripY(strip);

      this.gesture = {
        stripId: strip.id,
        startX: event.clientX,
        startY: event.clientY,
        baseOffset: strip.emphasized ? -this.slideDistance : 0,
        offset: strip.emphasized ? -this.slideDistance : 0,
        baseY: currentY,
        y: currentY,
        listKey,
        overListKey: null,
        isTransferPreview: false,
        axis: null
      };

      window.addEventListener('pointermove', this.onStripGestureMove);
      window.addEventListener('pointerup', this.finishStripGesture);
      window.addEventListener('pointercancel', this.cancelStripGesture);
    },
    onStripGestureMove(event) {
      if (!this.gesture) return;

      const deltaX = event.clientX - this.gesture.startX;
      const deltaY = event.clientY - this.gesture.startY;

      if (!this.gesture.axis) {
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (absX < this.gestureThreshold && absY < this.gestureThreshold) return;

        this.gesture.axis = absX >= absY ? 'x' : 'y';
      }

      event.preventDefault();

      const overListKey = this.getCenterListKeyAtPoint(event.clientX, event.clientY);

      if (this.gesture.axis === 'y') {
        this.gesture = {
          ...this.gesture,
          overListKey
        };
        this.moveStripOnVerticalAxis(deltaY);
        return;
      }

      const nextOffset = Math.max(
        -this.transferDistance,
        Math.min(this.transferDistance, this.gesture.baseOffset + deltaX)
      );
      const isTransferPreview = Boolean(
        (overListKey && overListKey !== this.gesture.listKey) ||
        Math.abs(deltaX) >= this.centerTransferThreshold
      );

      this.gesture = {
        ...this.gesture,
        offset: nextOffset,
        overListKey,
        isTransferPreview,
        y: isTransferPreview ? Math.max(0, this.gesture.baseY + deltaY) : this.gesture.baseY
      };
    },
    moveStripOnVerticalAxis(deltaY) {
      this.gesture = {
        ...this.gesture,
        y: Math.max(0, this.gesture.baseY + deltaY)
      };
    },
    finishStripGesture(event) {
      if (!this.gesture) return;

      const { strip, listKey } = this.findCenterStrip(this.gesture.stripId);
      const targetZoneKey = this.getSideZoneKeyAtPoint(event.clientX, event.clientY);

      if (strip && targetZoneKey && this.moveCenterStripToSideZone(strip, targetZoneKey)) {
        this.cancelStripGesture();
        return;
      }

      const targetListKey = this.getCenterListKeyAtPoint(event.clientX, event.clientY);

      if (strip && targetListKey && targetListKey !== listKey) {
        this.moveCenterStripToCenterList(strip, listKey, targetListKey, this.getCenterDropY(event, targetListKey));
        this.cancelStripGesture();
        return;
      }

      if (strip && this.gesture.axis === 'x') {
        const deltaX = event.clientX - this.gesture.startX;

        if (!strip.emphasized && deltaX <= -this.slideThreshold) {
          strip.emphasized = true;
        } else if (strip.emphasized && deltaX >= this.slideThreshold) {
          strip.emphasized = false;
        }
      }

      if (strip && this.gesture.axis === 'y') {
        strip.y = this.gesture.y;
        this.settleVerticalPositions(strip.id, listKey);
      }

      this.cancelStripGesture();
    },
    settleVerticalPositions(draggedStripId, listKey) {
      if (!listKey) return;

      const step = this.stripHeight + this.stripGap;
      const orderedStrips = [...this.centerListStrips(listKey)].sort((first, second) => {
        const firstY = this.getStripY(first);
        const secondY = this.getStripY(second);

        if (firstY === secondY) {
          if (first.id === draggedStripId) return -1;
          if (second.id === draggedStripId) return 1;
          return first.id - second.id;
        }

        return firstY - secondY;
      });

      let nextFreeY = 0;

      orderedStrips.forEach((strip, index) => {
        const desiredY = Number.isFinite(strip.y) ? strip.y : index * step;
        strip.y = Math.max(0, desiredY, nextFreeY);
        nextFreeY = strip.y + step;
      });

      this.centerStrips[listKey] = orderedStrips;
    },
    getSideZoneKeyAtPoint(clientX, clientY) {
      const sideZones = Array.from(this.$el.querySelectorAll('[data-strip-zone]'));
      const sideZone = sideZones.find(zone => {
        const rect = zone.getBoundingClientRect();

        return (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        );
      });

      if (!sideZone) return null;

      return sideZone.dataset.stripZone;
    },
    getCenterListKeyAtPoint(clientX, clientY) {
      const centerLists = Array.from(this.$el.querySelectorAll('[data-center-list]'));
      const centerList = centerLists.find(list => {
        const rect = list.getBoundingClientRect();

        return (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        );
      });

      if (!centerList) return null;

      return centerList.dataset.centerList;
    },
    canDropStripInZone(strip, zoneKey) {
      return zoneKey.toLowerCase().startsWith(this.getStripType(strip));
    },
    moveCenterStripToSideZone(strip, zoneKey, syncStateToZone = true) {
      if (!this.canDropStripInZone(strip, zoneKey)) return false;

      const sourceListKey = this.findCenterListKey(strip.id);

      if (!sourceListKey) return false;

      this.centerStrips[sourceListKey] = this.centerStrips[sourceListKey].filter(item => item.id !== strip.id);
      this.settleVerticalPositions(strip.id, sourceListKey);
      strip.emphasized = false;
      if (syncStateToZone && this.zoneStates[zoneKey]) {
        strip.state = this.zoneStates[zoneKey];
      }
      strip.y = 0;
      this.addStripToSideZone(strip, zoneKey);
      this.dragOverZone = null;
      return true;
    },
    moveCenterStripToCenterList(strip, sourceListKey, targetListKey, y) {
      if (!sourceListKey || !targetListKey) return;

      this.centerStrips[sourceListKey] = this.centerStrips[sourceListKey].filter(item => item.id !== strip.id);
      strip.y = Math.max(0, y);
      this.centerStrips[targetListKey].push(strip);
      this.settleVerticalPositions(strip.id, sourceListKey);
      this.settleVerticalPositions(strip.id, targetListKey);
    },
    addStripToSideZone(strip, zoneKey) {
      Object.keys(this.sideStrips).forEach(key => {
        this.sideStrips[key] = this.sideStrips[key].filter(item => item.id !== strip.id);
      });

      this.sideStrips[zoneKey].push(strip);
    },
    startShortStripDrag(event, strip, sourceZoneKey) {
      this.nativeDrag = {
        stripId: strip.id,
        sourceZoneKey
      };

      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('application/json', JSON.stringify(this.nativeDrag));
    },
    finishNativeDrag() {
      this.nativeDrag = null;
      this.dragOverZone = null;
    },
    setDragOverZone(zoneKey) {
      this.dragOverZone = zoneKey;
    },
    clearDragOverZone(event, zoneKey) {
      if (this.dragOverZone !== zoneKey) return;
      if (event.currentTarget.contains(event.relatedTarget)) return;

      this.dragOverZone = null;
    },
    dropOnSideZone(event, targetZoneKey) {
      const drag = this.getNativeDragData(event);

      if (!drag) {
        this.dragOverZone = null;
        return;
      }

      const strip = this.takeStripFromSideZone(drag.sourceZoneKey, drag.stripId);

      if (strip && this.canDropStripInZone(strip, targetZoneKey)) {
        strip.state = this.zoneStates[targetZoneKey] || strip.state;
        this.addStripToSideZone(strip, targetZoneKey);
      } else if (strip) {
        this.addStripToSideZone(strip, drag.sourceZoneKey);
      }

      this.finishNativeDrag();
    },
    dropOnCenter(event, listKey) {
      const drag = this.getNativeDragData(event);

      if (!drag) return;

      const strip = this.takeStripFromSideZone(drag.sourceZoneKey, drag.stripId);

      if (!strip) {
        this.finishNativeDrag();
        return;
      }

      strip.emphasized = false;
      strip.y = this.getCenterDropY(event, listKey);
      this.centerStrips[listKey].push(strip);
      this.settleVerticalPositions(strip.id, listKey);
      this.finishNativeDrag();
    },
    getNativeDragData(event) {
      if (this.nativeDrag) return this.nativeDrag;

      const data = event.dataTransfer.getData('application/json');

      if (!data) return null;

      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    },
    takeStripFromSideZone(zoneKey, stripId) {
      const strips = this.sideStrips[zoneKey];

      if (!strips) return null;

      const stripIndex = strips.findIndex(strip => strip.id === stripId);

      if (stripIndex === -1) return null;

      const [strip] = strips.splice(stripIndex, 1);

      return strip;
    },
    getCenterDropY(event, listKey) {
      const stripList = this.centerListRefs[listKey];

      if (!stripList) return 0;

      const stripListRect = stripList.getBoundingClientRect();

      return Math.max(0, event.clientY - stripListRect.top);
    },
    cancelStripGesture() {
      this.removeGestureListeners();
      this.gesture = null;
    },
    removeGestureListeners() {
      window.removeEventListener('pointermove', this.onStripGestureMove);
      window.removeEventListener('pointerup', this.finishStripGesture);
      window.removeEventListener('pointercancel', this.cancelStripGesture);
    },
  }
}
</script>

<style>
.full-height {
  height: 100%;
}


.container.is-fluid {
  padding: 0 !important;
}

html, body {
  height: 100% !important;
  margin: 0;
  overflow: hidden;
}

#app {
  height: 100% !important;
}

.estrip-layout {
  display: grid;
  grid-template-columns: 190px minmax(680px, 1fr) 190px;
  height: 100%;
  min-height: 100%;
}

.side-column {
  display: grid;
  grid-template-rows: 1fr 1fr;
  min-height: 0;
}

.side-zone {
  background: #3f3f3f;
  border: 2px solid #111111;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  padding: 8px;
}

.side-zone.is-drop-target {
  outline: 3px solid #ffffff;
  outline-offset: -8px;
}

.zone-title {
  background: #f3f4f6;
  color: #111111;
  flex: 0 0 auto;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 8px;
  padding: 6px 8px;
}

.side-strip-list {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 6px;
  min-height: 0;
  overflow-y: auto;
}

.short-strip-shell {
  cursor: grab;
  flex: 0 0 auto;
}

.short-strip-shell:active {
  cursor: grabbing;
}

.empty-zone {
  align-items: center;
  border: 2px dotted rgba(255, 255, 255, 0.7);
  color: #f3f4f6;
  display: flex;
  flex: 1 1 auto;
  font-weight: 700;
  justify-content: center;
  min-height: 72px;
}

.center-panel {
  background: #cfd4da;
  min-height: 0;
  min-width: 0;
  overflow: auto;
}

.center-lists {
  display: grid;
  gap: 56px;
  grid-template-columns: repeat(2, minmax(700px, 1fr));
  height: 100%;
  min-width: 1456px;
}

.strip-board {
  background: #cfd4da;
  min-height: 100%;
  height: 100%;
  overflow: auto;
  padding: 16px 12px 32px 72px;
  position: relative;
  transition: background-color 160ms ease, box-shadow 160ms ease;
}

.strip-board + .strip-board {
  padding-left: 72px;
}

.strip-board.is-list-source {
  background: #c7ccd2;
  overflow: visible;
  z-index: 4;
}

.strip-board.is-list-target {
  background: #dbeafe;
  box-shadow: inset 0 0 0 3px rgba(37, 99, 235, 0.55);
  z-index: 2;
}

.strip-list {
  border: 2px dotted #ffffff;
  min-height: 100%;
  min-width: 640px;
  position: relative;
  transition: border-color 160ms ease, box-shadow 160ms ease;
  width: max-content;
}

.strip-board.is-list-target .strip-list {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.14);
}

.strip-row {
  display: flex;
  align-items: center;
  left: 0;
  position: absolute;
  transition: opacity 160ms ease, top 160ms ease;
  width: max-content;
}

.strip-row.is-moving,
.strip-row.is-transferring {
  opacity: 0.72;
  transition: none;
  z-index: 5;
}

.strip-row.is-held {
  z-index: 6;
}

.strip-slide {
  cursor: grab;
  touch-action: none;
  transform: translateX(var(--slide-offset, 0px));
  transition: transform 160ms ease, filter 160ms ease;
  user-select: none;
}

.strip-slide.is-sliding,
.strip-row.is-moving .strip-slide,
.strip-row.is-transferring .strip-slide {
  cursor: grabbing;
  transition: none;
}

.strip-row.is-held .strip-slide {
  filter: drop-shadow(0 10px 14px rgba(0, 0, 0, 0.24));
}

.strip-slide.is-emphasized {
  filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.24));
}

.strip-row.is-held .strip-slide.is-emphasized {
  filter: drop-shadow(0 10px 14px rgba(0, 0, 0, 0.28));
}

.strip-slide.is-emphasized .strip {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
</style>

