<template>
    <div class="consignment">
        <div class="form">
            <el-form ref="form" :model="form" label-width="120px">
                <el-col :span="11">
                    <el-form-item label="상품 이름">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="유찰 가격">
                        <el-input
                                v-model="form.acceptPrice"
                                @keyup.native="priceMonitor"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="위탁자">
                        <el-select v-model="form.nickname" filterable placeholder="Search and select">
                            <el-option
                                v-for="item in recipants"
                                :key="item.nickname"
                                :label="item.nickname"
                                :value="item.nickname">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form>
            <el-col :offset="20" :span="4">
                <el-button type="primary" @click="onClick">확인</el-button>
            </el-col>
        </div>
        <div class="consignment-list">
            <el-col :span="24">
                <el-date-picker
                    v-model="date"
                    type="date"
                    placeholder="Pick a day"
                    @change="loadConsignment">
                </el-date-picker>
            </el-col>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :border="true">
                <el-table-column
                    type="expand">
                    <template slot-scope="props">
                        <el-table
                            :data="props.row.child"
                            style="width: 100%">
                            <el-table-column
                                prop="number"
                                width="30">
                            </el-table-column>
                            <el-table-column
                                    prop="date"
                                    label="날짜">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="상품 이름">
                            </el-table-column>
                            <el-table-column
                                prop="acceptPrice"
                                label="유찰 가격">
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            v-if="scope.row.sold === 0"
                                            @click="sellDialog(props.row, scope.row)">판매</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="number"
                    width="30">
                </el-table-column>
                <el-table-column
                    prop="nickname"
                    label="위탁자">
                </el-table-column>
                <el-table-column
                    prop="totalPrice"
                    label="입금 금액">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="번호">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="비고">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="deposit(scope.row)">입금</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-col :span="5">
            <el-dialog title="판매" :visible.sync="dialogFormVisible">
                <el-form :model="sellForm">
                    <el-col :span="24">
                        <el-form-item label="구매자">
                            <el-col :span="12">
                                <el-select v-model="sellForm.buyer" filterable placeholder="Search and select">
                                    <el-option
                                            v-for="item in recipants"
                                            :key="item.nickname"
                                            :label="item.nickname"
                                            :value="item.nickname">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="판매가">
                            <el-col :span="6">
                                <el-input v-model="sellForm.sellPrice"
                                          @keyup.native="priceMonitor"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible=false">취소</el-button>
                    <el-button type="primary" @click="sell()">확인</el-button>
                </span>
            </el-dialog>
        </el-col>
    </div>
</template>

<script>
    const { format } = require('util');
    export default {
        name: "consignment",
        data() {
            return {
                form: {
                    name: '',
                    acceptPrice: '',
                    nickname: ''
                },
                recipants: [],
                tableData: [],
                date: '',
                dialogFormVisible: false,
                sellForm: {
                    consignmentId: '',
                    name: '',
                    acceptPrice: '',
                    nickname: '',
                    sellPrice: '',
                    buyer: ''
                }
            }
        },
        created() {
            let token = this.$store.getters.getToken
            this.$axios.post('api/user/auth', {
                token
            }).then((res) => {
                if (res.data.status === 'fail') {
                    this.$router.push('/no-auth');
                }
            });
        },
        mounted() {
            this.$axios.get('/api/recipant/list')
                .then((res) => {
                    res.data.forEach((element) => {
                        const recipant = {
                            recipantId: element.recipantId,
                            nickname: element.nickname
                        };
                        this.recipants.push(recipant);
                    })
                });

            Date.prototype.format = function (f) {
                if (!this.valueOf()) return " ";
                var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
                var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
                var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                var d = this;
                return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
                    switch ($1) {
                        case "yyyy": return d.getFullYear(); // 년 (4자리)
                        case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
                        case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
                        case "dd": return d.getDate().zf(2); // 일 (2자리)
                        case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
                        case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
                        case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
                        case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
                        case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
                        case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
                        case "mm": return d.getMinutes().zf(2); // 분 (2자리)
                        case "ss": return d.getSeconds().zf(2); // 초 (2자리)
                        case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
                        default: return $1;
                    }
                });
            };
            String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
            String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
            Number.prototype.zf = function (len) { return this.toString().zf(len); };

            this.loadConsignment();
        },
        methods: {
            onClick() {
                if (this.form.recipant === '') {
                    this.$message.error("구매자를 선택해주세요.");
                    return null;
                }

                this.$axios.post('/api/consignment/insert', this.form)
                    .then(() => {
                        this.loadConsignment();

                        this.form = {
                            name: '',
                            price: '',
                            nickname: ''
                        }
                    })
            },
            loadConsignment() {
                // TODO: 팔린 것이면 목록에서 제외되게
                let today;
                if (this.date === "") today = "";
                else today = this.date.format('yyyy-MM-dd');
                this.$axios.post('/api/consignment/list', { date: today })
                    .then((res) => {
                        this.tableData = [];
                        let count = 1;
                        res.data.forEach((ele) => {
                            const newData = {
                                number: count,
                                recipantId: ele.recipantId,
                                nickname: format('%s(%s)', ele.nickname, ele.name),
                                phone: ele.phone,
                                remark: ele.remark,
                                totalPrice: 0
                            };
                            this.tableData.push(newData);
                            count++;
                        });

                        this.tableData.forEach((ele) => {
                           this.getProps(ele);
                        })
                    })
            },
            priceMonitor() {
                this.form.acceptPrice = this.form.acceptPrice.replace(/,/gi, "");
                this.form.acceptPrice = this.form.acceptPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.sellForm.sellPrice = this.sellForm.sellPrice.replace(/,/gi, "");
                this.sellForm.sellPrice = this.sellForm.sellPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            sellDialog(parent, child) {
                this.dialogFormVisible=true;
                this.sellForm.consignmentId = child.consignmentId;
                this.sellForm.name = child.name;
                this.sellForm.acceptPrice = parent.acceptPrice;
                this.sellForm.nickname = parent.nickname.split('(')[0];
            },
            sell() {
                this.dialogFormVisible=false;
                this.$axios.post('/api/consignment/sell', this.sellForm)
                    .then(() => {
                        this.sellForm.buyer = '';
                        this.sellForm.sellPrice = '';
                        this.loadConsignment();
                    })
            },
            getProps(row) {
                let today = undefined;
                if (this.date !== "") today = new Date().format('yyyy-MM-dd');
                this.$axios.post('/api/consignment/child', { date: today, recipantId: row.recipantId })
                    .then((res) => {
                        let count = 1;
                        row.child = [];
                        res.data.forEach((ele) => {
                            const newData = {
                                number: count,
                                consignmentId: ele.consignmentId,
                                date: ele.date,
                                name: ele.name,
                                acceptPrice: ele.acceptPrice,
                                sold: ele.sold
                            };
                            newData.acceptPrice = newData.acceptPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            row.child.push(newData);
                        });
                    });

                this.$axios.post('/api/consignment/actualPrice', { date: today, recipantId: row.recipantId })
                    .then((res) => {
                        let totalPrice = 0;
                        res.data.forEach((ele) => {
                            totalPrice += ele.deposit;
                        });
                        totalPrice = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        row.totalPrice = totalPrice;
                    })
            },
            deposit(row) {
                let today = undefined;
                if (this.date !== "") today = new Date().format('yyyy-MM-dd');
                this.$axios.post('/api/consignment/deposit', { date: today, recipantId: row.recipantId })
                    .then(() => {
                        this.loadConsignment();
                    })
            }
        }
    }
</script>

<style scoped>

</style>