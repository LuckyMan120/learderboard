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
import { mapActions } from 'vuex'

import Layout from '@/components/Layout/Layout'
import Card from '@/components/Card/Card'
import Table from '@/components/Table/Table'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'Main',
  components: {
    Layout,
    Card,
    Table,
    Loading,
  },
  data: () => ({
    loading: false,
    tableTitle: 'Players Leaderboard',
    tableHeaders: [
      {
        text: 'Player',
        value: 'player',
      },
      {
        text: 'drive',
        value: 'drive',
      },
      {
        text: 'grit',
        value: 'grit',
      },
      {
        text: 'composure',
        value: 'composure',
      },
    ],
    tableItems: [],
  }),
  methods: {
    ...mapActions({
      getUsers: 'player/getPlaygers',
    }),
    filterOutData(data) {
      const filteredData = []
      console.log('THI IS DATA', data)
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
        })
      })

      this.tableItems = filteredData
    },
  },
  async mounted() {
    const data = await this.getUsers()
    this.filterOutData(data)
    this.loading = true
  },
}
</script>
