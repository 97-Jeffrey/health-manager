import React, { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import { useProfile } from "../hooks/useProfile";
import Info from "../elements/info/info";

import { IoIosSend } from "react-icons/io";

interface chatCompletionParam {
    role: 'user' | 'assistant' | 'system';
    content: string
}

interface Message{
    id: string,
    data: chatCompletionParam
}


const VitaBot: React.FC = () =>{


    const { profile } = useProfile();
    const { name } = profile;

    const [messages, setMessages] = useState<Message[]>([
        { id:"0", 
        data: {
            role: 'system', 
            content: `
            You are VitaBot. 
            You are a personal health assistant for the user, 
            whose name is ${name} `
        }}])
    const [newMessage, setNewMessage] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const assistantContentRef = useRef('')
    const messagesEndRef = useRef<HTMLDivElement>(null);


    const openai = new OpenAI({
        baseURL: import.meta.env.VITE_DEEPSEEK_API_URL,
        apiKey:  import.meta.env.VITE_DEEPSEEK_API_KEY,
        dangerouslyAllowBrowser:true
    })

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(()=>{
        const doComplete = async()=>{
            if(!newMessage) return

            setLoading(true)

            try{
                await handleCompletion(messages)
                setNewMessage(false)

            }
            catch(err){
                console.log('cannot talk')
                addMessage({
                    id: uuidv4(),
                    data: {
                      role: 'assistant',
                      content: 'Sorry, I encountered an error. Please try again.'
                    }
                });
            }
            finally {
                setLoading(false);
            }

        }
        doComplete()
    }, [newMessage])

    const handleNewMessage =async (input: string) =>{

        // const message = formData.get('message') as string;
        if (!input.trim()) return;

        addMessage({ id: uuidv4(), data: {role: 'user', content: input }})
        setNewMessage(true)


    }

    const addMessage = (message: Message)=>{
        setMessages(prev=> [...prev, message])

    }

    const handleCompletion = async(messages: Message[]) =>{

        const assistantMessageId = uuidv4();

        setMessages(prev => [...prev, {
            id: assistantMessageId,
            data: { role: 'assistant', content: '' }
        }]);


        assistantContentRef.current='';

        const formattedMessages = messages.map((message: Message) => ({
            role: message.data.role,
            content: message.data.content
        }));

        const stream= await openai.chat.completions.create({
            messages: formattedMessages,
            model: 'deepseek-chat',
            stream: true
        })

        for await (const chunk of stream){
            const content = chunk.choices[0]?.delta?.content;

            if(content){
                assistantContentRef.current += content;

                setMessages(prev => 
                    prev.map(msg => 
                      msg.id === assistantMessageId 
                        ? { ...msg, data: { ...msg.data, content: assistantContentRef.current } }
                        : msg
                    )
                );
            
            }
        }
        
    }



    return (
        <>
            <div className='flex flex-col justify-center items-center gap-3 '>
                <div className='flex flex-row justify-start items-center w-100'>
                    <div className='font-bold text-[30px]'> 🌟 Meet VitaBot – Your 24/7 AI Health Assistant 🤖 </div> 
                </div>

                <Info text={`
                    Powered by DeepSeek’s advanced AI, VitaBot (Vita = Life) is your 
                    personalized health assistant designed to support your 
                    health and wellness journey with smart, empathetic, 
                    and actionable guidance.`
                }
                />

                <div className='w-100 flex-1 rounded-lg border border-gray-300 min-h-[570px] bg-white flex flex-col'>
                    <div className='flex-1 p-4 h-[400px] overflow-y-scroll'>
                        {messages.filter(m => m.data.role !== 'system').map((message) => (
                            <div 
                                key={message.id} 
                                className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                                    message.data.role === 'user' 
                                    ? 'bg-blue-100 ml-auto' 
                                    : 'bg-gray-100 mr-auto'
                                }`}
                            >
                                <div className='font-semibold'>
                                    {message.data.role === 'user' ? name : 'VitaBot'}
                                </div>

                                <div className='whitespace-pre-wrap'>{message.data.content}</div>
                                </div>
                        ))}

                        <div ref={messagesEndRef} />
                    </div>

                    <form 
                    onSubmit={async (e) => {
                        e.preventDefault();
                        // const formData = new FormData(e.currentTarget);
                        await handleNewMessage(input);
                        setInput('')// Optional: Clear input after submission
                    }}

                    className='p-4 border-t border-gray-300 flex gap-2'
                    >
                    <input
                        type='text'
                        name='message'
                        placeholder='Message here...'
                        className='flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none '
                        disabled={loading}
                        value={input}
                        onChange={e=> setInput(e.target.value)}
                    />
                    <button 
                        type='submit'
                        className=' px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400'
                        disabled={!input || loading}
                    >
                        { <div className='flex flex-row justify-center items-center gap-[10px]'> Send <IoIosSend/></div>}
                    </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default VitaBot