import React from "react"
import 
    {
        List,
        ListItem,
        ListItemText,
        ListItemAvatar,
        Avatar,
        Typography
    }
from '@mui/material'
import myStyled from './ChatList.module.scss'

export const ChatList = ({chats}) => {

    return(
        <List
            sx={{width: '260px'}}>
            {   
                chats
                ?   chats.map(chat=>{
                        return (
                            <ListItem
                                alignItems="flex-start"
                                key={chat.id}>
                                    <ListItemAvatar>
                                        <Avatar alt={chat.chatName} src={chat.userpic}/>
                                    </ListItemAvatar>
                                    {/* <ListItemText
                                        primary={chat.chatName}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {chat.status}
                                            </Typography>
                                            </React.Fragment>}>
                                    </ListItemText> */}
                                    <div className={myStyled.chatList__textWrapper}>
                                        <p>{chat.chatName}</p>
                                        <span className="description">{chat.status}</span>
                                    </div>
                                    
                            </ListItem>
                        )
                    })
                :   null
                
            }
        </List>
    )
}