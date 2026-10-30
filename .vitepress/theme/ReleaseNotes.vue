<script setup>
import notes from '../../site/release-notes.json'
import { renderReleaseNotes } from '../../site/changelog.mjs'
const props=defineProps({channel:{type:String,required:true}})
</script>
<template>
  <div :id="channel==='stable'?'dynamic-changelog':'dynamic-changelog-preview'" class="changelog-container" v-html="renderReleaseNotes(notes[channel].changelog,notes[channel].changelogDates,channel)"></div>
</template>
