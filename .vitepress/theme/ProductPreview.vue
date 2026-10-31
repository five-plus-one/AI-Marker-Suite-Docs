<script setup>
import {createElement} from 'react'
import preview from '../../site/.product-preview.json'
import {ref,onMounted,onUnmounted} from 'vue'
import {ProductPreview} from '../../site/product-preview.jsx'
const host=ref(),props={base:import.meta.env.BASE_URL},html=preview.html
let root
onMounted(async()=>{const {hydrateRoot}=await import('react-dom/client');if(host.value)root=hydrateRoot(host.value,createElement(ProductPreview,props))})
onUnmounted(()=>root?.unmount())
</script>
<template><div ref="host" class="fp-showcase-preview" v-html="html"></div></template>
