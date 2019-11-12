<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="10">
                <el-input
                    placeholder="아이디"
                    v-model=ID
                    clearable>
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="10">
                <el-input
                    placeholder="비밀번호"
                    v-model=PW
                    show-password>
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-button
                type="primary" 
                @click="onClick">
                로그인
            </el-button>
        </el-row>
    </div>
</template>

<script>
import bus from '../bus'

export default {
    name: 'Login',
    data() {
        return {
            ID: '',
            PW: ''
        }
    },
    methods: {
        onClick() {
            this.$axios.post('api/user/login', {
                userId: this.ID,
                userPw: this.PW
            }).then((res) => {
                console.log(res.data.token);
                if (res.data.status === 'success') {
                    this.$store.commit('setToken', res.data.token);
                    bus.$emit('show');
                    // home으로 이동
                    this.$router.push('/home');
                }
            });
        }
    }
}
</script>

<style scoped>
    .el-row {
        margin: 1rem auto;
    }
</style>