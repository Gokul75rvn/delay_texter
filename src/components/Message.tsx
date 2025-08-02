import { useState, useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Message = () => {
    const [message, setMessage] = useState<string>("");
    const [delay, setDelay] = useState<number>(10);
    const [sending, setSending] = useState<boolean>(false);
    const [sentMessage, setSentMessage] = useState<boolean>(false);
    const timerId = useRef<NodeJS.Timeout | null>(null);
    const handleSend = () => {
        setSending(true);
        setSentMessage(false);
        timerId.current = setTimeout(() => {
            setMessage("");
            setSending(false);
            setSentMessage(true);
        }, delay * 1000);
    };

    const handleCancel = () => {
        if (timerId.current) {
            clearTimeout(timerId.current);
            setSending(false);
            timerId.current = null;
        }
    };

    return (
        <div className="max-w-md mx-auto p-7 bg-white rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl text-center font-bold text-blue-800">DM Delay button</h2>
            <Textarea
                placeholder="Type your message here..."
                className="w-full h-24"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Input
                type="text"
                placeholder="Enter number"
                className="w-full"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                disabled={sending}
            />

            {!sending ? (
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" onClick={handleSend} disabled={sending}>
                    Send with Delay
                </Button>
            ) : (
                <Button className="w-full text-red-600" onClick={handleCancel}>
                    Cancel
                </Button>
            )}
            {sentMessage && <p className="text-green-600 text-center mt-4">Message sent successfully!</p>}
        </div>
    );
};
export default Message;