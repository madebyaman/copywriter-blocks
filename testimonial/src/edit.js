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
import { Button, PanelBody, TextControl, Icon } from "@wordpress/components";
import "./editor.scss";

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

	const onRemoveImage = () => {
		setAttributes({
			mediaID: null,
			mediaURL: null,
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
			<PanelBody title={__("Border settings", "copywriter-blocks")}>
				<div className="components-base-control">
					<div className="components-base-control__field">
						<label className="components-base-control__label">
							{__("Border color", "copywriter-blocks")}
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
			<div className="copywriter-testimonial-block">
				<div
					className="testimonial-wrapper"
					style={{ borderColor, borderWidth: borderSize + "px" }}
				>
					<div className="testimonial-content">
						<RichText
							style={{ textAlign: descriptionAlignment }}
							tagName="div"
							multiline="p"
							className="content"
							placeholder={__(
								"Add testimonial content...",
								"gutenberg-examples"
							)}
							value={content}
							allowedFormats={["core/bold", "core/italic", "core/link"]}
							onChange={onChangeContent}
						/>
					</div>

					<div className="testimonial-info">
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
											<Icon icon="format-image" />
										) : (
											<img
												src={mediaURL}
												alt={__("Upload Testionial Image", "copywriter-blocks")}
											/>
										)}
									</Button>
								)}
							/>
							{mediaID && (
								<Icon
									icon="dismiss"
									className="testimonial-image-edit-icon"
									onClick={onRemoveImage}
								/>
							)}
						</div>

						<RichText
							style={{ textAlign: descriptionAlignment }}
							tagName="div"
							placeholder={__("Title and name...", "gutenberg-examples")}
							value={credentials}
							onChange={onChangeCredentials}
							className="credentials"
						/>
					</div>
				</div>
			</div>
		</div>,
	];
}
