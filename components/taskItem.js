import TrashIcon from '@atlaskit/icon/glyph/trash'
import { Checkbox } from '@atlaskit/checkbox';
import Button from '@atlaskit/button';
import { N500 } from "@atlaskit/theme/colors";
import {
    gridSize as getGridSize,
} from '@atlaskit/theme/constants';
import { useLocalStorageState } from './utils';
import { useState , useCallback } from 'react';

const gridSize = getGridSize();

const TaskItem = (props) => {
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
            data-testid={props.testId}
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
                    testId={props.testId && `${props.testId}--Checkbox`}
				/>
			</div>
			{isHovering && <Button 
				onClick={props.onRemove}
				spacing='none'
				style={{textAlign: 'left', padding: gridSize, borderRadius: '12px',}}
				iconBefore={<TrashIcon label="Trash icon" size="small"/>}
                testId={props.testId && `${props.testId}--RemoveButton`}
			/>
			}
		</div>
	);
};

export default TaskItem;