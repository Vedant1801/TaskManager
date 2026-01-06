import { useState } from "react";

const faqs = [
  {
    question: "What is this app for?",
    answer:
      "This app helps you organize, track, and manage your daily tasks efficiently in one place."
  },
  {
    question: "Do I need to sign up?",
    answer:
      "Yes, creating an account allows you to securely save and manage your tasks across sessions."
  },
  {
    question: "Can I access it on mobile?",
    answer:
      "Yes, DuoTasker is fully responsive and works smoothly on mobile, tablet, and desktop devices."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-slate-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-indigo-900 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-b last:border-none">
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full text-left px-6 py-4 font-medium flex justify-between items-center transition-colors
                    ${
                      isOpen
                        ? "bg-indigo-100 text-indigo-900"
                        : "bg-white text-slate-800 hover:bg-slate-50"
                    }`}
                >
                  {faq.question}
                  <span
                    className={`transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

            
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-40 py-4" : "max-h-0 py-0"}`}
                >
                  <p className="text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

