import Button from '@atlaskit/button';
import { Field, HelperMessage } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import React, { useState, Fragment, useCallback } from 'react';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
  } from '@atlaskit/modal-dialog';

import AddTaskButton from './addTaskButton';

const TaskItemCreationModal = (props) => {
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

export default TaskItemCreationModal;