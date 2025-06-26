'use client'
import { motion, MotionProps } from "framer-motion";
import { ComponentProps, CSSProperties, useEffect, useState, JSX } from "react";



type MotionPropsCustom<T extends keyof JSX.IntrinsicElements> = MotionProps & ComponentProps<T> & {
    motionElement?: T
    className?: string
}

export default function Motion<T extends keyof JSX.IntrinsicElements>({ children, ...props }: MotionPropsCustom<T>) {
    const { motionElement, ...rest } = props;

    const [hasMounted, setHasMounted] = useState(false);

    const MotionElement = motion[motionElement || "div"] as typeof motion['div']


    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return <div style={rest.style as CSSProperties} className={`opacity-50 ${props.className}`}>{children as React.ReactNode || null}</div>
    }

    return (
        <MotionElement
            {...rest as MotionProps}
        >
            {children}
        </MotionElement>
    );
}