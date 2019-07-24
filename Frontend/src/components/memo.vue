<template>
    <div class="memo">
        <el-form :model="form" label-width="120px">
            <el-col :span="22">
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
                label="번 호"
                width="50px">
            </el-table-column>
            <el-table-column
                label="날 짜"
                width="150px">
                <template slot-scope="scope">
                    {{ new Date(scope.row.date).toLocaleDateString() }}<br>{{ new Date(scope.row.date).toLocaleTimeString() }}
                </template>
            </el-table-column>
            <el-table-column
                prop="content"
                label="내 용">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="Operations"
                    width="120">
                <template slot-scope="scope">
                    <el-button @click="onDelete(scope.row)" type="text" size="small">Delete</el-button>
                </template>
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
                    content: ''
                },
                tableData: []
            }
        },
        methods: {
            onEnter() {
                this.$axios.post('/api/memo/insert', this.form)
                    .then((result) => {
                        /*
                        this.$message({
                            message: "등록 성공",
                            type: "success"
                        });
                         */
                        this.load();
                        this.form.content = '';
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
                                date: element.date,
                                content: element.content
                            };
                            //newData.date = new Date(Date.parse(newData.date) + 1000 * 60 * 60 * 7);
                            //newData.date = new Date(newData.date).toLocaleDateString() + '<br/>' +
                            //    new Date(newData.date).toLocaleTimeString();
                            this.tableData.push(newData);
                        });
                        this.tableData = this.tableData.reverse();
                    })
            },
            onDelete(row) {
                const data = {
                    memoId: row.memoId
                };
                this.$axios.post('/api/memo/delete', data)
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
            }
        },
        mounted() {
            this.load();
        }
    }
</script>

<style scoped>

</style>