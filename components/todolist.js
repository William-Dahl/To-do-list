/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { N50A, N40A, N0 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import {
    gridSize as getGridSize,
} from '@atlaskit/theme/constants';
import ListTitle from './listTitle';
import TaskItem from './taskItem';
import TaskItemCreationModal from './taskItemCreationModal';
import { useLocalStorageState } from './utils';

const gridSize = getGridSize();

const toDoListContainerStyles = css({
	margin: '36px',
	padding: `${gridSize * 2}px ${gridSize * 2}px ${gridSize * 2}px`,
	width: `${gridSize * 60}px`,
	borderRadius: '8px',
	boxShadow: token(
		"elevation.shadow.raised",
		`0 1px 1px ${N50A}, 0 0 1px 1px ${N40A}`
	),
	backgroundColor: token(
		'elevation.surface.raised',
		N0
	),
});

export const ToDoListContainer = (props) => {
	return <div css={toDoListContainerStyles}>{props.children}</div>;
};

const ToDoList = () => {
	const [items, setItems] = useLocalStorageState('items', [])
	const [maxId, setMaxId] = useLocalStorageState('maxId', 0)

	function addItem(name) {
		const newId = maxId + 1
		setMaxId(newId)
		setItems([...items, {id: newId, value: `${name}`}])
	}

	function removeItem(item) {
		setItems(items.filter(i => i !== item))
	}

	return (
		<ToDoListContainer>
			<ListTitle/>
			<hr/>
			<ul style={{listStyle: 'none', paddingLeft: 0}}>
				{items.map(item => (
					<TaskItem key={item.id} id={item.id} value={item.value} onRemove={() => removeItem(item)}/>
				))}
			</ul>
			<TaskItemCreationModal onSubmit={(name) => addItem(name)}/>
		</ToDoListContainer>
	);
};

export default ToDoList;