<template>
    <div class="keep">
        <el-table
            :data="tableData"
            style="width: 100%"
            :border="true">
            <el-table-column
                type="expand">
                <template slot-scope="props">
                    <el-table
                        :data="props.row.products"
                        style="width: 100%">
                        <el-table-column
                            prop="number"
                            width="5px">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="상품명">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
                label="번호"
                sortable
                prop="number">
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
                label="주 소">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="번 호">
            </el-table-column>
            <el-table-column
                prop="remark"
                label="비 고">
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button @click="send(scope.row)" size="small">배송</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Keep",
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            loadRecipant() {
                this.$axios.post('/api/send/list', {today: undefined})
                    .then((res) => {
                        this.tableData = [];
                        let count = 1;
                        console.log(res.data);
                        res.data.forEach((ele) => {
                            const newData = {
                                number: count,
                                recipantId: ele.recipantId,
                                nickname: ele.nickname,
                                name: ele.name,
                                address: ele.address,
                                phone: ele.phone,
                                remark: ele.remark,
                                products: []
                            };
                            count++;
                            this.tableData.push(newData);
                        });

                        this.tableData.forEach((ele) => {
                            this.getProps(ele);
                        })
                    });
            },
            getProps(row) {
                this.$axios.post('/api/send/props', { today: undefined, recipantId: row.recipantId })
                    .then((res) => {
                        let count = 1;
                        res.data.forEach((ele) => {
                            const newData = {
                                number: count,
                                sellId: ele.sellId,
                                name: ele.name
                            };
                            count++;
                            row.products.push(newData);
                        });
                    });
            },

            send(row) {
                Promise.all([
                    row.products.forEach((ele) => {
                        this.$axios.post('/api/sell/send', ele)
                    })
                ])
                    .then(() => {
                        this.loadRecipant();
                    })
            }
        },
        mounted() {
            this.loadRecipant();
        }
    }
</script>

<style scoped>

</style>