<template>
    <div class="sell-history">
        <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            @change="onChange">
        </el-date-picker>
        <el-table
            :data="showData"
            :default-sort = "{ prop: 'date', order: 'descending' }">
            <el-table-column
                prop="date"
                label="날짜"
                sortable
                column-key="date">
            </el-table-column>
            <el-table-column
                prop="name"
                label="이름"
                column-key="name">
            </el-table-column>
            <el-table-column
                prop="actualPrice"
                label="실판매가"
                column-key="actualPrice">
            </el-table-column>
            <el-table-column
                prop="barcode"
                label="바코드"
                column-key="barcode">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "sell",
        data() {
            return {
                tableData: [],
                date: '',
                compareDate: [],
                showData: []
            }
        },
        mounted() {
            this.compareDate[0] = Date.parse(new Date().toLocaleDateString());
            this.compareDate[1] = this.compareDate[0] + 32400000;
            this.load();
            this.showData = this.tableData.filter(data => !this.compareDate || (Date.parse(data.date) >= this.compareDate[0] && Date.parse(data.date) <= this.compareDate[1]))
        },
        methods: {
            load() {
                this.$axios.get('/api/sell/list')
                    .then((res) => {
                        this.tableData = [];
                        res.data.forEach((element) => {
                            const newData = {
                                date: element.date,
                                name: element.name,
                                barcode: element.barcode,
                                actualPrice: element.actualPrice
                            };
                            if (!isNaN(newData.actualPrice)) {
                                newData.actualPrice = newData.actualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            }
                            this.tableData.push(newData);
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            onChange() {
                this.compareDate[0] = Date.parse(this.date[0].toLocaleDateString());
                this.compareDate[1] = Date.parse(this.date[1].toLocaleDateString()) + 32400000;
                this.showData = this.tableData.filter(data => !this.compareDate || (Date.parse(data.date) >= this.compareDate[0] && Date.parse(data.date) <= this.compareDate[1]))
            }
        }
    }
</script>

<style scoped>

</style>