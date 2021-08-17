import '@uiw/react-md-editor/dist/markdown-editor.css';
import '@uiw/react-markdown-preview/dist/markdown.css';

import MDEditor, { commands } from '@uiw/react-md-editor';
import React from 'react';
import { FaTable } from 'react-icons/fa';

const table = {
	name: 'table',
	keyCommand: 'table',
	buttonProps: { 'aria-label': 'Insert table' },
	icon: <FaTable />,
	execute: (state, api) => {
		let modifyText = `|   C   |   C   |   C  |\n|---     |---     |---    |\n|  R    |   R   |   R  |\n|  R    |   R   |   R  |\n`;
		api.replaceSelection(modifyText);
	}
};

const MarkDownEditor = ({ ...props }) => {
	const commandsBar = [
		commands.bold,
		commands.italic,
		commands.strikethrough,
		commands.hr,
		commands.divider,
		commands.link,
		commands.quote,
		commands.code,
		commands.codeBlock,
		commands.image,
		commands.divider,
		commands.group([commands.title1, commands.title2, commands.title3, commands.title4, commands.title5, commands.title6], {
			name: 'title',
			groupName: 'title',
			buttonProps: { 'aria-label': 'Insert title' }
		}),
		commands.divider,
		commands.unorderedListCommand,
		commands.orderedListCommand,
		commands.checkedListCommand,
		commands.divider,
		table
	];
	return <MDEditor commands={commandsBar} {...props} />;
};

export default MarkDownEditor;
