<template>
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
</template>

<script>
    export default {
        name: "sell",
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
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
                        this.tableData.push(newData);
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
</script>

<style scoped>

</style>