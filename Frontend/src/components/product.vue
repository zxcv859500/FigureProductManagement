<template>
    <div class="product">
        <div class="sum-price">
            합산 가격 : {{ sumPrice }}
        </div>
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
                prop="stockPrice"
                label="총 단가"
                column-key="stockPrice">
            </el-table-column>
            <el-table-column
                prop="stock"
                label="개수"
                column-key="price"
                sortable>
            </el-table-column>
            <el-table-column
                prop="price"
                label="단가"
                column-key="price">
            </el-table-column>
            <el-table-column
                align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                        v-model="search"
                        size="mini"
                        placeholder="Type to search"
                        v-on:keydown.native="keyMonitor"></el-input>
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
                search: '',
                sumPrice: 0,
                enterPressed: false
            }
        },
        mounted() {
            this.load();
        },
        methods: {
            handleDelete(index, row) {
                const data = {
                    id: row.id
                };
                this.$axios.post('/api/product/delete', data)
                    .then(() => {
                        this.load();
                        this.$message({
                            message: "정상적으로 삭제되었습니다.",
                            type: 'success'
                        })
                    })
                    .catch((err) => {
                        this.$message.error("삭제에 실패했습니다. ", err);
                    })
            },
            load() {
                this.sumPrice = 0;
                this.$axios.get('/api/list')
                    .then((res) => {
                        this.tableData = [];
                        res.data.forEach((element) => {
                            const newData = {
                                productId: element.productId,
                                name: element.name,
                                barcode: element.barcode,
                                price: element.price,
                                stock: element.stock,
                                stockPrice: element.stockPrice
                            };
                            this.sumPrice += newData.stockPrice;
                            if (!isNaN(newData.price)) {
                                newData.price = newData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            }
                            if (!isNaN(newData.stockPrice)) {
                                newData.stockPrice = newData.stockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            }
                            this.tableData.push(newData);
                        })
                        this.sumPrice = this.sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            keyMonitor() {
                if (this.enterPressed) {
                    this.search = '';
                    this.enterPressed = false;
                }
                if (event.key === "Enter") {
                    this.enterPressed = true;
                }
            }
        }
    }
</script>

<style scoped>
    .sum-price {
        color: red;
    }
</style>