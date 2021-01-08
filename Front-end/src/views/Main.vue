<template>
  <Layout>
    <Card>
      <h1 class="text-2xl font-bold mb-2 sm:mb-5 p-2 sm:p-0 pb-0">
        NFL Postseason Stat Leaders
      </h1>
      <Loading v-if="!loading" />
      <Table
        v-else
        :title="tableTitle"
        :headers="tableHeaders"
        :items="tableItems"
      />
    </Card>
  </Layout>
</template>

<script>
import { onMounted, ref } from "vue";
import store from "../store";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers(store, "player");

import Layout from "@/components/Layout/Layout";
import Card from "@/components/Card/Card";
import Table from "@/components/Table/Table";
import Loading from "@/components/Loading/Loading";

export default {
  components: {
    Layout,
    Card,
    Table,
    Loading,
  },
  setup() {
    const { getPlaygers } = useActions(["getPlaygers"]);
    const loading = ref(false);
    const tableTitle = ref("Players Leaderboard");
    const tableHeaders = ref([
      {
        text: "Player",
        value: "player",
      },
      {
        text: "drive",
        value: "drive",
      },
      {
        text: "grit",
        value: "grit",
      },
      {
        text: "composure",
        value: "composure",
      },
    ]);
    const tableItems = ref([]);
    const filterOutData = (data) => {
      const filteredData = [];
      data.profile.forEach((player, i) => {
        filteredData.push({
          player: {
            name: data.tap[i].playeremail,
            img: data.tap[i].athletetypeprimary.toLowerCase(),
            row: i + 1,
          },
          drive: data.tap[i].drive,
          grit: data.tap[i].grit,
          composure: data.tap[i].composure,
        });
      });
      tableItems.value = filteredData;
    };

    onMounted(async () => {
      const data = await getPlaygers();
      console.log("data", data);
      filterOutData(data);
      loading.value = true;
    });

    return {
      getPlaygers,
      loading,
      tableTitle,
      tableHeaders,
      tableItems,
      filterOutData,
    };
  },
};
</script>
