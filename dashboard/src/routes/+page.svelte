<script lang="ts">
	import {
		Header,
		Content,
		Grid,
		Row,
		Column,
		Button
	} from 'carbon-components-svelte';
</script>

<Header company="QRL" platformName="Membership Dashboard" />
<Content>
	<Grid>
		<Row>
			<Column>
				<h1>Welcome, stranger.</h1>
				<Button href="/register" >Register</Button>
			</Column>
		</Row>
	</Grid>
</Content>
