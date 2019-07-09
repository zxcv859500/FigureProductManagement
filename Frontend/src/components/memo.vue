<template>
    <div class="memo">
        <el-form :model="form" label-width="120px">
            <el-col :span="6">
                <el-form-item label="제 목">
                    <el-input
                        v-model="form.title">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="16">
                <el-form-item label="내 용">
                    <el-input
                        type="textarea"
                        :rows="2"
                        v-model="form.content"></el-input>
                </el-form-item>
            </el-col>
            <el-col :offset="21">
                <el-button
                        type="success"
                        @click="onEnter">확인</el-button>
            </el-col>
        </el-form>
        <el-table
            :data="tableData"
            style="width: 100%"
            :border="true">
            <el-table-column
                prop="memoId"
                label="번 호">
            </el-table-column>
            <el-table-column
                prop="title"
                label="제 목">
            </el-table-column>
            <el-table-column
                prop="content"
                label="내 용">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "memo",
        data() {
            return {
                form: {
                    title: '',
                    content: ''
                },
                tableData: []
            }
        },
        methods: {
            onEnter() {
                this.$axios.post('/api/memo/insert', this.form)
                    .then((result) => {
                        this.$message({
                            message: "등록 성공",
                            type: "success"
                        });
                        this.load();
                    })
                    .catch((err) => {
                        this.$message.error("등록 실패 " + err);
                    })
            },
            load() {
                this.$axios.get('/api/memo/list')
                    .then((result) => {
                        this.tableData = [];
                        result.data.forEach((element) => {
                            const newData = {
                                memoId: element.memoId,
                                title: element.title,
                                content: element.content
                            };
                            this.tableData.push(newData);
                        });
                        this.tableData = this.tableData.reverse();
                    })
            }
        }
    }
</script>

<style scoped>

</style>