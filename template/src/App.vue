<template>
   <div>{{ message }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
    message = 'Hello World'

    /** 生命周期 html未渲染 可初始化属性 */
    created() {}

    /** 生命周期 html渲染完成 涉及到dom节点操作 必须在此函数内执行 */
    mounted() { }
}
</script>

<style>
    /* css */
</style>
