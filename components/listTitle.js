import React from 'react';
import { css } from '@emotion/core';
import InlineEdit from '@atlaskit/inline-edit';
import Textfield from '@atlaskit/textfield';
import {
    gridSize as getGridSize,
} from '@atlaskit/theme/constants';
import { useLocalStorageState } from './utils';

const fontSize = 24;
const gridSize = getGridSize();

const readViewContainerStyles = css({
	display: 'flex',
	maxWidth: '100%',
	minHeight: `${(gridSize * 2.5) / fontSize}em`,
	padding: `${gridSize}px 0px`,
	fontSize: `${fontSize}px`,
	lineHeight: `${(gridSize * 2.5) / fontSize}`,
	wordBreak: 'break-word',
});

const ListTitle = () => {
    const defaultReadViewValue = "Click to edit title"
	const [title, setTitle] = useLocalStorageState('Title', defaultReadViewValue)

	return (
		<div>
			<InlineEdit
				defaultValue={title}
				editView={({ errorMessage, ...fieldProps }) => (
					<Textfield autoComplete='off' {...fieldProps} autoFocus/>
				)}
				readView={() => (
				<div css={readViewContainerStyles}>
						{title || defaultReadViewValue}
				</div>
				)}
				onConfirm={(value) => setTitle(value)}
				readViewFitContainerWidth
			/>
		</div>
	);
};

export default ListTitle;