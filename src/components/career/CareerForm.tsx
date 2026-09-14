'use client';
import React, { useState } from 'react';

const formFields = [
  { name: "firstName", label: "First Name", type: "text", required: true, width: "w-full md:w-1/3" },
  { name: "middleName", label: "Middle Name", type: "text", required: false, width: "w-full md:w-1/3" },
  { name: "lastName", label: "Last Name", type: "text", required: false, width: "w-full md:w-1/3" },
  { name: "email", label: "Email", type: "email", required: true, width: "w-full md:w-1/2" },
  { name: "phone", label: "Phone Number", type: "tel", required: true, width: "w-full md:w-1/2" },
  { name: "street", label: "Street address", type: "text", required: true, width: "w-full" },
  { name: "city", label: "City", type: "text", required: false, width: "w-full md:w-1/3" },
  { name: "state", label: "State/Province", type: "text", required: false, width: "w-full md:w-1/3" },
  { name: "zip", label: "Postal/Zip Code", type: "text", required: false, width: "w-full md:w-1/3" },
];

const radioOptions = [
  { value: "administration", label: "Administration" },
  { value: "security-guard", label: "Security guard application" },
  { value: "patrol-supervisor", "label": "Patrol / Supervisor" }
];

const CareerForm = () => {
    const [selectedCareer, setSelectedCareer] = useState('administration');

    return (
        <section 
            className="w-full relative"
            style={{ 
                backgroundColor: '#161616',
                backgroundImage: 'url(https://www.adsguards.com/wp-content/uploads/2023/02/Backgorund-Pattern.png)',
                padding: '50px 0 100px 0'
            }}
        >
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h4 
                        className="mb-2"
                        style={{
                            fontFamily: '"Plus Jakarta Sans", Sans-serif',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#EE8E09',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        Career
                    </h4>
                    <h2
                        style={{
                            fontFamily: '"Plus Jakarta Sans", Sans-serif',
                            fontSize: '30px',
                            fontWeight: 600,
                            color: '#FFF',
                            margin: 0
                        }}
                    >
                        Choose the career that suit you best
                    </h2>
                </div>

                <div className="bg-white p-8 md:p-12 w-full max-w-4xl mx-auto rounded-none shadow-none">
                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <p className="text-sm text-gray-500 mb-3 italic">Career selected</p>
                            <div className="flex flex-wrap gap-4 md:gap-8">
                                {radioOptions.map((option) => (
                                    <label key={option.value} className="flex items-center gap-2 cursor-pointer font-medium text-sm text-gray-700">
                                        <input 
                                            type="radio" 
                                            name="career_type" 
                                            value={option.value}
                                            checked={selectedCareer === option.value}
                                            onChange={(e) => setSelectedCareer(e.target.value)}
                                            className="w-4 h-4 text-[#EE8E09] focus:ring-[#EE8E09] border-gray-300"
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-2">
                            {formFields.map((field) => (
                                <div key={field.name} className={`${field.width} px-2 mb-4`}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <input 
                                        type={field.type} 
                                        name={field.name}
                                        required={field.required}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#EE8E09] focus:border-[#EE8E09]"
                                    />
                                </div>
                            ))}

                            <div className="w-full px-2 mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Upload your resume <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1 flex items-center">
                                    <input type="file" className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" required />
                                </div>
                            </div>

                            <div className="w-full px-2 mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cover letter</label>
                                <textarea 
                                    name="coverLetter"
                                    rows={4}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#EE8E09] focus:border-[#EE8E09]"
                                ></textarea>
                            </div>
                        </div>

                        <div className="mt-2">
                            <button 
                                type="submit"
                                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded text-center transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-2 italic text-center">
                            By providing a telephone number and submitting this form you are consenting to be contacted by SMS text message. Message &amp; data rates may apply. You can reply STOP to opt-out of further messaging.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CareerForm;
