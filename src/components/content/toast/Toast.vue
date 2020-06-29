<template>
    <div class="toast" v-show="isShow">
        <span>{{message}}</span>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        data(){
            return {
                isShow:false,
                message:''
            }
        },
        methods:{
            show(message, duration){
                this.isShow = true
                this.message = message
                setTimeout(()=>{
                    this.isShow = !this.isShow
                    this.message = ''
                },duration)
            }

        }
    }
</script>

<style scoped>
    .toast{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba(100,100,100,0.75);
        color: #ffffff;
        padding: 5px 10px;
        z-index: 999;
    }

</style>