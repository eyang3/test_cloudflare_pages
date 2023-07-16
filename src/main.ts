import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import UiEditor from 'balm-ui/components/editor';
import button from 'balm-ui/components/button';


// import BalmUI from 'balm-ui'; // Official Google Material Components
// import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import './assets/main.css'

const app = createApp(App)

app.use(router);
// app.use(BalmUI);
app.use(UiEditor);
app.use(button);
app.use(store);

app.mount('#app')
