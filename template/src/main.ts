import Vue from 'vue';

{{#router}}
/** 导入路由 */
import Router from '@/route';
{{/router}}

/** 导入主页面 */
import App from '@/App.vue';

new Vue({
    {{#router}}
    router: Router,
    {{/router}}
    render: (e) => e(App)
}).$mount('#app');
