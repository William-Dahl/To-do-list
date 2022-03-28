import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add'

const AddTaskButton = (props) => {
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

export default AddTaskButton;