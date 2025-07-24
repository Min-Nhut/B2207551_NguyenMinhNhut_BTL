<template>
  <div class="search-component">
    <h2>Tra cứu</h2>
    <p>Tìm kiếm tài liệu hoặc sách:</p>
    <input type="text" v-model="searchQuery" placeholder="Nhập từ khóa..." />
    <p>Kết quả: {{ searchQuery }}</p>
  </div>
</template>

<script>
export default {
  name: "SearchComponent",
  data() {
    return {
      searchQuery: "",
    };
  },
};
</script>

<style scoped>
.search-component {
  padding: 20px;
  text-align: center;
}

input {
  padding: 5px;
  margin: 10px 0;
  width: 200px;
}
</style>
