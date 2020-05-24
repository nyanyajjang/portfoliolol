const STORAGE_KEY = 'eventcalendar-storage';

Vue.component('everyday', {
    props: ['day','month','year'],
    template: `
    <div>

    <div @click="add">{{ day }}<div v-if="this.eventList.length"><i style="color: pink" class="fas fa-circle"></i></div></div>
    <transition name="fade">
    <div class="addedEvent" v-if = "event">
    <div class="row justify-content-center">
    <div class="col-8"> 

    <button class="delete" @click="resets" class="btn btn-secondary" style="font-size: small"><i class="fas fa-times-circle"></i></button>
    
    <ul class="list-group">
    <form v-on:submit.prevent="">
    <div class="row mr-5" style= "height:50px">

    <div class="col">
    <input type="time" class="form-control" v-model="time" />
    </div>
    
    <div class="col mr-5 pl-0">
    <button class="btn btn-secondary" style="font-size: medium" @click="addEvent"><i class="fas fa-plus-circle"></i></button>
    </div>

    </div>

    <div class="textevent row">
    <div class="col">
    <textarea placeholder="Text events" class="textevent form-control" v-model="description" />
    </div>
    </div>

    <div :key="index" class="event mt-3" style="color:white" v-for="(event, index) in eventList">
      {{ event.time }} {{ event.description }} 
      <button @click="deleteEvent(index)" class="btn btn-secondary" style="font-size: 10px"><i class="fas fa-trash-alt"></i></button>
    </div>
    </form>
    </ul>
    </div>
   </div>
   <transition name="fade">
</div>


  </div>
    `,
    data() {
      return {
        show: true,
        circle: false,
        event: false,
        time: "",
        description: "",
        
        }
    },
    
    methods: {
        resets(){
            this.event = false
        },
        
        add(){
            this.event = true
        },

      addEvent() {
        this.$root.eventList.push({
          time: this.time,
          description: this.description,
          day: this.day,
          month: this.month,
          year: this.year,
          id: this.day + parseInt(this.month, 10) + this.year + this.time
         })
        
        this.time = ''
        this.description = ''
      
        if(this.$root.eventList.length > 0) {
            this.circle = true
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$root.eventList));
        console.log(this.$root.eventList)
      },
      deleteEvent(index) {
        this.$root.eventList.splice(index, 1);
        
        if(this.$root.eventList.length === 0){
          this.circle = false}
      }

     
      
    
},
computed: {
    
    eventList() {
    return this.$root.eventList.filter(item => item.day === this.day && item.month === this.month && item.year === this.year)
    }
  }
   
})


const app = new Vue ({

  el: '#app',
  data: {
    event: false,
    weekdays: ['MON', 'TUE', 'WED','THU','FRI','SAT','SUN'],
      months: ['January', 'February', 'March', 'April', 'May', 'July', 'August', 'September', 'October', 'Movember', 'December'],
       years: [2020, 2021, 2022, 2023, 2024, 2025],
      selected: {
          date: 0,
          month: 0, // January
          year: 0
      },
      
      eventList:[]
  },
  methods: {
        getCurrentDate(){
        const today = new Date();
        this.selected.date = today.getDate();
        this.selected.month = today.getMonth();
        this.selected.year = today.getFullYear();
    },
    monthUp(){
        if(this.selected.month === 11) {
          this.selected.month = 0;
          this.selected.year += 1;
        }
      else {
          this.selected.month += 1;
      }
    },
    monthDown(){
        if(this.selected.month === 0) {
            this.selected.month = 11;
            this.selected.year -= 1;
          }
        else {
            this.selected.month -= 1;
        }
      }

  },
  computed: {
      daysInMonth() {
          const date = new Date(this.selected.year, this.selected.month + 1, 0).getDate() // last day of selected month
          return date
      },
      startDay() {
          const date = new Date(this.selected.year, this.selected.month, 1).getDay()
          return date
      }
  },
  created() {
    this.getCurrentDate();
}
})