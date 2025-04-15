"use client";

import React, { useState, useRef, useEffect, TouchEvent } from "react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
}

interface TestimonialCarouselProps {
  jsonPath?: string;
  backgroundColor?: string;
  marginClass?: string;
  buttonPadding?: string;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  jsonPath,
  backgroundColor = "bg-brand-yellow",
  marginClass = "consistent-margin",
  buttonPadding = "mt-8"
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      if (!jsonPath) {
        console.error("jsonPath is not provided");
        return;
      }

      try {
        const response = await fetch(jsonPath);
        const data = await response.json();
        setTestimonials(data);
        setCurrentQuote(data[0]?.id || 0);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, [jsonPath]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStartX.current) return;
    const currentX = e.touches[0].clientX;
    const diff = touchStartX.current - currentX;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    setSwipeOffset(Math.max(-containerWidth, Math.min(containerWidth, diff)));
  };

  const handleTouchEnd = () => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    if (Math.abs(swipeOffset) > containerWidth / 3) {
      if (swipeOffset > 0 && currentQuote < testimonials.length - 1) {
        setCurrentQuote(currentQuote + 1);
      } else if (swipeOffset < 0 && currentQuote > 0) {
        setCurrentQuote(currentQuote - 1);
      }
    }
    setSwipeOffset(0);
    touchStartX.current = null;
  };

  return (
    <div className={`${backgroundColor} py-12 overflow-hidden`}>
      <div
        ref={containerRef}
        className={`relative ${marginClass} overflow-hidden`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative min-h-[10rem] md:min-h-[6rem]">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="absolute top-0 left-0 w-full transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${
                  (testimonial.id - currentQuote) * 100 -
                  (swipeOffset / (containerRef.current?.offsetWidth || 1)) * 100
                }%)`,
              }}
            >
              <div className="flex flex-col justify-center min-h-8 md:min-h-16 pb-8">
                <blockquote className="text-black text-lg md:text-xl italic text-left mb-auto break-words">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <p className="text-black font-bold text-left mt-4">
                  {testimonial.author}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className={`flex justify-center space-x-2 ${buttonPadding}`}>
          {testimonials.map((testimonial) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentQuote(testimonial.id)}
              className={`w-3 h-3 rounded-full ${
                testimonial.id === currentQuote ? "bg-black" : "bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${testimonial.id + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
