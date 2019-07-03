<template>
    <div class="form">
        <el-form ref="form" :model="form" label-width="120px">
            <el-col :span="11">
                <el-form-item label="닉네임">
                    <el-input
                         v-model="form.nickname">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="이 름">
                    <el-input
                        v-model="form.name">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="배송지">
                    <el-input
                        v-model="form.address">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="번 호">
                    <el-input
                        v-model="form.phone">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="비 고">
                    <el-input
                        v-model="form.remark">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="20">
                <strong style="visibility: hidden">1</strong>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="onClick">확인</el-button>
            </el-col>
        </el-form>
        <el-table
            :data="tableData"
            :border="true">
            <el-table-column
                prop="count"
                label="번호"
                column-key="count">
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="닉네임"
                column-key="nickname">
            </el-table-column>
            <el-table-column
                prop="name"
                label="이름"
                column-key="name">
            </el-table-column>
            <el-table-column
                prop="address"
                label="배송지"
                column-key="address"
                resizable>
            </el-table-column>
            <el-table-column
                prop="phone"
                label="번 호"
                column-key="phone">
            </el-table-column>
            <el-table-column
                prop="remark"
                label="비 고"
                column-key="remark">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "recipant.vue",
        data() {
            return {
                form: {
                    nickname: '',
                    name: '',
                    address: '',
                    phone: '',
                    remark: ''
                },
                tableData: []
            }
        },
        methods: {
            load() {
                this.$axios.get('/api/recipant/list')
                    .then((res) => {
                        this.tableData = [];
                        let count = 1;
                        res.data.forEach((element) => {
                            const newData = {
                                count: count,
                                id: element.recipantId,
                                nickname: element.nickname,
                                name: element.name,
                                address: element.address,
                                phone: element.phone,
                                remark: element.remark
                            };
                            count++;
                            this.tableData.push(newData);
                        })
                        this.tableData = this.tableData.reverse();
                    })
            },
            onClick() {
                this.$axios.post('/api/recipant/insert', this.form)
                    .then((res) => {
                        this.tableData = [];
                        let count = 1;
                        res.data.forEach((element) => {
                            const newData = {
                                count: count,
                                id: element.id,
                                nickname: element.nickname,
                                name: element.name,
                                address: element.address,
                                phone: element.phone,
                                remark: element.remark
                            };
                            count++;
                            this.tableData.push(newData);
                        });
                        this.tableData = this.tableData.reverse();
                        this.$message({
                            message: "수령인 등록에 성공했습니다.",
                            type: 'success'
                        });
                        this.form.nickname = '';
                        this.form.name = '';
                        this.form.address = '';
                        this.form.phone = '';
                        this.form.remark = '';
                    })
                    .catch((err) => {
                        this.$message.error("등록에 실패했습니다. " + err);
                    })
            }
        },
        mounted() {
            this.load();
        }
    }
</script>

<style>
    .el-button {
        margin-bottom: 10px;
    }
</style>