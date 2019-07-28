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
                    <el-form-item label="판매 가격">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="구매자">
                        <el-select v-model="form.recipant" filterable placeholder="Search and select">
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
                    label="제품 이름">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="판매 가격">
                </el-table-column>
                <el-table-column
                    prop="recipant"
                    label="구매자">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="주소">
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
    export default {
        name: "consignment",
        data() {
            return {
                form: {
                    name: '',
                    price: '',
                    recipant: ''
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
                            nickname: element.nickname,
                            recipantId: element.recipantId
                        };
                        this.recipants.push(recipant);
                    })
                })
        },
        methods: {
            onClick() {
                if (this.form.recipant === '') {
                    this.$message.error("구매자를 선택해주세요.");
                    return null;
                }
            },
            loadConsignment() {

            }
        }
    }
</script>

<style scoped>

</style>