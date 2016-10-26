'use strict';

import React, { Component } from 'react';
import { Text, View } from 'react-native';

/**
 * @class <%= name %>
 */
class <%= name %> extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<View>
				<Text>My awesome <%= name %> Route</Text>
			</View>
		)
	}
}

<%= name %>.propTypes = {};
<%= name %>.defaultProps = {};

export default <%= name %>;
