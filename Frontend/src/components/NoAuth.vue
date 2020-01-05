<template>
    <div>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="5">권한이 없습니다.</el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="4">
                <el-button
                type="primary" 
                @click="onClick">
                확인
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import bus from '../bus';

export default {
    name: 'NoAuth',
    methods: {
        onClick() {
            this.$router.push('/');
        }
    },
    created() {
        bus.$emit('no-show');
    }
}
</script>

<style>
    .el-row {
        margin-top: 1rem;
    }
</style>