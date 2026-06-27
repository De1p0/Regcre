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

	return (
		<Box flexDirection="column">
			<Text color="redBright">
				{regexTarget.slice(0, regexIndex)}
				<Text color="greenBright">
					{regexTarget.slice(regexIndex, regexIndex + matchTarget.length)}
				</Text>
				{regexTarget.slice(regexIndex + matchTarget.length, regexTarget.length)}
			</Text>
			<Text color="greenBright">{matchTarget}</Text>

			<Box>
				<Text>
					<Text color="green">{"> "} </Text>
					{text.slice(0, cursor)}
					<Text color="green">|</Text>
					{text.slice(cursor)}
				</Text>
			</Box>

			<Box marginTop={1}>
				<Text dimColor>
					{active ? `${prompt} ${text?.length}` : JSON.stringify(regex)}
				</Text>
			</Box>
		</Box>
	);
}

render(<Main />);
