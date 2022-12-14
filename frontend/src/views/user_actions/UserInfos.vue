<template>
    <div>{{ user.firstName + ' ' + user.lastName }}</div>
</template>

<script>

export default{
    data(){
        return {
        }
    },
    props: {
        userId: String,
        users: Array,
    },
    computed: {
        user(){
            let found = this.users.find(element => element._id == this.userId)
            if(found){
                return found
            } else {
                return ''
            }
        }
    },
}
</script>

<style scoped>
    div{
        font-weight: bold;
    }
</style>