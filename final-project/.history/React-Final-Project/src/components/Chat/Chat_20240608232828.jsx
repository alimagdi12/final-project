import { Box } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'

const Chat = () => {
    return (
        <Box sx={{ display: 'flex', height: '90vh' }}>
            <Sidebar />
            <ChatWindow />
        </Box>
    )
}

export default Chat
