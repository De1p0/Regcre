import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text, render } from "ink";
import { useEffect, useState } from "react";
import { useGetInput } from "./hooks/useGetInput.js";
function Main() {
    const { readline, text, cursor, prompt, active } = useGetInput();
    const [regexTarget, setRegexTarget] = useState("");
    const [matchTarget, setMatchTarget] = useState("");
    const [regex, setRegex] = useState(new RegExp(""));
    useEffect(() => {
        async function run() {
            let input = await readline("Enter string:");
            setRegexTarget(input);
            input = await readline("Enter match:");
            setMatchTarget(input);
        }
        run();
    }, []);
    const regexIndex = regexTarget.indexOf(matchTarget);
    return (_jsxs(Box, { flexDirection: "column", children: [_jsxs(Text, { color: "redBright", children: [regexTarget.slice(0, regexIndex), _jsx(Text, { color: "greenBright", children: regexTarget.slice(regexIndex, regexIndex + matchTarget.length) }), regexTarget.slice(regexIndex + matchTarget.length, regexTarget.length)] }), _jsx(Text, { color: "greenBright", children: matchTarget }), _jsx(Box, { children: _jsxs(Text, { children: [_jsxs(Text, { color: "green", children: ["> ", " "] }), text.slice(0, cursor), _jsx(Text, { color: "green", children: "|" }), text.slice(cursor)] }) }), _jsx(Box, { marginTop: 1, children: _jsx(Text, { dimColor: true, children: active ? `${prompt} ${text?.length}` : JSON.stringify(regex) }) })] }));
}
render(_jsx(Main, {}));
