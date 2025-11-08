'use client'
import { motion, MotionProps } from "framer-motion";
import { ComponentProps, JSX } from "react";



type MotionPropsCustom<T extends keyof JSX.IntrinsicElements> = MotionProps & ComponentProps<T> & {
    motionElement?: T
    className?: string
}

export default function Motion<T extends keyof JSX.IntrinsicElements>({ children, ...props }: MotionPropsCustom<T>) {
    const { motionElement, ...rest } = props;
    const MotionElement = motion[motionElement || "div"] as typeof motion['div']

    return (
        <MotionElement {...rest as MotionProps}>
            {children}
        </MotionElement>
    );
}
