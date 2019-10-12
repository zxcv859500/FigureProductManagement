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
            <el-table :data="tableData">
                <el-table-column
                    prop="name"
                    label="상품 이름">
                </el-table-column>
                <el-table-column
                    prop="acceptPrice"
                    label="유찰 가격">
                </el-table-column>
                <el-table-column
                    prop="nickname"
                    label="위탁자">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="주소">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="번호">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="비고">
                </el-table-column>
            </el-table>
        </div>
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
                date: ''
            }
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
                let today;
                if (this.date === "") today = new Date().format('yyyy-MM-dd');
                else today = this.date.format('yyyy-MM-dd');
                this.$axios.post('/api/consignment/list', { date: today })
                    .then((res) => {
                        this.tableData = [];
                        res.data.forEach((ele) => {
                            const newData = {
                                name: ele.productName,
                                acceptPrice: ele.acceptPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','),
                                nickname: format('%s(%s)', ele.nickname, ele.name),
                                address: ele.address,
                                phone: ele.phone,
                                remark: ele.remark
                            };
                            console.log(newData);
                            this.tableData.push(newData);
                        })
                    })
            },
            priceMonitor() {
                this.form.acceptPrice = this.form.acceptPrice.replace(/,/gi, "");
                this.form.acceptPrice = this.form.acceptPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
    }
</script>

<style scoped>

</style>