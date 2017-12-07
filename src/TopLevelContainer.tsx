import * as React from 'react';
import { Divider, Container, Icon, Message, Button, SemanticCOLORS, Grid, Segment } from 'semantic-ui-react'
import Hello from "./Hello";
import Async, { Props as AsyncProps } from 'react-promise'
import { validate } from "ski-mask";
import Editor from "./Editor";

type JsonMessage= {
	success: boolean,
	message: string,
	context?: string
};

type ValidationState = 'notStarted' | 'inProgress' | 'error' | 'success';

interface State {
	validationState: ValidationState,
	validationMessage: string,
	validationContext?: null | string
};

interface Props {
	[ key: string ]: string
};

const messageColor = (vState: string): SemanticCOLORS => {
	switch (vState) {
		case 'error':
			return 'red'
		case 'success':
			return 'green'
		case 'inProgress':
			return 'yellow'
		default:
			return 'blue'
	}
}

class TopLevelContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			validationState: 'notStarted',
			validationMessage: 'Click to Validate'
		} as State;
	}

	render() {
		return (
			<Container>
				<div>
					<Message
						color={messageColor(this.state.validationState)}
						icon='code'
						header='Validate Iglu Payloads'
						content={this.state.validationMessage}
					/>
					<Divider hidden />
					<Grid columns={1}>
						<Grid.Column>
							<Editor code={JSON.stringify(this.json, null, 4)} ref='monaco'/>
						</Grid.Column>
					</Grid>
				</div>
				<Divider hidden />
				<div>
					<Button 
						loading={this.isLoading()}
						size='big'
						color='green'
						onClick={this.handleClick}
					>
						<Icon name='checkmark'></Icon>&nbsp;Validate
					</Button>
				</div>
			</Container>
		)
	};

	isLoading = (): boolean => this.state.validationState === 'inProgress'

	handleClick = (): void => {
		const vState: ValidationState= 'inProgress';
		this.setState({ validationState: vState, validationMessage: 'Processing' })
		this.message().then(
			(msg) => {
				const vState: ValidationState = msg.success ? 'success' : 'error';
				this.setState(
					{
						validationMessage: msg.message,
						validationState: vState
					}
				)
			}
		).catch(
			(e) => {
				const vState: ValidationState = 'error';
				this.setState(
					{
						validationMessage: e.message,
						validationState: vState,
						validationContext: e.context 
					}
				)
			}
		)
	}

	json = {
		"schema": "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
		"data": {
			"schema": "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-0",
			"data": {
				"targetUrl": "https://myawesomeurl.com/data",
				"elementI": "bestElementEver"
			}
		}
	}

	resolverConfig = {
		"schema": "iglu:com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0",
		"data":
			{
				"cacheSize": 500,
				"repositories":
					[
						{
							"name": "Iglu Central",
							"priority": 0,
							"vendorPrefixes":
								[
									"com.snowplowanalytics.snowplow"
								],
							"connection":
								{
									"http":
										{
											"uri": "http://iglucentral.com"
										}
								}
						},
						{
							"name": "My Iglu Server",
							"priority": 1,
							"vendorPrefixes":
								[
									"com.my-iglu-server"
								],
							"connection":
								{
									"http":
										{
											"uri": "http://awesome-schemas.my-iglu-server.com"
										}
								}
						}
					]
			}
	};

	message = (): Promise<JsonMessage> => {
		const model = this.refs.monaco as any;
		return validate(JSON.parse(model.state.code), this.resolverConfig);
	}
}

export default TopLevelContainer
