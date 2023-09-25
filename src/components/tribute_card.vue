<template>
    <div class="tribute_card row  q-gutter-md">
        <div :class="hasIcon ? '': 'hidden'">
            <q-avatar color="black"  rounded>
                <img src="~assets/candle.png">
            </q-avatar>
        </div>
        <div :class="hasIcon ? 'col-sm-10' : 'col-sm-11'">
        <!-- <div class="col-sm-10"> -->
            <div class="text-bold"> {{ username }} </div>
            <!-- <div class="q-pb-sm"> {{ date ? date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) : ''  }} </div> -->
            <!-- <div class="q-pb-sm"> {{ date }} </div> -->
            <div class="q-pb-sm"> {{ date ? new Date(date.seconds * 1000).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) : ''  }} </div>
            <div class="q-pt-sm q-pb-lg q-pr-md" :class="showMore ? '': 'ellipsis-2-lines'" >
                <!-- {{ comment }} -->
                <span v-html="comment"></span>
            </div>
            <div class="flex justify-between q-pb-md">
                <q-btn flat class="text-weight-regular text-lowercase" icon="share" label="Share">

                    <q-menu auto-close>
                        <q-list style="min-width: 100px">
                            <q-item clickable>
                                <q-item-section>Facebook</q-item-section>
                            </q-item>
                            <q-item clickable>
                                <q-item-section>Whatsap</q-item-section>
                            </q-item>
                            <q-item clickable>
                                <q-item-section>Email</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
                <q-btn class="text-weight-regular text-lowercase" flat @click="showMore = !showMore"> {{ showMore ? 'Show Less' : 'Show More' }} </q-btn>
            </div>
        </div>
    </div>
</template>


<style>
    .tribute_card {
        /* background-color: rgba(18, 239, 162, 0.057); */
        background-color:  rgba(128, 128, 128, 0.11);
        margin-bottom: 30px;
        border-radius: 10px;
        box-shadow: 10px 5px 4px 3px  rgba(6, 6, 6, 0.233), 
                    0px 1px 4px 3px  rgba(42, 219, 7, 0.162);
        margin-bottom: 40px;
        transition: all 0.3s ease-in-out ;
    }
    .tribute_card:hover {
        transition: all 0.3s ease-in-out ;
        box-shadow: 0px 0px 0px 0px  rgba(6, 6, 6, 0.233), 
                    0px 0px 0px 0px  rgba(42, 219, 7, 0.162);
    }
</style>

<script>
import { defineComponent, ref } from 'vue'
// import { date } from 'quasar'

export default defineComponent({
  name: 'TributeCard',
  props: {
    username: {
      type: String,
      required: true
    },
    hasIcon: {
        type: Boolean,
        default: true
    },
    date: {
    //   type: Date,
      default: ''
    },

    comment: {
      type: String,
      default: 'lorem ipsum',
      required: true
    }
  },
  setup() {
      return {
        showMore: ref(false),
    }
  }
})
</script>
