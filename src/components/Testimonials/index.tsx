"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const testimonials = [
  {
    name: "Hiromi Mastumoto",
    title: "V.P. of Finance International Transport U.S.A., Inc.",
    content: "Liked the way you guys treat your customers, the prices are pretty great too!",
  },
  {
    name: "Romeo Sanchez",
    title: "Hotels group",
    content: "We have been pleased with your serivce and it is my wish that we part on good terms.",
  },
  {
    name: "Mary Vinero",
    title: "Management",
    content: "Thanks for the quick and professional service! I was happy to know about safety.",
  },
  {
    name: "Andrea Owens",
    title: "Client",
    content: "Professional, friendly and fair prices. Loved the services, thank you for providing great security service.",
  }
];

export default function Testimonials() {
  return (
    <section className="elementor-section elementor-top-section elementor-element elementor-element-643bc12a elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="643bc12a" data-element_type="section" data-e-type="section" id="xs_testi_7" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="elementor-container elementor-column-gap-default">
        <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-2dc736ca" data-id="2dc736ca" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <section className="elementor-section elementor-inner-section elementor-element elementor-element-8adf56d elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="8adf56d" data-element_type="section" data-e-type="section">
              <div className="elementor-container elementor-column-gap-default">
                <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-7342270b" data-id="7342270b" data-element_type="column" data-e-type="column">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-element elementor-element-50d7d5d6 animated-slow elementor-widget elementor-widget-elementskit-testimonial" data-id="50d7d5d6" data-element_type="widget" data-e-type="widget" data-widget_type="elementskit-testimonial.default">
                      <div className="elementor-widget-container">
                        <div className="ekit-wid-con">
                          <div className="elementskit-testimonial-slider ekit-testimonia-style-4 arrow_inside">
                            <div className="ekit-main-swiper">
                              <Swiper
                                modules={[Autoplay, Pagination]}
                                spaceBetween={15}
                                slidesPerView={3}
                                loop={true}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                  320: { slidesPerView: 1, spaceBetween: 10 },
                                  768: { slidesPerView: 2, spaceBetween: 10 },
                                  1024: { slidesPerView: 3, spaceBetween: 15 }
                                }}
                                className="u-pb-10" // Add padding for pagination dots
                              >
                                {testimonials.map((testimonial, index) => (
                                  <SwiperSlide key={index}>
                                    <div className="swiper-slide-inner">
                                      <div className="elementskit-single-testimonial-slider elementskit-testimonial-slider-block-style">
                                        <div className="elementskit-commentor-bio client_left">
                                          <div className="elementskit-commentor-image ekit-testimonial--avatar">
                                            <img src="/logos/logo.png" loading="lazy" decoding="async" width={166} height={180} className="attachment-full size-full" alt="" />
                                          </div>
                                          <span className="elementskit-profile-info">
                                            <strong className="elementskit-author-name">{testimonial.name}</strong>
                                            <span className="elementskit-author-des">{testimonial.title}</span>
                                          </span>
                                        </div>
                                        <div className="elementskit-commentor-content">
                                          <span className="elementskit-watermark-icon ekit_watermark_icon_custom_position">
                                            <i aria-hidden="true" className="icon icon-quote" />
                                          </span>
                                          <p>{testimonial.content}</p>
                                          <ul className="elementskit-stars">
                                            {[...Array(5)].map((_, i) => (
                                              <li key={i}>
                                                <a>
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                                  </svg>
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
