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
            :data="tableData"
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
                date: ''
            }
        },
        mounted() {
            this.load();
        },
        methods: {
            load() {
                let startDate = new Date(),
                        finalDate = new Date();
                if (this.date !== '') {
                    startDate = this.date[0];
                    finalDate = this.date[1];
                }
                const row = {
                    startDate: startDate.toLocaleDateString(),
                    finalDate: finalDate.toLocaleDateString()
                };
                this.$axios.post('/api/sell/datelist', row)
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
                this.load();
            }
        }
    }
</script>

<style scoped>

</style>