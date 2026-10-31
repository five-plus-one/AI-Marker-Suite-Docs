<script setup>
import notes from '../../site/release-notes.json'
import { renderChannelNotes } from '../../site/changelog.mjs'
const props=defineProps({channel:{type:String,required:true}})
</script>
<template>
  <div :id="channel==='stable'?'dynamic-changelog':'dynamic-changelog-preview'" v-html="renderChannelNotes(notes,channel)"></div>
</template>
