<template>
    <div class="home-container">
        <h2>欢迎来到微前端主应用</h2>
        <p>当前用户: {{ baseState.user.name }}</p>
        <p>当前主题: {{ baseState.theme }}</p>

    </div>
</template>

<script setup lang="ts">
import { baseState } from '../globleState';
</script>

<style scoped>

</style>