import axios from "axios";
const messagesUrl = 'https://chat-messages-2-default-rtdb.firebaseio.com/chat.json'

export default class MessageService {
    
    static async getOldMessages(){
        const response = await axios.get(messagesUrl)
        return response.data
    }

    static async filterServerMessages(messages, removedMess, url = messagesUrl){
        let serverMessages = []
        await axios.get(url)
        .then(result=>{
          serverMessages = [...result.data, ...messages, ...removedMess]
          .filter(
            (mes => currMess => !mes.has(currMess.id) && mes.add(currMess.id))(new Set))
          .filter(item => item.user !== 'Robot')
        })
        axios.put(url, [...serverMessages])
      }

}