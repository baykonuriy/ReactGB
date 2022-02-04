import axios from "axios";

const chatsUrl = 'https://chat3-cb6ea-default-rtdb.firebaseio.com/messanger.json'

export default class MessageService {

    static async getChats(url = chatsUrl){
      const result = await axios(url)
      return result.data
    }

    static async setMessanger(messanger, url = chatsUrl){
      axios.put(url, messanger)
    }

    static async setChat(newChat, chats, url = chatsUrl){
      let updateChats = chats.sort((a, b) => b.id - a.id)
      updateChats = [...updateChats, newChat]
      axios.put(url, updateChats)
    }

    static async removeChat(updateChats, url = chatsUrl){
      axios.put(url, updateChats)
    }

    static async setMessages(chats){
      await axios.put(chatsUrl, chats)
    }


    
    // static async filterServerMessages(messages, removedMess, url = messagesUrl){
    //     let serverMessages = []
    //     await axios.get(url)
    //     .then(result=>{
    //       serverMessages = [...result.data, ...messages, ...removedMess]
    //       .filter(
    //         (mes => currMess => !mes.has(currMess.id) && mes.add(currMess.id))(new Set))
    //       .filter(item => item.user !== 'Robot')
    //     })
    //     axios.put(url, [...serverMessages])
    //   }
}