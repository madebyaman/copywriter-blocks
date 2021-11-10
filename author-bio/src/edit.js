/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	RichText,
	useBlockProps,
	MediaUpload,
	AlignmentToolbar,
	InspectorControls,
	ColorPalette,
	BlockControls,
} from "@wordpress/block-editor";

import { Button, Icon, PanelBody } from "@wordpress/components";

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
			title,
			content,
			mediaID,
			mediaAlt,
			mediaURL,
			backgroundColor,
			contentAlignment,
		},
		setAttributes,
	} = props;

	const onSelectImage = (media) => {
		setAttributes({
			mediaAlt: media.alt,
			mediaID: media.id,
			mediaURL: media.url,
		});
	};

	const onRemoveImage = (media) => {
		setAttributes({
			mediaAlt: null,
			mediaID: null,
			mediaURL: null,
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Background Settings", "copywriter-theme-blocks")}>
					<div className="compoonents-base-control">
						<div className="components-base-control__field">
							<label className="components-base-control__label">
								{__("Background Color", "copywriter-theme-blocks")}
							</label>
							<ColorPalette
								value={backgroundColor}
								onChange={(val) => setAttributes({ backgroundColor: val })}
							/>
						</div>
					</div>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} style={{ backgroundColor }}>
				<div className="author-bio__container">
					<BlockControls>
						<AlignmentToolbar
							value={contentAlignment}
							onChange={(val) => setAttributes({ contentAlignment: val })}
						/>
					</BlockControls>
					<div className="author-bio__image">
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
										<img src={mediaURL} alt={mediaAlt} />
									)}
								</Button>
							)}
						/>
					</div>
					<div className="author-bio__content">
						<div className="author-bio__title">
							<RichText
								tagName="h2"
								style={{ textAlign: contentAlignment }}
								placeholder={__(
									"Write author name...",
									"copywriter-theme-blocks"
								)}
								value={title}
								onChange={(val) => setAttributes({ title: val })}
							/>
						</div>

						<RichText
							tagName="div"
							placeholder={__(
								"Write a biography that distill objective credibility and authority to your readers...",
								"copywriter-theme-blocks"
							)}
							className="author-bio__text"
							value={content}
							multiline="p"
							onChange={(val) => setAttributes({ content: val })}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
