<template>
    <nav class="nav" v-if="show">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="20">
                <el-menu
                        mode="horizontal"
                        background-color="#409EFF"
                        text-color="#fff"
                        active-text-color="#DCDFE6"
                        :router="true">
                    <el-menu-item index="home">판매/갱신</el-menu-item>
                    <el-menu-item index="product">제품 목록</el-menu-item>
                    <el-menu-item index="sell">판매 기록</el-menu-item>
                    <el-menu-item index="recipant">회원 목록</el-menu-item>
                    <el-menu-item index="send">배송</el-menu-item>
                    <el-menu-item index="memo">메모</el-menu-item>
                    <el-menu-item index="consignment">위탁</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </nav>
</template>

<script>
import bus from '../bus'

export default {
    name: "Nav",
    data() {
        return {
            show: false
        }
    },
    created() {
        bus.$on('show', () => {
            this.show = true;
        });
        bus.$on('no-show', () => {
            this.show = false;
        })
    }
}
</script>

<style scoped>

</style>