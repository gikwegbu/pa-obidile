<template>
    <q-page class="q-pa-lg">
        <div class="text-h5">
            Metric
        </div>
        <div class="row q-gutter-lg justify-around q-mb-lg">
            <div class="col-12 col-sm-3 text-center q-pa-lg card">
               <div class="text-h3">
                {{ dbStore.getAdminDashboardMetric.tributeArr.length.toLocaleString() }}
               </div>
               <div class="">
                Total Tributes
               </div>
            </div>
            <div class="col-12 col-sm-3 text-center q-pa-lg card">
               <div class="text-h3">
                {{ dbStore.getAdminDashboardMetric.storyArr.length.toLocaleString() }}
               </div>
               <div class="">
                Total Stories
               </div>
            </div>
            <div class="col-12 col-sm-3 text-center q-pa-lg card">
               <div class="text-h3">
                {{ dbStore.getAdminDashboardMetric.imageArr.length.toLocaleString() }}
               </div>
               <div class="">
                Total Images
               </div> 
            </div>
        </div>
        <div style="margin: 50px; color: transparent;">.</div>
        <div class="flex justify-between q-mt-lg q-mb-md">
            <q-btn outline color="primary" :icon="isManageContent ? 'settings' : 'add'" :label="isManageContent ? 'Manage' : 'Create New'" @click="manageContents()" />
            <q-btn-dropdown flat color="primary" :label="contentType">
                <q-list>
                    <!-- <q-item clickable v-close-popup @click="contentType = value" v-for="{index, value, name} in contentTypeArr" :key="index"> -->
                    <q-item clickable v-close-popup @click="selectContentType(name, value, section)" v-for="{index, value, name, section} in contentTypeArr" :key="index">
                        <q-item-section>
                            <q-item-label>
                                {{ name }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-btn-dropdown>
            <!-- Upon click, brings out the table of contents...then the content type is used to toggle -->
            <!-- The toggle type is only for tributes, life and stories... -->
        </div>
        <div class="full-width" v-if="isManageContent">
            <div>
                <q-editor
                    v-model.trim="editor"
                    :definitions="{
                        bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
                    }"
                    :toolbar="[
                        [
                        {
                            label: $q.lang.editor.align,
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            list: 'only-icons',
                            options: ['left', 'center', 'right', 'justify']
                        },
                        {
                            label: $q.lang.editor.align,
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            options: ['left', 'center', 'right', 'justify']
                        }
                        ],
                        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                        ['token', 'hr', 'link', 'custom_btn'],
                        ['print', 'fullscreen'],
                        [
                        {
                            label: $q.lang.editor.formatting,
                            icon: $q.iconSet.editor.formatting,
                            list: 'no-icons',
                            options: [
                            'p',
                            'h1',
                            'h2',
                            'h3',
                            'h4',
                            'h5',
                            'h6',
                            'code'
                            ]
                        },
                        {
                            label: $q.lang.editor.fontSize,
                            icon: $q.iconSet.editor.fontSize,
                            fixedLabel: true,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                            'size-1',
                            'size-2',
                            'size-3',
                            'size-4',
                            'size-5',
                            'size-6',
                            'size-7'
                            ]
                        },
                        {
                            label: $q.lang.editor.defaultFont,
                            icon: $q.iconSet.editor.font,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                            'default_font',
                            'arial',
                            'arial_black',
                            'comic_sans',
                            'courier_new',
                            'impact',
                            'lucida_grande',
                            'times_new_roman',
                            'verdana'
                            ]
                        },
                        'removeFormat'
                        ],
                        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                        ['undo', 'redo'],
                        ['viewsource']
                    ]"
                    :fonts="{
                        arial: 'Arial',
                        arial_black: 'Arial Black',
                        comic_sans: 'Comic Sans MS',
                        courier_new: 'Courier New',
                        impact: 'Impact',
                        lucida_grande: 'Lucida Grande',
                        times_new_roman: 'Times New Roman',
                        verdana: 'Verdana'
                    }"
                />
            </div>
            <div class="flex justify-end q-mt-md">
                <q-btn glossy color="primary" :class="$q.screen.lt.sm ? 'full-width' : ''" @click="publishContent()"  :loading="isPublishing">
                    Publish 
                </q-btn>
            </div>
        </div>
        <div v-else>
            <TableComponent :rows="tableData" :tableTitle="contentType" :section="selectedContentType.section" />
        </div>

        <!-- This is for Gallery Sectino -->

    </q-page>
</template>

<style>
    .card{
        border-radius: 20px;
        background-color: rgba(128, 128, 128, 0.154);
        box-shadow: 2px 2px 2px #1976d28f;
        font-family: cursive;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }
    .card:hover {
        box-shadow: 0px 0px 0px #1976d28f;
        transition:  0.3s ease-in-out;
    }
</style>


<script>
import { defineComponent, ref } from 'vue'
import { Notify } from 'quasar'
import db from 'src/boot/firebase'
import { doc, collection, query, orderBy, onSnapshot, setDoc,  addDoc, serverTimestamp } from "firebase/firestore";
import TableComponent from 'components/table.vue'
import { useDbStore } from 'stores/db'
import { 
    aboutSection,
    landingPage,
    lifeSection,
    storiesSection,
    tributeSection,
    aboutText,
    centerText,
    programmeEvents,
    galleryStorage,
    nameDoc,
    emailDoc,
    content,
    dateDoc,
    life,
 } from 'pages/admin/constants'

const _contentType = [
    {
        name: 'About',
        section: aboutSection,
        value: aboutText
    },
    {
        name: 'Programme',
        section: aboutSection,
        value: programmeEvents
    },
    {
        name: 'Personal Message',
        section: aboutSection,
        value: centerText
    },
    {
        name: 'Tribute',
        section: tributeSection,
        value: content
    },
    {
        name: 'Stories',
        section: storiesSection,
        value: content
    },
    {
        name: 'Life',
        section: lifeSection,
        value: life // change this to something else make you fit create a switch case for it...
    },
]
const _manageContentType = [
    {
        name: 'Tribute',
        section: tributeSection,
        value: content
    },
    {
        name: 'Stories',
        section: storiesSection,
        value: content
    },
]

export default defineComponent({
  name: 'DashboardScreen',
  components: {
    TableComponent,
  },
  methods: {
    selectContentType (type, val, section) {
        const _ = this
        _.selectedContentType = {type, val, section}
        _.contentType = type
        // Call the function that handles passing of table data...
        _.loadTableData()
    },
    manageContents() {
        const _ = this
        _.isManageContent = !_.isManageContent
        _.contentTypeArr = _.isManageContent ? _contentType : _manageContentType;
        _.contentType = _.isManageContent ? "Tribute" : "Content Type";
    },
    async publishContent() {
        const _ = this
        // Check if the content type has been selected.
        if(_.contentType == "Content Type") {
            _.notify("Please choose content type from drop down", 'red');
            return
        }
        if(!_.editor.length) {
            _.notify("Please write soemthing", 'red');
            return
        }
        // Get the type of content
        let contentType = _.selectedContentType
        console.log("This is the contentType::: ", contentType)

        // Fetch all data in that collection
        const q = collection(db, contentType.section);
        const unsubscribe =  onSnapshot(q, (querySnapshot) => {
            _.results = []
            querySnapshot.forEach((doc) => {
                _.results.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            console.log("George these were fetched...", _.results)
        });
        
        setTimeout(async () => {
            var docRef = ''
            var data = {}
            switch (contentType.val) {
                case aboutText:
                    // Means its the aboutSection
                     docRef = doc(db, contentType.section, _.results[0]['id']);
                     data = { 
                        [contentType.val]: _.editor
                    };
                    _.publish(docRef, data)
                    break;
                case programmeEvents:
                    // Means its the aboutSection also...
                    docRef = doc(db, contentType.section, _.results[0]['id']);
                    data = { 
                        [contentType.val]: _.editor
                    };
                    _.publish(docRef, data)
                    break;
                case centerText:
                    // Means its the aboutSection also...
                    docRef = doc(db, contentType.section, _.results[0]['id']);
                    data = { 
                        [contentType.val]: _.editor
                    };
                    _.publish(docRef, data)
                    break;
                case life:
                    // Means its the LifeSection 
                    const _docRef = doc(db, contentType.section, _.results[0]['id']);
                    data = { 
                        content: _.editor,
                        date: serverTimestamp(),
                        name: _.dbStore.getAdminDetails.name
                    };
                    _.publish(_docRef, data)
                    break;

                case content:
                    // Means its for any section that has content
                    data = { 
                        [contentType.val]: _.editor,
                        date: serverTimestamp(),
                        name: _.dbStore.getAdminDetails.name
                    };
                    _.isPublishing = true;
                    const docRef = await addDoc(collection(db, contentType.section), data);
                    _.isPublishing = false;
                    _.editor = ''
                    _.notify(`${_.contentType}'s Content Has been updated successfully`, 'green')
                    break;
            
                default:
                    break;
        }
       }, 500);
        
    },
    async publish(docRef, data) {
        const _ = this;
        _.isPublishing = true;

        await setDoc((docRef), data,{ merge: true } );
        _.isPublishing = false;
        _.editor = ''
        _.notify(`${_.contentType}'s Content Has been updated successfully`, 'green')
    },
    loadTableData() {
        const _ = this
        switch (_.contentType) {
            case "Tribute":
                _.tableData = _.dbStore.getAdminDashboardMetric.tributeArr
                break;
                case "Stories":
                _.tableData = _.dbStore.getAdminDashboardMetric.storyArr
                break;
            default:
                break;
        }
    },
    loadTributesFromFirebase() {
        const _ = this;
        const q = query(collection(db, tributeSection), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            _.tributes = []
            querySnapshot.forEach((doc) => {
                _.tributes.push({ 
                    id: doc.id,
                    name: doc.data().name, 
                    date: doc.data().date, 
                    comment: doc.data().content 
                });
            });
            _.addToDb('tribute', _.tributes)
        });
    },
    loadStoriesFromFirebase() {
        const _ = this;
        const q = query(collection(db, storiesSection), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            _.stories = []
            querySnapshot.forEach((doc) => {
                _.stories.push({ 
                    id: doc.id,
                    name: doc.data().name, 
                    date: doc.data().date, 
                    comment: doc.data().content 
                });
            });
            _.addToDb('stories', _.stories)
        });
    },
    loadImagesFromFirebase() {
        const _ = this;
        const q = query(collection(db, galleryStorage), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            _.gallery = []
            querySnapshot.forEach((doc) => {
                _.gallery.push({ 
                    id: doc.id,
                    name: doc.data().name, 
                    date: doc.data().date, 
                    comment: doc.data().content 
                });
            });
            _.addToDb('images', _.gallery)
        });
    },
    addToDb(type, content) {
        const _ = this
        _.dbStore.addContentToDb(type, content)
    },
    notify(message, color) {
        Notify.create({
            message: message,
            color: color
        })
    }
  },
  mounted() {
    this.loadTributesFromFirebase();
    this.loadStoriesFromFirebase();
    this.loadImagesFromFirebase();
  },
  setup() {
      const dbStore = useDbStore();

    return {
        dbStore,
        editor: "",
        tributes: ref([]),
        stories: ref([]),
        gallery: ref([]),
        contentType: ref( 'Content Type'),
        contentTypeArr: ref(_contentType),
        selectedContentType: ref({}),
        isPublishing: ref(false),
        isManageContent: ref(true),
        tableData: ref([]),
        results: ref([])
    }
  }
})
</script>
