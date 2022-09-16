<script lang="ts">
	import {
		Header,
		Content,
		Grid,
		Row,
		Column,
		FluidForm,
		TextInput,
		DatePickerInput,
		DatePicker,
		FormLabel
	} from 'carbon-components-svelte';
</script>

<Header company="QRL" platformName="Membership Dashboard" />
<Content>
	<Grid>
		<Column>
			<Row>
				<h1>Register.</h1>
			</Row>
			<FluidForm>
				<Row>
					<TextInput labelText="Email" placeholder="Enter email..." required />
				</Row>
				<Row>
					<TextInput labelText="First Name" placeholder="Enter your first name..." required />
					<TextInput labelText="Last Name" placeholder="Enter your last name..." required />	
				</Row>
				<Row>
					<DatePicker datePickerType="simple" label="Enter your birthday">
						<DatePickerInput placeholder="dd/mm/yyyy" />
					</DatePicker>	
				</Row>
			</FluidForm>
		</Column>
	</Grid>
</Content>
