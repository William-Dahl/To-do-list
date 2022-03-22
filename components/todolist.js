/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect, Fragment, useCallback, useLayoutEffect } from 'react';
import { css, jsx } from '@emotion/core';
import Textfield from '@atlaskit/textfield';
import {
  gridSize as getGridSize,
} from '@atlaskit/theme/constants';
import { N50A, N40A, N0, N500 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import InlineEdit from '@atlaskit/inline-edit';
import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import { Field, HelperMessage } from '@atlaskit/form';
import { Checkbox } from '@atlaskit/checkbox';

import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
  } from '@atlaskit/modal-dialog';


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

function useLocalStorageState(key, defaultValue = '') {
	const [state, setState] = useState(() => defaultValue);
	// Runs on mount
	useLayoutEffect(() => {
		const newValue = JSON.parse(window.localStorage.getItem(key))
		setState(newValue);
	}, [key]);
	// Runs when the state is changed
	useLayoutEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(state))
	}, [key, state])
	return [state, setState]
}

export const ToDoListContainer = (props) => {
	return <div css={toDoListContainerStyles}>{props.children}</div>;
};

export const ToDoListTitle = (props) => {
	const [title, setTitle] = useLocalStorageState('Title', props.defaultValue)

	return (
		<div>
			<InlineEdit
				defaultValue={title}
				editView={({ errorMessage, ...fieldProps }) => (
					<Textfield autoComplete='off' {...fieldProps} autoFocus/>
				)}
				readView={() => (
				<div css={readViewContainerStyles}>
						{title || props.defaultValue}
				</div>
				)}
				onConfirm={(value) => setTitle(value)}
				readViewFitContainerWidth
			/>
		</div>
	);
};

export const AddTaskButton = (props) => {
	return (
		<Button 
			shouldFitContainer
			onClick={props.onClick}
			style={{textAlign: 'left', marginTop: `8px`}}
		>
			<div style={{display: 'inline-block', paddingRight: '10px'}}>
				<AddIcon label="Add icon" size="small"/>
			</div>
			Enter new task...
		</Button>
	);
};

export const TaskItem = (props) => {
	const [isChecked, setIsChecked] = useLocalStorageState(`${props.id}-checked`, false)
	const [isHovering, setIsHovering] = useState(false);

	function handleCheckbox(e) {
		setIsChecked(e.currentTarget.checked)
	}

	const showButton = useCallback(() => setIsHovering(true), []);
	const hideButton = useCallback(() => setIsHovering(false), []);

	return (
		<div 
			style={{padding: '10px 0px 10px 0px', display: 'flex', alignItems: 'center', minHeight: '32px'}}
			onMouseEnter={showButton} onMouseLeave={hideButton}
		>
			<div style={{
				width:'100%', 
				textDecoration:isChecked ? 'line-through' : 'none',
			}}>
				<Checkbox
					value="default checkbox"
					label={props.value}
					isChecked={isChecked}
					onChange={(e) => {handleCheckbox(e)}}
					name="checkbox-default"
					style={{color:isChecked ? token(
						'color.text.disabled',
						N500
					) : 'none'}}
				/>
			</div>
			{isHovering && <Button 
				onClick={props.onRemove}
				spacing='none'
				style={{textAlign: 'left', padding: gridSize, borderRadius: '12px',}}
				iconBefore={<TrashIcon label="Trash icon" size="small"/>}
			/>
			}
		</div>
	);
};

export const CreateTaskItemModal = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => setIsOpen(false), []);

	const onSubmit = useCallback(
		(e) => {
			e.preventDefault();
			const data = new FormData(e.target);
			const obj = {}
			data.forEach((val, key) => {
			obj[key] = val;
			});

			props.onSubmit(obj.name)
			closeModal()
		},
		[closeModal, props],
	  );



	return (
		<>
			<AddTaskButton onClick={openModal}/>
			
			<ModalTransition>
				{isOpen && (
				<Modal onClose={closeModal}>
					<form onSubmit={onSubmit}>
					<ModalHeader>
						<ModalTitle>Create a Task</ModalTitle>
					</ModalHeader>
					<ModalBody>
						<Field id="name" name="name" label="Type the task name to continue" isRequired>
						{({ fieldProps }) => (
							<Fragment>
							<Textfield
								autoComplete='off'
								{...fieldProps}
								value={undefined}
							/>
							<HelperMessage>
								{name ? `Hello, ${name}` : ''}
							</HelperMessage>
							</Fragment>
						)}
						</Field>
					</ModalBody>
					<ModalFooter>
						<Button appearance="subtle" onClick={closeModal}>
						Close
						</Button>
						<Button appearance="primary" type="submit">
						Create
						</Button>
					</ModalFooter>
					</form>
				</Modal>
				)}
			</ModalTransition>
		</>
	); 
}

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
			<ToDoListTitle defaultValue='Click to edit title'/>
			<hr/>
			<ul style={{listStyle: 'none', paddingLeft: 0}}>
				{items.map(item => (
					<TaskItem key={item.id} id={item.id} value={item.value} onRemove={() => removeItem(item)}/>
				))}
			</ul>
			<CreateTaskItemModal onSubmit={(name) => addItem(name)}/>
		</ToDoListContainer>
	);
};

export default ToDoList;