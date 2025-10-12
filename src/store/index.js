import { createStore } from 'vuex'
import services from './modules/services'
import blog from './modules/blog'
import companyInfo from './modules/companyInfo'
import menu from './modules/menu'
import gallery from './modules/gallery'

export default createStore({
  modules: {
    services,
    blog,
    companyInfo,
    menu,
    gallery
  },
}) 