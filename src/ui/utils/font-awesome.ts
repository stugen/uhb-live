import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEnvelope, faPhone, faPaperPlane, faUser, faComments, faPlayCircle, faCheckCircle, faCheck, faTimes,
  faSyncAlt, faTrashAlt, faEdit, faEraser, faPlus
} from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faInstagram, faEnvelope, faPhone, faPaperPlane, faUser, faComments, faPlayCircle, faCheckCircle,
  faCheck, faTimes, faSyncAlt, faTrashAlt, faEdit, faEraser, faPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)
