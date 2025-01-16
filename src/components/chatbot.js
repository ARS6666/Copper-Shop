import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/chatbot.css';
import pfp from "../assets/media/Apic.png";

const preprocessText = (text) => {
    const stopWords = ['است', 'در', 'به', 'از', 'و', 'یک', 'تا', 'میخواستم', 'با', 'سلام', 'دارید', '.', '؟', 'یدونه', 'عدد'];
    return text
        .toLowerCase()
        .split(' ')
        .filter(word => !stopWords.includes(word));
};

const ChatBot = () => {
    const [products, setProducts] = useState([]);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'سلام! من ربات چت پشتیبان هوشمند شما هستم. می‌توانم به شما در پیدا کردن بهترین محصولات کمک کنم. چطور می‌توانم به شما کمک کنم؟' }
    ]);
    const [input, setInput] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const scrollableRef = useRef(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products/', {
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

        if (userInput.includes('سلام') || userInput.includes('درود')) {
            const botResponse = 'سلام! چطور می‌توانم به شما کمک کنم؟';
            setMessages(prevMessages => [...prevMessages, userMessage, { sender: 'bot', text: botResponse }]);
            setInput('');
            return;
        }

        if (userInput.includes('خداحافظ') || userInput.includes('بای')) {
            const botResponse = 'خداحافظ! روز خوبی داشته باشید!';
            setMessages(prevMessages => [...prevMessages, userMessage, { sender: 'bot', text: botResponse }]);
            setInput('');
            return;
        }

        if (userInput.includes('متشکرم') || userInput.includes('ممنون')) {
            const botResponse = 'خواهش می‌کنم! اگر سوال دیگری دارید، بفرمایید.';
            setMessages(prevMessages => [...prevMessages, userMessage, { sender: 'bot', text: botResponse }]);
            setInput('');
            return;
        }

        if (selectedProduct && userInput.includes('بله')) {
            const botResponse = `توضیحات محصول: ${selectedProduct.description}`;
            setMessages(prevMessages => [...prevMessages, userMessage, { sender: 'bot', text: botResponse }]);
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
            botResponse = `بر اساس گفته‌های شما، من پیشنهاد می‌کنم: ${productLink}. قیمت آن ${addCommas(suggestedProduct.product.price)} هزار تومان است. آیا مایلید جزئیات بیشتری بدانید؟`;
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
            <div className="col-md-3 p-2 fontr achat bg-white rounded" dir="rtl">
                <div className='border rounded border-3 border-theme'>
                    <div className="col-md-12 row m-0 border-bottom border-3 border-theme">
                        <div className="col-md-2 p-2">
                            <img src={pfp} className='aipfp' alt="Profile" />
                        </div>
                        <div className="col-md-10 col-10">
                            <h4 className='align-self-center pt-4'>ربات مشاوره خرید محصول</h4>
                        </div>
                    </div>
                    <div className="chat-box scrollable border-bottom border-2 border-theme" ref={scrollableRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message fontr ${msg.sender}`}>
                                <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                            </div>
                        ))}
                    </div>
                    <div className="input-box fontr col-md-12 row m-0 col-12 p-2">
                        <div className='col-md-9 col-8'>
                            <input
                                type="text"
                                className='form-control form-control-lg col-md-11 col-11'
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleChat();
                                }}
                                placeholder="پیام خود را اینجا وارد کنید..."
                            />
                        </div>
                        <div className='col-md-3 col-3'>
                            <button className='btn btn-orange col-md-12 col-12' onClick={handleChat}>
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
