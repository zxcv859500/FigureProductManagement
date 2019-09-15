<template>
    <div class="sell-history">
        <el-form :model="form" label-width="120px">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="바코드 번호">
                        <el-input v-model="form.barcode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="실 판매가">
                        <el-input
                                v-model="form.actualPrice"
                                @keyup.native="actualPriceMonitor"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="구매자">
                        <el-select v-model="form.recipant" filterable placholder="Search and select">
                            <el-option
                                    v-for="item in recipants"
                                    :key="item.nickname"
                                    :label="item.nickname"
                                    :value="item.nickname">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="판매 날짜">
                        <el-date-picker
                            v-model="form.date"
                            type="date"
                            placeholder="Pick a day">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="end">
                <el-col :span="4">
                    <el-button type="success" @click="onEdit">수정</el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-col :span="22">
            <div class="sum-price">
                실제 합산 가격: {{ sumPrice }}
            </div>
        </el-col>
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
                prop="price"
                label="단 가"
                column-key="price">
            </el-table-column>
            <el-table-column
                prop="barcode"
                label="바코드"
                column-key="barcode">
            </el-table-column>
            <el-table-column
                    prop="recipant"
                    label="구매자"
                    column-key="recipant">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="Operations"
                    width="120">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">Edit</el-button>
                    <el-button @click="handleDelete(scope.row)" type="text" size="small">Delete</el-button>
                </template>
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
                showData: [],
                form: {
                    sellId: 0,
                    barcode: '',
                    actualPrice: '',
                    recipant: '',
                    date: ''
                },
                recipants: []
            }
        },
        mounted() {
            this.$axios.get('/api/recipant/list')
                .then((res) => {
                    res.data.forEach((element) => {
                        const recipant = {
                            nickname: element.nickname,
                            recipantId: element.recipantId
                        };
                        this.recipants.push(recipant);
                    })
                });
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
                                sellId: element.sellId,
                                date: element.date,
                                name: element.productName,
                                barcode: element.barcode,
                                actualPrice: element.actualPrice,
                                price: element.price,
                                recipant: element.nickname + '(' + element.name + ')'
                            };
                            if (!isNaN(newData.actualPrice)) {
                                newData.actualPrice = newData.actualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            }
                            if (!isNaN(newData.price)) {
                                newData.price = newData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            }
                            if (newData.actualPrice === '0') {
                                newData.actualPrice = "경품";
                            }
                            this.tableData.push(newData);
                        })
                        this.onChange();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            onChange() {
                this.compareDate[0] = Date.parse(this.date[0].toLocaleDateString());
                this.compareDate[1] = Date.parse(this.date[1].toLocaleDateString()) + 32400000;
                this.showData = this.tableData.filter(data => !this.compareDate || (Date.parse(data.date) >= this.compareDate[0] && Date.parse(data.date) <= this.compareDate[1]))
            },
            handleEdit(row) {
                this.form = {
                    sellId: row.sellId,
                    barcode: row.barcode,
                    actualPrice: row.actualPrice,
                    recipant: row.recipant.split('(')[0],
                    date: row.date
                };
                window.scrollTo(0, 0);
            },
            onEdit() {
                this.$axios.post('/api/sell/update', this.form)
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
            handleDelete(row) {
                this.$confirm("삭제 확인", "Warning", {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    const data = {
                        sellId: row.sellId
                    };
                    this.$axios.post('/api/sell/delete', data)
                        .then(() => {
                            /*
                            this.$message({
                                message: "삭제 성공",
                                type: "success"
                            });
                             */
                            this.load();
                        })
                        .catch((err) => {
                            this.$message.error("삭제 실패 " + err);
                        })
                })
            },
            actualPriceMonitor(evt) {
                this.form.actualPrice = this.form.actualPrice.replace(/,/gi, "");
                this.form.actualPrice = this.form.actualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        computed: {
            sumPrice: function() {
                let result = 0;
                this.showData.forEach((element) => {
                    const price = Number(element.actualPrice.replace(/,/gi, ""));
                    if (!isNaN(price))
                        result += price;
                });
                return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        }
    }
</script>

<style scoped>
    .sum-price {
        color: red;
        margin-bottom: 20px;
    }
</style>