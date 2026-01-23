import { UiSchemaControlBaseOptions } from '../uischema';

/**
 * Options for customizing the Google Places renderer UI schema.
 *
 * @property countryRestrictionField - The field path to the country restriction field.
 * @property withPlaceId - Whether to include the place ID in the output.
 * @property withState - Whether to include the state (like DC for Washington, DC) in the output.
 */
export interface GooglePlacesRendererUISchemaOptions extends UiSchemaControlBaseOptions {
    /**
     * The field path to the country restriction field.
     * @default undefined
     */
    countryRestrictionField?: string;

    /**
     * Whether to include the place ID in the output.
     * @default true
     */
    withPlaceId?: boolean;

    /**
     * Whether to include the state (like DC for Washington, DC) in the output.
     * @default false
     */
    withState?: boolean;
}