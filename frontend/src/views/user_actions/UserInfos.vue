<template>
    <div class="user_infos_container">
        <img :src="`${user.imageUrl}`" alt="image profil utilisateur">
        <p>{{ user.firstName + ' ' + user.lastName }}</p>
    </div>
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
    .user_infos_container{
        display: flex;
    }
    .user_infos_container p{
        font-weight: bold;
        margin: 0;
    }
    .user_infos_container img{
        border-radius: 30px;
        width: 50px;
        height: 50px;
        margin-right: 10px;   
    }
@media (max-width: 768px){
    .user_infos_container{
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .user_infos_container p {
        margin-top: 10px;
    }
}
</style>