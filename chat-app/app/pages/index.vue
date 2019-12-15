<template>
  <div class="columns">
    <!-- side menu -->
    <div class="column is-one-quarter">
    <aside class="menu">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <a>Dashboard</a>
        </li>
        <li>
          <a>Customers</a>
        </li>
      </ul>
      <p class="menu-label">Rooms</p>
      <ul class="menu-list" id="room-list">
        <li><a href="#">Tanaka</a></li>
        <li><a href="#">Saito</a></li>
      </ul>
    </aside>
    </div>
    <!-- chat -->
    <div class="column" id="chat-room">
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.columns {
  margin: 10px;
}

#chat-room {
  background-color: skyblue;
}
</style>
