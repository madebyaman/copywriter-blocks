/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import {
	BlockControls,
	AlignmentToolbar,
	RichText,
	useBlockProps,
	InspectorControls,
	ColorPalette,
	MediaUpload,
} from "@wordpress/block-editor";
import { Button, PanelBody, TextControl } from "@wordpress/components";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const {
		attributes: {
			credentials,
			content,
			mediaID,
			mediaURL,
			descriptionAlignment,
			borderColor,
			borderSize,
		},
		setAttributes,
	} = props;

	const blockProps = useBlockProps();

	const onSelectImage = (media) => {
		setAttributes({
			mediaURL: media.url,
			mediaID: media.id,
		});
	};

	const onChangeCredentials = (value) => {
		setAttributes({ credentials: value });
	};

	const onChangeContent = (value) => {
		setAttributes({ content: value });
	};

	const onChangeAlignment = (value) => {
		setAttributes({ descriptionAlignment: value });
	};

	const onChangeBorderColor = (value) => {
		setAttributes({ borderColor: value });
	};

	const onChangeBorderSize = (value) => {
		setAttributes({ borderSize: value });
	};

	return [
		<InspectorControls>
			<PanelBody title={__("Border settings", "testimonial")}>
				<div className="components-base-control">
					<div className="components-base-control__field">
						<label className="components-base-control__label">
							{__("Border color", "testimonial")}
						</label>
						<ColorPalette value={borderColor} onChange={onChangeBorderColor} />
					</div>
				</div>
				<TextControl
					label="Border Size"
					value={borderSize}
					onChange={onChangeBorderSize}
					type="number"
				/>
			</PanelBody>
		</InspectorControls>,
		<div {...blockProps}>
			<BlockControls>
				<AlignmentToolbar
					value={descriptionAlignment}
					onChange={onChangeAlignment}
				/>
			</BlockControls>
			<div
				className="testimonial wrap"
				style={{ border: `${borderSize}px solid ${borderColor}` }}
			>
				<div className="testimonial-content">
					<RichText
						style={{ textAlign: descriptionAlignment }}
						tagName="div"
						multiline="p"
						className="content"
						placeholder={__("Write the content…", "gutenberg-examples")}
						value={content}
						allowedFormats={["core/bold", "core/italic", "core/link"]}
						onChange={onChangeContent}
					/>
				</div>

				<div className="testimonial-image">
					<MediaUpload
						onSelect={onSelectImage}
						allowedTypes="image"
						value={mediaID}
						render={({ open }) => (
							<Button
								className={mediaID ? "image-button" : "button button-large"}
								onClick={open}
							>
								{!mediaID ? (
									__("Upload Image", "testimonial")
								) : (
									<img
										src={mediaURL}
										alt={__("Upload Testionial Image", "testimonial")}
									/>
								)}
							</Button>
						)}
					/>
				</div>

				<div className="testimonial-credentials">
					<RichText
						style={{ textAlign: descriptionAlignment }}
						tagName="div"
						placeholder={__(
							"Write a list of credentials…",
							"gutenberg-examples"
						)}
						value={credentials}
						onChange={onChangeCredentials}
						className="credentials"
					/>
				</div>
			</div>
		</div>,
	];
}
