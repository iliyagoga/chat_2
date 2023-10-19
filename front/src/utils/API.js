export const api= {
    backHost: 'http://93.80.162.11:5000',
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
        getChatMessages:'/getChatMessages',
        getAllMembers:'/getAllMembers',
        setVision:'/setVision',
        getPersonInfo:'/getPersonInfo'
    }
    
}