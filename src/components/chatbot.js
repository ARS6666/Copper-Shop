import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/chatbot.css';
import pfp from "../assets/media/Apic.png";
import url from "../config.json";


const preprocessText = (text) => {
    const stopWords = ['است', 'در', 'به', 'از', 'و', 'یک', 'تا', 'میخواستم', 'با', 'سلام', 'دارید', '.', '؟', 'یدونه', 'عدد','سلام','مسی','مس', 'میخوام', 'دارین'];
    return text
        .toLowerCase()
        .split(' ')
        .filter(word => !stopWords.includes(word));
};

const ChatBot = (theme) => {
    const [products, setProducts] = useState([]);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'سلام! من ربات چت پشتیبان هوشمند شما هستم. می‌توانم به شما در پیدا کردن بهترین محصولات کمک کنم. چطور می‌توانم به شما کمک کنم؟' }
    ]);
    const [input, setInput] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const scrollableRef = useRef(null);
    useEffect(() => {
        fetch(`${url.baseUrl}/api/products/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-CSRFToken': 'k6mKSmIvZL7B8FHTIOCkBvdFQq578JfCukgNlwDqPAbS2N7bYYnQDNwHQ4pXbcni'
            }
        })
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error('خطا در دریافت محصولات:', err));
    }, []);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleChat = () => {
        const userMessage = { sender: 'user', text: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        const userInput = input.toLowerCase();

        if (userInput.includes('سلام')) {
            const botResponse = 'سلام! چطور می‌توانم به شما کمک کنم؟';
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
            setInput('');
            return;
        }

        if (userInput.includes('خداحافظ') || userInput.includes('بای')) {
            const botResponse = 'خداحافظ! روز خوبی داشته باشید!';
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
            setInput('');
            return;
        }

        if (userInput.includes('متشکرم') || userInput.includes('ممنون') || userInput.includes('مرسی')) {
            const botResponse = 'خواهش می‌کنم! اگر سوال دیگری دارید، بفرمایید.';
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
            setInput('');
            return;
        }

        if (selectedProduct && userInput.includes('بله')|| userInput.includes('اره')|| userInput.includes('آره')) {
            const botResponse = `توضیحات محصول: ${selectedProduct.description}`;
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
            setSelectedProduct(null);
            setInput('');
            return;
        }

        const userInputTokens = preprocessText(input);
        const suggestedProduct = products.reduce((bestMatch, product) => {
            const productTokens = preprocessText(product.name);
            const similarity = calculateSimilarity(userInputTokens, productTokens);
            return similarity > bestMatch.similarity ? { product, similarity } : bestMatch;
        }, { product: null, similarity: 0 });

        let botResponse = '';

        if (suggestedProduct.product) {
            const productLink = `<a href="/pi?id=${suggestedProduct.product.id}#${suggestedProduct.product.name}" target="_blank">${suggestedProduct.product.name}</a>`;
            botResponse = `بر اساس گفته‌های شما، من پیشنهاد می‌کنم: ${productLink}. قیمت آن ${addCommas(suggestedProduct.product.price)} تومان است. آیا مایلید جزئیات بیشتری بدانید؟`;
            setSelectedProduct(suggestedProduct.product);
        } else {
            botResponse = 'متاسفانه نتوانستم محصولی را که مطابق با توضیحات شما باشد پیدا کنم. لطفا جزئیات بیشتری ارائه دهید یا پرسش دیگری مطرح کنید.';
            setSelectedProduct(null);
        }

        const botMessage = { sender: 'bot', text: botResponse };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        setInput('');
    };

    const calculateSimilarity = (tokens1, tokens2) => {
        const commonTokens = tokens1.filter(token => tokens2.includes(token));
        return commonTokens.length / Math.max(tokens1.length, tokens2.length);
    };

    const addCommas = (number) => {
        if (number !== undefined) {
            let [integer] = number.toString().split('.');
            integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return integer;
        }
        return null;
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
        }
    };

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    };

    return (<>
        <div className='fontr'>
            <button className='btn btn-orange abtn' onClick={toggleChatVisibility}>
                {isChatVisible ? <i class="fa-solid fa-xmark"></i> : <i class="fas fa-comment-alt align-self-center"></i>}
            </button>
        </div>
        {isChatVisible && (
            <div className="col-md-3 p-4 fontr achat border-theme" dir="rtl">
                <div className={theme.theme == "light" ? 'border border-3 border-theme bg-white' : 'border border-3 border-theme dark'} style={{borderRadius:"25px"}}>
                    <div className="col-md-12 row m-0 border-bottom border-3 border-theme">
                        <div className="col-md-2 col-2 p-2">
                            <img src={pfp} className='aipfp' alt="Profile" />
                        </div>
                        <div className="col-md-10 col-10 d-flex justify-content-start align-items-center">
                            <h4 className='align-self-center'>پشتیبانی خرید</h4>
                        </div>
                    </div>
                    <div className="chat-box scrollable border-bottom border-2 border-theme" ref={scrollableRef} style={{backgroundColor : theme.theme == "light" ? '#f9f9f9' : '#121212'}}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message fontr ${msg.sender}`}>
                                <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                            </div>
                        ))}
                    </div>
                    <div className="input-box fontr col-md-12 row m-0 col-12 p-2 pt-1">
                        <div className='col-md-9 col-9'>
                            <input
                                type="text"
                                className='form-control col-md-11 col-11 h-5'
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleChat();
                                }}
                                placeholder="پیام خود را اینجا وارد کنید..."
                                style={{height:"35px"}}
                            />
                        </div>
                        <div className='col-md-3 col-3'>
                            <button className='btn btn-sm btn-orange col-md-12 col-12 p-0' style={{height:"35px"}} onClick={handleChat}>
                                ارسال
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>);
};

export default ChatBot;
