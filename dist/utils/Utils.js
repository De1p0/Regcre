import { useInput } from "ink";
import { useState } from "react";
export function useReadline() {
    const [controller, setController] = useState(null);
    const [text, setText] = useState("");
    const [cursor, setCursor] = useState(0);
    // start a new input session
    const readline = (prompt) => {
        setText("");
        setCursor(0);
        return new Promise((resolve) => {
            setController({ prompt, resolve });
        });
    };
    useInput((input, key) => {
        if (!controller)
            return;
        // ENTER → finish input
        if (key.return) {
            controller.resolve(text);
            setController(null);
            setText("");
            setCursor(0);
            return;
        }
        // BACKSPACE
        if (key.backspace) {
            if (cursor === 0)
                return;
            setText((prev) => prev.slice(0, cursor - 1) + prev.slice(cursor));
            setCursor((c) => c - 1);
            return;
        }
        // DELETE
        if (key.delete) {
            setText((prev) => prev.slice(0, cursor) + prev.slice(cursor + 1));
            return;
        }
        // MOVE LEFT
        if (key.leftArrow) {
            setCursor((c) => Math.max(c - 1, 0));
            return;
        }
        // MOVE RIGHT
        if (key.rightArrow) {
            setCursor((c) => Math.min(c + 1, text.length));
            return;
        }
        // INPUT
        if (input) {
            setText((prev) => prev.slice(0, cursor) + input + prev.slice(cursor));
            setCursor((c) => c + 1);
        }
    });
    return {
        readline,
        text,
        cursor,
        prompt: controller?.prompt ?? null,
        active: controller !== null,
    };
}
