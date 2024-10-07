"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ToTopBtn from "@/components/ToTopBtn";

const AboutPage = () => {
    // Initialize  AOS Animation

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <section>
            <ToTopBtn />
        </section>
    );
};

export default AboutPage;