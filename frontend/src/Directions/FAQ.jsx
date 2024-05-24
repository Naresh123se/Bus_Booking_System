import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqData = [
    {
        question: "How do I place an order?",
        answer: "Browse our catalog, select the items you wish to purchase, add them to your cart, and proceed to checkout. Follow the prompts to enter your shipping and payment information to complete your order."
    },
    {
        question: "Can I modify my order after it has been placed?",
        answer: "Unfortunately, once an order is placed, it cannot be modified. If you need to make changes, please contact our customer service team as soon as possible to see if we can cancel the order before it ships."
    },
    {
        question: "How can I track my order?",
        answer: "After your order is shipped, you will receive a confirmation email with a tracking number and a link to the carrier's website where you can track your shipment."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <h1 className='text-2xl font-bold text-center mt-8'>Frequently Asked Questions</h1>
            <div className="faq w-full max-w-[75rem] mx-auto mt-8 p-4">
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className={`faq-item mb-4 border border-[#d1d5de] rounded-md shadow-lg ${activeIndex === index ? 'border-[#F3F4F6]' : ''}`}
                    >
                        <div
                            className="faq-question cursor-pointer bg-white text-black p-4 flex justify-between items-center rounded-t-md"
                            onClick={() => handleClick(index)}
                        >
                            <span>{item.question}</span>
                            <span>{activeIndex === index ? <FaMinus /> : <FaPlus />}</span>
                        </div>
                        {activeIndex === index && (
                            <div className="faq-answer pl-4 pr-4 pb-4 bg-gray-50 rounded-b-md">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default FAQ;
