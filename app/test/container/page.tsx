'use client'

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import CodeBlock from "./CodeBlock";
import { motion } from "framer-motion";
import NavMenu from "./NavMenu";
import FooterMenu from "./FooterMenu";

const codeBlock = `
name* = TextInput(
	| question = What is your name?
	| description = 
		Let's get started with the survey. First, please tell
		us your full legal name according to your passport.
)

---
# Hey {$ name $} 👋

It's a **pleasure** to meet you. Let us continue.

---
email* = EmailInput(
	| question = What is your email address?
	| description =
		Please enter an email address where we can reach you
		for a reply. Make sure to avoid spelling mistakes.
)
`;

const localization = `
#! localization = es

name* = TextInput(
	| question = Cómo te llamas?
	| description = 
		Empecemos con la encuesta. En primer lugar, dinos tu 
		nombre legal completo según tu pasaporte.
)

---
# Hola {$ name $} 👋

Es un **placer** conocerte. Continuemos.

---
email* = EmailInput(
	| question = Cuál es tu dirección de correo electrónico?
	| description =
		Introduzca una dirección de correo electrónico en la 
		que podamos localizarle para responderle.
)
`;

function Column({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
        <div className={`md:w-1/2 flex flex-col px-4 py-6 md:p-12 ${className}`}>
            {children}
        </div>
    )
}
// two-column layout
export function Section({ children, codeblock }: { children?: React.ReactNode, codeblock?: string }) {
    return (
        <div className="md:flex">
            <Column className="bg-white">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        {children}
                    </motion.div>
                    {codeblock && <CodeBlock code={codeblock} />}
                </div>
            </Column>
            <Column className="bg-gray-100">
                <div className="picture w-full h-[400px] bg-blue-300 sticky top-navbar">
                    {/* Content for the right side */}
                </div>
            </Column>
        </div>
    )
}

export default function Container() {
    return <div className="container px-0 text-gray-800">
        <div className="h-full">
            <NavMenu />
            <main className="block isolate">
                <Section>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-6xl font-semibold mb-8"
                    >
                        Markdown to amazing forms and web pages
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl mb-8"
                    >
                        Blocks.md is a tool that allows you to create forms and web pages from Markdown.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex gap-6"
                    >
                        <Button>
                            Get Started
                        </Button>
                        <Button variant="outline">
                            <PlayIcon className="mr-2 h-4 w-4" />
                            Learn More
                        </Button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mt-8"
                    >
                        <CodeBlock code={codeBlock} />
                    </motion.div>
                </Section>
                <Section codeblock={codeBlock}>
                    <h2 className="text-4xl font-medium text-gray-800 mb-4">
                        Logic jumps and page progress
                    </h2>
                    <p className="text-lg mb-4">
                        Add <code>-&gt; &#123;condition&#125;</code> to a slide to conditionally show it, that is, the slide will be shown to the user only if the jump condition is true. This is called a logic jump. Also use <code>|&gt; &#123;percentage|fraction&#125;</code> to show page progress on top. This indicates how much of the form has been completed so far.
                    </p>
                    <p className="text-lg">
                        <strong>Further reading: <a href="#" className="text-blue-600 hover:underline">Slides - Docs</a></strong>
                    </p>
                </Section>
                <Section codeblock={localization}>
                    <h2 className="text-4xl font-medium text-gray-800 mb-4">
                        Localizable to any language
                    </h2>
                    <p className="text-lg mb-4">
                        Set the <code>#! localization = &#123;lang&#125;</code> to a supported language code, and write your Markdown in that language—everything will be automatically translated. Can't find the language of your choice in that list? It is remarkably easy to add support for a new language.
                    </p>
                    <p className="text-lg">
                        <strong>Further reading: <a href="#" className="text-blue-600 hover:underline">Localize - Docs</a></strong>
                    </p>
                </Section>

                <Section codeblock={`npm install blocksmd`}>
                    <h2 className="text-4xl font-medium text-gray-800 mb-4">
                        Try for free, buy when you're ready
                    </h2>
                    <p className="text-lg mb-4">
                        blocks.md is a very powerful tool that can help you do a lot, while still being easy to use. It already has a ton of features to help you build amazing forms and web pages, and a lot more are on the way:
                    </p>
                    <ol className="text-lg mb-4 ml-4 list-decimal list-inside">
                        <li>Date time input</li>
                        <li>Multi-choice input with dynamic filtering and results</li>
                        <li className="font-bold">Rating input <span className="text-green-600">Done</span></li>
                        <li className="font-bold">Opinion scale and Net Promoter Score® <span className="text-green-600">Done</span></li>
                        <li>File/image upload</li>
                        <li>Ranking input</li>
                        <li>Honeypot fields for spam prevention</li>
                        <li>Layout options with images and media</li>
                        <li>Classic form style</li>
                        <li>Payments</li>
                        <li>WordPress plugin</li>
                        <li>Cloud version</li>
                        <li>Go open-source</li>
                        <li>And so on.</li>
                    </ol>
                    <p className="text-lg">
                        Our license allows you to use it for free forever without creating an account, as long as it is on local. You only need to buy the software when you're ready to use it on your production website.
                    </p>
                </Section>

                <Section codeblock={`npm install blocksmd`}>
                    <h2 className="text-4xl font-medium text-gray-800 mb-4">
                        Try for free, buy when you're ready
                    </h2>
                    <p className="text-lg mb-4">
                        blocks.md is a very powerful tool that can help you do a lot, while still being easy to use. It already has a ton of features to help you build amazing forms and web pages, and a lot more are on the way:
                    </p>
                    <ol className="text-lg mb-4 ml-4 list-decimal list-inside">
                        <li>Date time input</li>
                        <li>Multi-choice input with dynamic filtering and results</li>
                        <li className="font-bold">Rating input <span className="text-green-600">Done</span></li>
                        <li className="font-bold">Opinion scale and Net Promoter Score® <span className="text-green-600">Done</span></li>
                        <li>File/image upload</li>
                        <li>Ranking input</li>
                        <li>Honeypot fields for spam prevention</li>
                        <li>Layout options with images and media</li>
                        <li>Classic form style</li>
                        <li>Payments</li>
                        <li>WordPress plugin</li>
                        <li>Cloud version</li>
                        <li>Go open-source</li>
                        <li>And so on.</li>
                    </ol>
                    <p className="text-lg">
                        Our license allows you to use it for free forever without creating an account, as long as it is on local. You only need to buy the software when you're ready to use it on your production website.
                    </p>
                </Section>

                <Section codeblock={`npm install blocksmd`}>
                    <h2 className="text-4xl font-medium text-gray-800 mb-4">
                        Try for free, buy when you're ready
                    </h2>
                    <p className="text-lg mb-4">
                        blocks.md is a very powerful tool that can help you do a lot, while still being easy to use. It already has a ton of features to help you build amazing forms and web pages, and a lot more are on the way:
                    </p>
                    <ol className="text-lg mb-4 ml-4 list-decimal list-inside">
                        <li>Date time input</li>
                        <li>Multi-choice input with dynamic filtering and results</li>
                        <li className="font-bold">Rating input <span className="text-green-600">Done</span></li>
                        <li className="font-bold">Opinion scale and Net Promoter Score® <span className="text-green-600">Done</span></li>
                        <li>File/image upload</li>
                        <li>Ranking input</li>
                        <li>Honeypot fields for spam prevention</li>
                        <li>Layout options with images and media</li>
                        <li>Classic form style</li>
                        <li>Payments</li>
                        <li>WordPress plugin</li>
                        <li>Cloud version</li>
                        <li>Go open-source</li>
                        <li>And so on.</li>
                    </ol>
                    <p className="text-lg">
                        Our license allows you to use it for free forever without creating an account, as long as it is on local. You only need to buy the software when you're ready to use it on your production website.
                    </p>
                </Section>

                <Section codeblock={`npm install blocksmd`}>
                    <h2 className="text-4xl font-medium text-gray-800 mb-4">
                        Try for free, buy when you're ready
                    </h2>
                    <p className="text-lg mb-4">
                        blocks.md is a very powerful tool that can help you do a lot, while still being easy to use. It already has a ton of features to help you build amazing forms and web pages, and a lot more are on the way:
                    </p>
                    <ol className="text-lg mb-4 ml-4 list-decimal list-inside">
                        <li>Date time input</li>
                        <li>Multi-choice input with dynamic filtering and results</li>
                        <li className="font-bold">Rating input <span className="text-green-600">Done</span></li>
                        <li className="font-bold">Opinion scale and Net Promoter Score® <span className="text-green-600">Done</span></li>
                        <li>File/image upload</li>
                        <li>Ranking input</li>
                        <li>Honeypot fields for spam prevention</li>
                        <li>Layout options with images and media</li>
                        <li>Classic form style</li>
                        <li>Payments</li>
                        <li>WordPress plugin</li>
                        <li>Cloud version</li>
                        <li>Go open-source</li>
                        <li>And so on.</li>
                    </ol>
                    <p className="text-lg">
                        Our license allows you to use it for free forever without creating an account, as long as it is on local. You only need to buy the software when you're ready to use it on your production website.
                    </p>
                </Section>
            </main>
            <FooterMenu />

        </div>
    </div>
}