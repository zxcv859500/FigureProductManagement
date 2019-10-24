<template>
    <div class="send">
        <el-col :span="8">
            <el-date-picker
                    v-model="date"
                    type="date"
                    placeholder="Pick a day"
                    @change="loadRecipant">
            </el-date-picker>
        </el-col>
        <el-col :span="16">
            <div id="total-rest-price">
                <span style="color:red">총 잔여금: {{ totalRestPriceShow }}</span>
            </div>
        </el-col>
        <el-table
            :data="tableData"
            style="width: 100%"
            :border="true"
            @expand-change="getProps"
            :row-class-name="recipantClass">
            <el-table-column
                    type="expand">
                <template slot-scope="props">
                    <el-col :span="11">
                        <el-table
                            :data="props.row.data.auction"
                            style="width: 100%"
                            :row-class-name="auctionClass">
                                <el-table-column
                                    prop="date"
                                    label="날 짜">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="상품명">
                                </el-table-column>
                                <el-table-column
                                    prop="actualPrice"
                                    label="판매가">
                                </el-table-column>
                                <el-table-column
                                        label="Operations"
                                        width="120">
                                    <template slot-scope="scope">
                                        <el-button @click="handleDeposit(scope.row)" type="text" size="small">입금</el-button>
                                        <el-button @click="handleCancel(scope.row)" type="text" size="small">취소</el-button>
                                    </template>
                                </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="11">
                        <el-table
                            :data="props.row.data.prize"
                            style="width: 100%"
                            row-class-name="row-prize">
                                <el-table-column
                                        prop="date"
                                        label="날 짜">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="상품명">
                                </el-table-column>
                                <el-table-column
                                        prop="actualPrice"
                                        label="판매가">
                                </el-table-column>
                        </el-table>
                    </el-col>
                </template>
            </el-table-column>
            <el-table-column
                label="번호"
                sortable
                @sort-method="sortBy">
                <template slot-scope="scope">
                    {{ scope.row.id }} <br>
                    <span style="color:blue">{{ scope.row.totalPrice }}</span> <br>
                    <span style="color:red">(잔액 : {{ scope.row.restPrice }})</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="닉네임">
            </el-table-column>
            <el-table-column
                prop="name"
                label="이 름">
            </el-table-column>
            <el-table-column
                prop="address"
                label="주 소"
                resizable>
            </el-table-column>
            <el-table-column
                prop="phone"
                label="번 호">
            </el-table-column>
            <el-table-column
                prop="remark"
                label="비 고">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button @click="keep(scope.row)" size="small">보관</el-button>
                    <el-button @click="handleEdit(scope.row)" size="small">수정</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "send",
        data() {
            return {
                tableData: [],
                date: '',
                totalRestPrice: 0
            }
        },
        methods: {
            loadRecipant() {
                let today;
                if (this.date === "") today = new Date().format('yyyy-MM-dd');
                else today = this.date.format('yyyy-MM-dd');
                this.$axios.post('/api/send/list', { today: today })
                    .then((res) => {
                        this.tableData = [];
                        this.totalRestPrice = 0;
                        let count = 1;
                        res.data.forEach((ele) => {
                            const newData = {
                                id: count,
                                recipantId: ele.recipantId,
                                nickname: ele.nickname,
                                name: ele.name,
                                address: ele.address,
                                phone: ele.phone,
                                remark: ele.remark,
                                totalPrice: '',
                                restPrice: '',
                                data: {
                                    auction: [],
                                    prize: []
                                }
                            };
                            count++;
                            this.tableData.push(newData);
                        });

                        this.tableData.forEach(element => {
                            this.getProps(element);
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            getProps(row) {
                let today;
                if (this.date === "") today = new Date().format('yyyy-MM-dd');
                else today = this.date.format('yyyy-MM-dd');
                this.$axios.post('/api/send/props', { today: today, recipantId: row.recipantId })
                    .then((res) => {
                        row.data.auction = [];
                        row.data.prize = [];
                        let totalPrice = 0;
                        let restPrice = 0;
                        res.data.forEach((ele) => {
                            const newData = {
                                sellId: ele.sellId,
                                date: ele.date,
                                name: ele.name,
                                actualPrice: ele.actualPrice,
                                deposit: ele.deposit
                            };
                            if (newData.actualPrice === 0) {
                                newData.actualPrice = "경품";
                                row.data.prize.push(newData);
                            } else {
                                if (newData.deposit === 0)
                                    restPrice += newData.actualPrice;
                                totalPrice += newData.actualPrice;
                                newData.actualPrice = newData.actualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                row.data.auction.push(newData);
                            }
                        });
                        this.totalRestPrice += restPrice;
                        totalPrice = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
                        restPrice = restPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
                        row.totalPrice = '(합계 : ' + totalPrice + ')';
                        row.restPrice = restPrice;
                    })
            },
            sortBy(a, b) {
                if (a.id > b.id) return 1;
                else if (a.id < b.id) return -1;
                else return 0;
            },
            handleDeposit(row) {
                const data = {
                    sellId: row.sellId
                };
                this.$axios.post('/api/send/deposit', data)
                    .then(() => {
                        /*
                        this.$message({
                            message: "입금 완료",
                            type: "success"
                        });
                        */
                        this.tableData.forEach(element => {
                            this.getProps(element);
                        });
                    })
                    .catch((err) => {
                        this.$message.error("입금 실패 " + err);
                    })
            },
            handleCancel(row) {
                const data = {
                    sellId: row.sellId
                };
                this.$axios.post('/api/send/cancel', data)
                    .then(() => {
                        /*
                        this.$message({
                            message: "취소 완료",
                            type: "success"
                        });
                        */
                        this.tableData.forEach(element => {
                            this.getProps(element);
                        })
                    })
                    .catch((err) => {
                        this.$message.error("취소 실패 " + err);
                    })
            },
            handleEdit(row) {
                this.$prompt('수정할 내용을 입력해주세요.', '비고 수정', {
                    confirmButtonText: '확인',
                    cancelButtonText: "취소",
                }).then(({ value }) => {
                    const form = {
                        recipantId: row.recipantId,
                        nickname: row.nickname,
                        name: row.name,
                        address: row.address,
                        phone: row.phone,
                        remark: value
                    };

                    this.$axios.post('/api/recipant/insert', form)
                        .then(() => {
                            /*
                            this.$message({
                                message: "수정 완료",
                                type: "success"
                            });
                             */
                            this.loadRecipant();
                        })
                        .catch((err) => {
                            this.$message.error("수정 실패");
                            console.log(err);
                        })
                })
            },
            auctionClass({row}) {
                if (row.deposit === 0) {
                    return 'row-auction';
                } else {
                    return 'row-auctipn-deposit'
                }
            },
            recipantClass({row}) {
                if (row.restPrice === '(잔액 : 0)') {
                    return 'row-recipant-success'
                }
            },
            keep(row) {
                Promise.all([
                    row.data.auction.forEach((ele) => {
                        this.$axios.post('/api/sell/keep', ele)
                    }),
                    row.data.prize.forEach((ele) => {
                        this.$axios.post('/api/sell/keep', ele)
                    })
                ])
                    .then(() => {
                        const h = this.$createElement;

                        this.$notify({
                            title: "알림",
                            message: h('i', { style: 'color: teal' }, '보관 완료')
                        })
                    })
            }
        },
        mounted() {
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
            this.loadRecipant();
        },
        computed: {
            totalRestPriceShow: function(value) {
                let total = 0;

                this.tableData.forEach((element) => {
                    total += Number(element.restPrice.replace(/,/gi, ''));
                });

                return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
            }
        }
    }
</script>

<style>
    .el-date-editor {
        margin-bottom: 15px;
    }
    .el-table .row-auction {
        background: oldlace;
    }
    .el-table .row-prize {
        background: #f0f9eb;
    }
    .el-table .row-auction-deposit {
        background: #f0f9eb;
    }
</style>