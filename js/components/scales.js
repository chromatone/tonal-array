import Chroma from '../Scales.js'

export default {
  template: `
  <div class="scale-select level wrap is-mobile">

    <div class="level-item">
        Scale
    </div>

    <div class="level-item scale-select">

          <select  v-model="scale">
            <option v-for="scal in scales" v-bind:value="scal">
              {{ scal.name }}
            </option>
          </select>

    </div>

    <div class="level-item">

      <svg @touchstart.stop.prevent="1" width="100%" viewbox="0 0 390 40">
        <g v-for="(note, i) in notes"
           :key="i"
            @touchstart.stop.prevent="root=note.pitch"
            @mousedown.stop.prevent="root=note.pitch"
            class="root-select">

          <circle
                r="14"
                :cx="20+i*32"
                :cy="20"
                :data-pitch="note.pitch"
                :data-active="note.active"
                :class="{'is-root':note.pitch==root}"
                :style="{stroke:notes[root].color}"></circle>

          <text
              :x="20+i*32"
              y="25"
              text-anchor="middle"
              fill="white"
              style="font-size:14px;font-weight:bold;text-anchor: middle;">{{note.name}}</text>

        </g>
      </svg>
    </div>
  </div>`,
  props: ["max", "min", "value", "step", "param"],
  data() {
    return {
      scales:Chroma.Scales,
      notes:Chroma.Notes,
      scale:[],
      root:0,
      activeNotes:[]
    };
  },
  created() {

  },
  watch: {

  },
  filters: {

  },
  computed: {

  },
  methods: {

  }
}
