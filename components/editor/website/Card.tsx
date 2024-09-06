"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CardProps {
    title: string;
    description: string;
    imageSrc?: string;
    imageAlt?: string;
}

const FeatureCard: React.FC<CardProps> = ({ title, description, imageSrc, imageAlt }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                {imageSrc && (
                    <CardContent>
                        <div className="relative w-full h-48">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                        </div>
                    </CardContent>
                )}
            </Card>
        </motion.div>
    );
};

export default FeatureCard;
