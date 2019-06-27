<template>
    <div class="product">
        <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())
            || data.barcode.includes(search.toLowerCase()))"
            :default-sort = "{ prop: 'name', order: 'descending' }">
            <el-table-column
                prop="name"
                label="제품 이름"
                column-key="name">
            </el-table-column>
            <el-table-column
                prop="barcode"
                label="바코드"
                column-key="barcode">
            </el-table-column>
            <el-table-column
                prop="price"
                label="단가"
                column-key="price">
            </el-table-column>
            <el-table-column
                prop="stock"
                label="개수"
                column-key="price"
                sortable>
            </el-table-column>
            <el-table-column
                prop="stockPrice"
                label="총 단가"
                column-key="stockPrice">
            </el-table-column>
            <el-table-column
                align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                        v-model="search"
                        size="mini"
                        placeholder="Type to search"></el-input>
                </template>
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "product",
        data() {
            return {
                tableData: [],
                search: ''
            }
        },
        mounted() {
            this.$axios.get('/api/list')
                .then((res) => {
                    this.tableData = [];
                    res.data.forEach((element) => {
                        const newData = {
                            name: element.name,
                            barcode: element.barcode,
                            price: element.price,
                            stock: element.stock,
                            stockPrice: element.stockPrice
                        };
                        if (!isNaN(newData.price)) {
                            newData.price = newData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        }
                        if (!isNaN(newData.stockPrice)) {
                            newData.stockPrice = newData.stockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        }
                        this.tableData.push(newData);
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        methods: {
            handleDelete(index, row) {

            }
        }
    }
</script>

<style scoped>

</style>