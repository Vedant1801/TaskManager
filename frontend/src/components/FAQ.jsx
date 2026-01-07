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
      "Yes, TaskManager is fully responsive and works smoothly on mobile, tablet, and desktop devices."
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

        <div className="bg-white rounded-xl shadow-md divide-y">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index}>
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${index}`}
                  className={`w-full flex justify-between items-center px-6 py-4 text-left font-medium transition
                    ${
                      isOpen
                        ? "bg-indigo-100 text-indigo-900"
                        : "bg-white text-slate-800 hover:bg-slate-50"
                    }`}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <div
                  id={`faq-${index}`}
                  className={`grid transition-all duration-300 ease-in-out
                    ${isOpen ? "grid-rows-[1fr] px-6 py-4" : "grid-rows-[0fr] px-6"}
                  `}
                >
                  <div className="overflow-hidden text-slate-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
