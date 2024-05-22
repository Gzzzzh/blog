<script setup>
import { useMoveHook } from './useMoveHook'
const resultPosition = useMoveHook({ target: '.drag-item', parent: '.box' })

</script> 

<template>
  <div class="container">
    <div class="box">
      <div class="drag-item">
        <div>x: {{ resultPosition.x }}</div>
        <div>y: {{ resultPosition.y }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  width: 600px;
  height: 600px;
  border: 1px solid #000;
  box-sizing: content-box;
  position: relative;
}
.drag-item {
  width: 50px;
  height: 50px;
  left: 60px;
  top: 100px;
  color: #fff;
  background-color: #f00;
}
</style>
