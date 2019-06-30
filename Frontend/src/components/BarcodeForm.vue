<template>
    <div class="form">
        <el-form ref="form" :model="form" label-width="120px">
            <el-col :span="11">
                <el-form-item label="바코드 번호">
                    <el-input
                            ref="barcode"
                            v-model="form.barcode"
                            @keyup.enter.native="getInformation"
                            @focus="onFocus()"
                            @blur="focused--"
                            v-on:keydown.native="keyMonitor"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="상품 이름">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="재고 금액">
                    <el-input v-model="form.stockPrice"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="단 가">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="재 고">
                    <el-input v-model=  "form.stock"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="판매 가격" v-if="mode">
                    <el-input
                            v-model="form.actualPrice"
                            @keyup.native="actualPriceMonitor"
                            @keyup.enter.native="onClick"></el-input>
                </el-form-item>
            </el-col>
        </el-form>
        <el-col :span="20">
            <el-switch
                    v-model="mode"
                    active-text="판매"
                    inactive-text="수정">
            </el-switch>
        </el-col>
        <el-col :span="3">
            <el-button type="primary" @click="onClick">확인</el-button>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "BarcodeForm",
        mounted() {
        },
        data() {
            return {
                form: {
                    barcode: '',
                    name: '',
                    stockPrice: '',
                    price: '',
                    stock: '',
                    actualPrice: ''
                },
                mode: true,
                enterPressed: false,
                focused: 0
            }
        },
        methods: {
            onFocus() {
                this.$refs.barcode.focus();
            },
            onClick() {
                if (this.mode) {
                    this.$axios.post('/api/sell', this.form)
                        .then((response) => {
                            this.form.name = response.data.name;
                            this.form.stockPrice = response.data.stockPrice;
                            this.form.price = response.data.price;
                            this.form.stock = response.data.stock;
                            if (!isNaN(this.form.price)) {
                                this.form.price = this.form.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            if (!isNaN(this.form.stockPrice)) {
                                this.form.stockPrice = this.form.stockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            this.$message({
                                message: "정상적으로 판매되었습니다.",
                                type: 'success'
                            });
                            this.form.actualPrice = '';
                        })
                        .catch((err) => {
                            this.$message.error("판매에 실패했습니다. " + err);
                        });
                } else {
                    this.$axios.post('/api/update', this.form)
                        .then((response) => {
                            this.form.name = response.data.name;
                            this.form.stockPrice = response.data.stockPrice;
                            this.form.price = response.data.price;
                            this.form.stock = response.data.stock;
                            if (!isNaN(this.form.price)) {
                                this.form.price = this.form.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            if (!isNaN(this.form.stockPrice)) {
                                this.form.stockPrice = this.form.stockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            this.$message({
                                message: "정상적으로 수정되었습니다.",
                                type: 'success'
                            });
                            this.form.actualPrice = '';
                        })
                        .catch((err) => {
                            this.$message.error("수정에 실패했습니다." + err);
                        })
                }
            },
            keyMonitor(event) {
                    if (this.enterPressed) {
                        this.form.barcode = '';
                        this.enterPressed = false;
                    }
                    if (event.key === "Enter") {
                        this.enterPressed = true;
                    }
            },
            actualPriceMonitor(evt) {
                this.form.actualPrice = this.form.actualPrice.replace(/,/gi, "");
                this.form.actualPrice = this.form.actualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            getInformation() {
                if (this.mode === false) {
                    this.$axios.post('/api/add', this.form)
                        .then((response) => {
                            this.form.name = response.data.name;
                            this.form.stockPrice = response.data.stockPrice;
                            this.form.price = response.data.price;
                            this.form.stock = response.data.stock;

                            if (!isNaN(this.form.price)) {
                                this.form.price = this.form.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            if (!isNaN(this.form.stockPrice)) {
                                this.form.stockPrice = this.form.stockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        })
                }
                else {
                    this.$axios.post('/api/select', this.form)
                        .then((response) => {
                            this.form.name = response.data.name;
                            this.form.stockPrice = response.data.stockPrice;
                            this.form.price = response.data.price;
                            this.form.stock = response.data.stock;

                            if (!isNaN(this.form.price)) {
                                this.form.price = this.form.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            if (!isNaN(this.form.stockPrice)) {
                                this.form.stockPrice = this.form.stockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        })
                        .then((err) => {
                            console.log(err);
                        })
                }
            }
        }
    }
</script>

<style scoped>
</style>