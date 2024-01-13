import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import UiEditor from 'balm-ui/components/editor';
import button from 'balm-ui/components/button';
import UiTextfieldComponents from 'balm-ui/components/textfield';


// import BalmUI from 'balm-ui'; // Official Google Material Components
// import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import './assets/main.css'
import * as dotenv from "dotenv";
//does this keep?
const app = createApp(App)
app.config.globalProperties.root_api = import.meta.env.VITE_ROOT_API || "/api"

let host = window.location.host;
if (host.indexOf('localhost') || host.indexOf('127.0.0.1')) {
    app.config.globalProperties.$hostname = 'http://localhost:3000'
}

app.use(router);
// app.use(BalmUI);
app.use(UiEditor);
app.use(button);
app.use(store);
app.use(UiTextfieldComponents);

app.mount('#app')
