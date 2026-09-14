import React from 'react';

const CareerBanner = () => {
    return (
        <section 
            className="relative w-full overflow-hidden"
            style={{ 
                backgroundColor: '#161616', 
                backgroundImage: 'url(https://www.adsguards.com/wp-content/uploads/2023/03/Untitled-design-4.png)',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                padding: '100px 0 100px 0'
            }}
        >
            <div className="absolute inset-0 bg-[#161616] opacity-80"></div>
            
            {/* Orange triangle at the bottom left */}
            <div 
                className="absolute left-0 bottom-0 w-0 h-0"
                style={{
                    borderBottom: '100px solid #EE8E09',
                    borderRight: '100px solid transparent'
                }}
            ></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col items-start gap-4 md:w-1/2">
                    <h1 
                        className="text-white m-0 p-0"
                        style={{
                            fontFamily: '"Bebas Neue", Sans-serif',
                            fontSize: '65px',
                            fontWeight: 500,
                            letterSpacing: '0.025em',
                            lineHeight: 1
                        }}
                    >
                        THE BEST WAY TO START <br/>
                        <span style={{ color: '#EE8E09' }}>YOUR CAREER</span>
                    </h1>
                    <button 
                        style={{
                            backgroundColor: '#EE8E09',
                            fontFamily: '"Roboto", Sans-serif',
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#FFF',
                            padding: '1em 3em',
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: '20px',
                            textTransform: 'uppercase'
                        }}
                    >
                        CONTACT US NOW
                    </button>

                    <div className="mt-12">
                        <img 
                            src="/images/logo.png" 
                            alt="American Discount Security Logo" 
                            className="w-[250px] md:w-[350px] h-auto object-contain"
                        />
                    </div>
                </div>
                <div className="md:w-1/2 mt-16 md:mt-0 flex justify-end">
                    <div 
                        className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full overflow-hidden" 
                        style={{ 
                            border: '35px solid #EE8E09',
                            marginRight: '-100px',
                            transform: 'translateY(-50px)'
                        }}
                    >
                        <img 
                            src="https://www.adsguards.com/wp-content/uploads/2026/08/with-out-background.png" 
                            alt="Team Hands" 
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerBanner;
