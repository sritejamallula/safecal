import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do consumers verify a weighing scale in a retail store?',
      a: 'Consumers can scan the QR code badge affixed on the scale using their smartphone camera or enter the 14-digit Instrument ID on our public verify page. If verified, the system displays official certificate details, owner name, and validity expiration date.'
    },
    {
      q: 'What should I do if an instrument certificate is EXPIRED or REJECTED?',
      a: 'Using an unverified or expired scale for commercial transactions is a statutory offense under the Legal Metrology Act. Consumers can submit an anonymous report through the portal, and business owners can immediately request a re-inspection.'
    },
    {
      q: 'How often must commercial weighing instruments be re-verified?',
      a: 'Under Indian Legal Metrology Rules, commercial weighing scales must be verified annually (every 12 months), while certain electronic meters and weighbridges require bi-annual or annual re-stamping.'
    },
    {
      q: 'How does the digital seal prevent tampering?',
      a: 'Every verified instrument receives a tamper-evident holographic QR sticker linked to a cryptographic certificate hash. Any discrepancy between physical seal numbers and portal data indicates potential tampering.'
    },
    {
      q: 'How can shop owners register a new weighing instrument?',
      a: 'Shop owners can log into the Business Owner Portal, navigate to "Register Instrument", enter the device specs and serial number, and upload the purchase invoice. An inspector will be automatically assigned for verification.'
    }
  ];

  return (
    <section id="faq" className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Everything you need to know about digital verification and Legal Metrology standards.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-extrabold text-slate-900 text-sm hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
