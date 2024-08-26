import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const MiddlePanel = ({ onSelectEmail }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Inbox');
    const [emails, setEmails] = useState([
        { id: 1, subject: "Meeting Tomorrow", sender: "William Smith", preview: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to", date: "10 months ago", tags: ["meeting", "work", "important", "unread"] },
        { id: 2, subject: "Re: Project Update", sender: "Alice Smith", preview: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in. I have a few minor suggestions that I'll include in the attached document. Let's discuss these duri", date: "10 months ago", tags: ["work", "important", "read", "archived"] },
        { id: 3, subject: "Weekend Plans", sender: "Bob Johnson", preview: "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob", date: "over 1 year ago", tags: ["personal", "unread"] },
    ]);

    const filteredEmails = emails.filter(email =>
        (email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.preview.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (activeTab === 'All mail' ||
            (activeTab === 'Inbox' && !email.tags.includes('archived')) ||
            (activeTab === 'Unread' && email.tags.includes('unread')))
    );
    return (
        <div className="w-[400px] border-r flex flex-col flex-shrink-0">
            <div className="p-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Inbox</h2>
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        {['Inbox', 'All mail', 'Unread'].map((tab) => (
                            <TabsTrigger key={tab} value={tab}>
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
            <div className="p-4">
                <div className="relative">
                    <Input
                        type="search"
                        placeholder="Search emails..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
            </div>
            <ScrollArea className="flex-grow">
                <div className="p-2">
                    {filteredEmails.map((email) => (
                        <div
                            key={email.id}
                            className="mb-2 p-3 rounded border hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                            onClick={() => onSelectEmail(email)}
                        >
                            <h3 className="font-semibold text-lg mb-1 truncate">{email.subject}</h3>
                            <p className="text-sm text-gray-600 mb-1">{email.sender}</p>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{email.preview}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-400">{email.date}</p>
                                <div className="flex gap-1">
                                    {email.tags.map((tag, index) => (
                                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

const RightPanel = ({ selectedEmail }) => {
    if (!selectedEmail) {
        return <div className="flex-grow p-4">Select an email to view details</div>
    }

    return (
        <div className="flex-grow p-4">
            <h2 className="text-2xl font-bold mb-4">{selectedEmail.subject}</h2>
            <p>{selectedEmail.preview}</p>
        </div>
    )
}
function Emails() {
    const [selectedEmail, setSelectedEmail] = useState(null)

    return (
        <>
            <MiddlePanel onSelectEmail={setSelectedEmail} />
            <RightPanel selectedEmail={selectedEmail} />
        </>
    )
}

export default Emails;