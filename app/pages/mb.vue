<template>
  <!-- 獨立網址：您的網址/mb -->
  <v-app class="bg-grey-lighten-5">
    <!-- <v-app-bar flat class="border-b" color="white">
      <v-btn variant="text" prepend-icon="mdi-arrow-left" class="font-weight-bold ml-4" to="/">
        返回主頁
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-subtitle-2 font-weight-black text-grey-darken-4">
        Mobile 端作品展示
      </v-toolbar-title>
    </v-app-bar> -->

    <v-main>
      <v-container fluid class="pa-0">
        <!-- 確保讀取 public/image/mb.jpg，並且寬度永遠填滿螢幕 -->
        <v-img src="/image/mb.jpg" class="w-100" cover min-height="100vh"></v-img>
      </v-container>
    </v-main>
  </v-app>
</template>
