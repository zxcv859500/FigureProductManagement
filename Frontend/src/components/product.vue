<template>
    <div class="product">
        <el-form :model="form" label-width="120px">
            <el-col :span="11">
                <el-form-item label="바코드 번호">
                    <el-input
                        v-model="form.barcode">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="상품 이름">
                    <el-input v-model="form.name">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="재고 금액">
                    <el-input v-model="form.stockPrice">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="단 가">
                    <el-input v-model="form.price">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="재 고">
                    <el-input v-model="form.stock">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-form>
        <el-col :offset="22">
            <el-button
                    type="success"
                    @click="onEdit">수정</el-button>
        </el-col>
        <el-col :span="11">
            <div class="sum-price">
                합산 가격 : {{ sumPrice }}
            </div>
        </el-col>
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
                        ref="search"
                        size="mini"
                        placeholder="Type to search"
                        v-on:keydown.native="keyMonitor"></el-input>
                </template>
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">Edit</el-button>
                    <el-button
                        size="small"
                        type="text"
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
                enterPressed: false,
                form: {
                    productId: null,
                    barcode: null,
                    name: null,
                    stockPrice: null,
                    price: null,
                    stock: null
                }
            }
        },
        mounted() {
            this.load();
            this.$nextTick(() => this.$refs.search.focus());
        },
        methods: {
            handleDelete(index, row) {
                const data = {
                    id: row.id
                };
                this.$axios.post('/api/product/delete', data)
                    .then(() => {
                        this.load();
                        /*
                        this.$message({
                            message: "정상적으로 삭제되었습니다.",
                            type: 'success'
                        })
                         */
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
                        });
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
            },
            onEdit() {
                this.$axios.post('/api/product/update', this.form)
                    .then(() => {
                        /*
                        this.$message({
                            message: "수정 성공",
                            type: "success"
                        });
                        */
                        this.load();
                    })
                    .catch((err) => {
                        this.$message.error("수정 실패 " + err);
                    })
            },
            handleEdit(row) {
                this.form = {
                    productId: row.productId,
                    barcode: row.barcode,
                    name: row.name,
                    stock: row.stock,
                    price: row.price,
                    stockPrice: row.stockPrice
                };
                window.scrollTo(0, 0);
            }
        }
    }
</script>

<style scoped>
    .sum-price {
        color: red;
    }
</style>