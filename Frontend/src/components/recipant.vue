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
                <el-form-item label="계좌번호">
                    <el-input
                        v-model="form.account">
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
            :data="tableData">
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
                column-key="address">
            </el-table-column>
            <el-table-column
                prop="account"
                label="계좌번호"
                column-key="account">
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
                    account: ''
                },
                tableData: []
            }
        },
        methods: {
            load() {
                this.$axios.get('/api/recipant/list')
                    .then((res) => {
                        this.tableData = [];
                        res.data.forEach((element) => {
                            const newData = {
                                id: element.id,
                                nickname: element.nickname,
                                name: element.name,
                                address: element.address,
                                account: element.account
                            };
                            this.tableData.push(newData);
                        })
                    })
            }
        },
        mounted() {
            this.load();
        }
    }
</script>

<style scoped>

</style>