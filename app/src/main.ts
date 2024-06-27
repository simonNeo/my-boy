import './assets/main.css'
import 'vant/lib/index.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FormatDatePlugin, AxiosPlugin } from './helper/plugins';
import {Icon, Popup, Button, Field, Toast} from 'vant';
import { createPinia } from 'pinia';

const app = createApp(App)
const pinia = createPinia();

app.use(router)
app.use(FormatDatePlugin);
app.use(AxiosPlugin);
app.use(Icon);
app.use(Popup);
app.use(Button);
app.use(Field);
app.use(Toast);

app.use(pinia);

app.mount('#app')
