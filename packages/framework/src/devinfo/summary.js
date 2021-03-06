import { union } from 'lodash';
import { STATUS } from './resources';

/**
 * A string summary of fresh-data client resources
 * @param {Object} resources Resources generated by ./resources.js for a client.
 * @return {string} A single-line string summary.
 */
export default function summary( resources ) {
	const resourceNames = Object.keys( resources );
	let components = [];
	let freshCount = 0;
	let staleCount = 0;
	let timedOutCount = 0;
	let fetchingCount = 0;
	let notRequiredCount = 0;

	resourceNames.forEach( ( resourceName ) => {
		const resource = resources[ resourceName ];
		components = union( components, resource.componentsRequiring );
		switch ( resource.status ) {
			case STATUS.overdue:
				timedOutCount++;
				break;
			case STATUS.fetching:
				fetchingCount++;
				break;
			case STATUS.stale:
				staleCount++;
				break;
			case STATUS.fresh:
				freshCount++;
				break;
			case STATUS.notRequired:
				notRequiredCount++;
		}
	} );

	let text = `${ resourceNames.length } resources, ${ components.length } components ( `;

	if ( freshCount ) {
		text += `${ freshCount } fresh `;
	}
	if ( staleCount ) {
		text += `${ staleCount } stale `;
	}
	if ( notRequiredCount ) {
		text += `${ notRequiredCount } not required `;
	}
	if ( timedOutCount ) {
		text += `${ timedOutCount } timed out `;
	}
	if ( fetchingCount ) {
		text += `${ fetchingCount } fetching `;
	}

	text += ')';
	return text;
}
