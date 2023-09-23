const routes={
    login: {
        way: '/login',
        login: '/l',
        reg:'/reg',
        check:'/check'
    },
    profile:{
        way:'/profile',
        setInfo:'/setInfo',
        getInfo: '/getUser'
        
    },
    search:{
        way:'/search',
        get: '/get'
    },
    chat:{
        way:'/chat',
        check: '/check',
        getChats: '/getChats',
        createLocalMessage: '/createLocalMessage',
        getLocalMessage: '/getLocalMessage',
        createRecipientMessageLocal:'/createRecipientMessageLocal',
        getLastMessageLocal: '/getLastMessageLocal',
        deleteMessage:'/deleteMessage',
        createChat:'/createChat',
        checkSubscribe:'/checkSubscribe',
        getChatMessages:'/getChatMessages'
        
    }
    
}
module.exports =routes